/**
 * Le module permet d'utiliser un environement en ligne de commande.
 * @module cli
 * @author Nicolas Belvoix <belvoixnicolas1997@gmail.com>
 * @copyright Nicolas Belvoix 2022
 * @version 1.0.0
 */

    ///    CLASS    ///
/**
 * La [Class Cli]{@link module:cli~Cli} permet d'intégarire avec un environement en ligne de commande.
 * @class
 */
class Cli {
    /**
     * La fonction permet d'afficher un titre.
     * @param {string} txt Contenue du titre.
     */
    titre (txt) {
        let echapment = "";
        let cadre = {
            top: "",
            left: `      \x1B[30;47m    `,
            right: `    \x1B[0m`,
            bottom: ""
        };

        // Construction du cadre
            for (let index = 0; index < txt.length; index++) {
                echapment += " ";
            }
            cadre.top = `${cadre.left}${echapment}${cadre.right}`;
            cadre.bottom = cadre.top;

        // Affichage du cadre
            console.log(`\r\n${cadre.top}\r\n${cadre.left}${txt}${cadre.right}\r\n${cadre.bottom}`);
    }

    /**
     * La fonction permet d'afficher un sous titre.
     * @param {string} txt 
     */
    subTitre (txt) {
        console.log(`\r\n  \x1B[4;37;40m${txt} :\x1B[0m`);
    }

    valid (txt) {
        console.log(`    \x1B[32m${txt}\x1B[0m`);
    }

    inValid (txt) {
        console.log(`    \x1B[31m${txt}\x1B[0m`);
    }

    miss (txt) {
        console.log(`    \x1B[33m${txt}\x1B[0m`);
    }

    txt (txt) {
        console.log(`    ${txt}`);
    }

    async yesOrNo (txt = "") {
        let yes = [
            Buffer.from([0x79]),
            Buffer.from([0x59]),
            Buffer.from([0x6F]),
            Buffer.from([0x4F]),
            Buffer.from([0x0D])
        ];
        let no = [
            Buffer.from([0x6E]),
            Buffer.from([0x4E]),
            Buffer.from([0x1B])
        ];
        let ctrlC = Buffer.from([0x03]);
        let result = false;

        // Récupération du resultat
            await new Promise(function (resolve, reject) {
                function isInclude (array, buffer) {
                    let resultBuffer = false;

                    for (let item of array) {
                        if (Buffer.compare(item, buffer) == 0) {
                            resultBuffer = true;

                            break;
                        }
                    }

                    return resultBuffer;
                }
                let callback = function (data) {
                    if (Buffer.compare(data, ctrlC) == 0) {
                        process.stdin.setRawMode(false);
                        process.stdin.off("data", callback);
                        resolve();

                        process.exit();
                    }else if (isInclude(yes, data)) {
                        process.stdin.setRawMode(false);
                        process.stdin.off("data", callback);
                        process.stdin.pause();

                        result = true;

                        resolve();
                    }else if (isInclude(no, data)) {
                        process.stdin.setRawMode(false);
                        process.stdin.off("data", callback);
                        process.stdin.pause();

                        result = false;

                        resolve();
                    }
                }
                
                process.stdout.write(`    ${txt} > `);
                process.stdin.resume();
                process.stdin.setRawMode(true);
                process.stdin.on("data", callback);
            });

        // Write result
            if (result) {
                process.stdout.write(`\x1B[32mYes\x1B[0m\r\n`);
            }else {
                process.stdout.write(`\x1B[31mNo\x1B[0m\r\n`);
            }

        // Envoie
            return result;
    }
}

module.exports = new Cli();