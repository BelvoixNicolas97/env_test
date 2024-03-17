/**
 * Le module permet d'utiliser un environement en ligne de commande.</br>
 * ![Exemple](img/utilisation.png)
 * @module cli
 * @author Nicolas Belvoix <belvoixnicolas1997@gmail.com>
 * @copyright Nicolas Belvoix 2022
 * @version 1.0.1
 */

    ///    CLASS    ///
/**
 * La [Class Cli]{@link module:cli~Cli} permet d'intégrer avec un environnement en ligne de commande.
 * @class
 */
class Cli {
    /**
     * Contient les clés clavier de validation.
     * @type {object}
     * @property {Buffer} y Contient la clé clavier y.
     * @property {Buffer} Y Contient la clé clavier Y.
     * @property {Buffer} o Contient la clé clavier o.
     * @property {Buffer} O Contient la clé clavier O.
     * @property {Buffer} entrer Contient la clé clavier entrer.
     */
    #Key_VALID = {
        y: Buffer.from([0x79]),
        Y: Buffer.from([0x59]),
        o: Buffer.from([0x6F]),
        O: Buffer.from([0x4F]),
        entrer: Buffer.from([0x0D])
    }

    /**
     * Contient les clés clavier d'invalidation.
     * @type {object}
     * @property {Buffer} n Contient la clé clavier n.
     * @property {Buffer} N Contient la clé clavier N.
     * @property {Buffer} echape Contient la clé clavier echape.
     */
    #KEY_INVALID = {
        n: Buffer.from([0x6E]),
        N: Buffer.from([0x4E]),
        echape: Buffer.from([0x1B])
    }

    /**
     * Contient la clé clavier ctrl+c.
     * @type {Buffer}
     */
    #EXIT = Buffer.from([0x03]);

    /**
     * La fonction permet d'afficher un titre.</br>
     * Affichage dans la terminale :</br>
     * ![Titre](img/titre.png)
     * @function
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
     * La fonction permet d'afficher un sous-titre en affichant un point-virgule à la fin.</br>
     * Affichage dans la terminale :</br>
     * ![Sous-titre](img/subTitre.png)
     * @function
     * @param {string} txt Contenue du sous-titre.
     */
    subTitre (txt) {
        console.log(`\r\n  \x1B[4;37;40m${txt} :\x1B[0m`);
    }

    /**
     * La fonction permet d'afficher un texte pour indiquer une validation.</br>
     * Affichage dans la terminale :</br>
     * ![valide](img/valide.png)
     * @function
     * @param {string} txt Texte de la validation.
     */
    valid (txt) {
        console.log(`    \x1B[32m${txt}\x1B[0m`);
    }

    /**
     * La fonction permet d'afficher un texte pour indiquer une erreur.</br>
     * Affichage dans la terminale :</br>
     * ![inValide](img/inValid.png)
     * @function
     * @param {string} txt Texte de l'erreur.
     */
    inValid (txt) {
        console.log(`    \x1B[31m${txt}\x1B[0m`);
    }

    /**
     * La fonction permet d'afficher un texte pour indiquer une erreur mineure.</br>
     * Affichage dans la terminale :</br>
     * ![Miss](img/miss.png)
     * @function
     * @param {string} txt Texte de l'erreur mineur.
     */
    miss (txt) {
        console.log(`    \x1B[33m${txt}\x1B[0m`);
    }

    /**
     * La fonction permet d'afficher un texte lambda.</br>
     * Affichage dans la terminale :</br>
     * ![Txt](img/txt.png)
     * @function
     * @param {string} txt 
     */
    txt (txt) {
        console.log(`    ${txt}`);
    }

    /**
     * La fonction permet d'utiliser un input Boolean.</br>
     * <table>
     *  <thead>
     *      <tr>
     *          <th>Résultat</th><th>Clé clavier</th>
     *      </tr>
     *  </thead>
     *  <tbody>
     *      <tr>
     *          <td rowspan=5>True</td>
     *          <td>y</td>
     *      </tr>
     *      <tr>
     *          <td>Y</td>
     *      </tr>
     *      <tr>
     *          <td>o</td>
     *      </tr>
     *      <tr>
     *          <td>O</td>
     *      </tr>
     *      <tr>
     *          <td>Enter</td>
     *      </tr>
     *      <tr>
     *          <td rowspan=3>False</td>
     *          <td>n</td>
     *      </tr>
     *      <tr>
     *          <td>N</td>
     *      </tr>
     *      <tr>
     *          <td>Echape</td>
     *      </tr>
     *  </tbody>
     * </table></br>
     * Affichage dans la terminale :</br>
     * <img src="img/yesOrNo.png" alt="Inpute Boolean" />
     * @async
     * @function
     * @param {string} txt Texte de l'input Boollean.
     * @returns {boolean}
     * @example
     * let result;
     * result = await CLI.yesOrNo("Test de la fonction yesOrNo");
     * 
     * console.log(result);
     * // Affiche true ou false.
     * @see [Class Cli.Key_VALID]{@link module:cli~Cli#Key_VALID} est utilisé.
     * @see [Class Cli.KEY_INVALID]{@link module:cli~Cli#KEY_INVALID} est utilisé.
     * @see [Class Cli.EXIT]{@link module:cli~Cli#EXIT} est utilisé.
     */
    async yesOrNo (txt = "") {
        let yes = Object.values(this.#Key_VALID);
        let no = Object.values(this.#KEY_INVALID);
        let ctrlC = this.#EXIT;
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