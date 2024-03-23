/**
 * Le module permet d'utiliser un environement en ligne de commande.</br>
 * ![Exemple](img/utilisation.png)
 * @module cli
 * @author Nicolas Belvoix <belvoixnicolas1997@gmail.com>
 * @copyright Nicolas Belvoix 2022
 * @version 1.1.2
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
     * La fonction permet de supprimer une ou plusieurs ligne du terminal.
     * @function
     * @param {number} [xLine=1] Le nombre de lignes à supprimer. 
     */
    cleanUpLine (xLine = 1) {
        // Suppression de la ligne
            for (let nb = 0; nb < xLine; nb++) {
                process.stdout.write("\r\x1B[A\x1B[2K");
            }
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
     * @see [Class Cli.getBooleanKey()]{@link module:cli~Cli#getBooleanKey} est utilisé.
     */
    async yesOrNo (txt = "") {
        let result = false;

        // Ecriture de la question
            process.stdout.write(`    ${txt} > `);

        // Récupération du resultat
            result = await this.#getBooleanKey();

        // Write result
            if (result) {
                process.stdout.write(`\x1B[32mYes\x1B[0m\r\n`);
            }else {
                process.stdout.write(`\x1B[31mNo\x1B[0m\r\n`);
            }

        // Envoie
            return result;
    }

    /**
     * La fonction permet de capturer une réponse boolean à partir du terminal.</br>
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
     * </table>
     * @function
     * @async
     * @returns {boolean}
     * @see [Class Cli.Key_VALID]{@link module:cli~Cli#Key_VALID} est utilisé.
     * @see [Class Cli.KEY_INVALID]{@link module:cli~Cli#KEY_INVALID} est utilisé.
     * @see [Class Cli.EXIT]{@link module:cli~Cli#EXIT} est utilisé.
     */
    #getBooleanKey = async function () {
        let yes = Object.values(this.#Key_VALID).map((value) => value.toString("hex"));
        let no = Object.values(this.#KEY_INVALID).map((value) => value.toString("hex"));
        let ctrlC = this.#EXIT.toString("hex");
        let result;

        // Lancement de l'écouteur d'événement
            process.stdin.resume();
            process.stdin.setRawMode(true);
            process.stdin.on("data", function filtreKeyYesOrNo (data) {
                if (data.toString("hex") === ctrlC) {
                    process.stdin.setRawMode(false);
                    process.stdin.off("data", filtreKeyYesOrNo);
                    process.stdin.pause();

                    process.exit();
                }else if (yes.includes(data.toString("hex"))) {
                    process.stdin.setRawMode(false);
                    process.stdin.off("data", filtreKeyYesOrNo);
                    process.stdin.pause();

                    result = true;
                }else if (no.includes(data.toString("hex"))) {
                    process.stdin.setRawMode(false);
                    process.stdin.off("data", filtreKeyYesOrNo);
                    process.stdin.pause();

                    result = false;
                }
            });

        // Attente d'un résultat
            await new Promise ((resolve, reject) => {
                setImmediate(function isGetResultYesNo () {
                    if (result === true || result === false) {
                        resolve();
                    }else {
                        setImmediate(isGetResultYesNo);
                    }
                });
            });

        // Envoie du resultat
            return result;
    }
}

module.exports = new Cli();