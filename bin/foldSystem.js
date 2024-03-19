/**
 * Le module permet d'intéragire avec le system de dossier de l'environnement de test.
 * @module foldSystem
 * @author Nicolas Belvoix <belvoixnicolas1997@gmail.com>
 * @copyright Nicolas Belvoix 2022
 * @version 1.2.0
 */

const Path = require("path");
const Fs = require("fs");

const TXT = require('./../json/txt.json').foldSystem;

/**
 * @class
 */
class FoldSystem {
    /**
     * Chemin absolue du dossier de test.
     * @type {string}
     * @default "./outx"
     */
    #PATH = "./out";
    
    /**
     * @constructor
     * @param {string} path Chemin du dossier de test.
     */
    constructor (path) {
        // Création du dossier
            if (typeof path == "string") {
                this.#PATH = this.#createDirUnic(path);
            }else {
                this.#PATH = this.#createDirUnic(this.#PATH);
            }
    }

    /**
     * La fonction va crée un dossier unique. Si le chemin indiquer existe déja. Il va incrémenter un nombre a la fin.
     * @function
     * @param {string} path Chemin du dossier a crée. 
     * @returns {string} Chemin absolue du dossier crée.
     */
    #createDirUnic = function (path) {
        let nbTentative = 0;
        let pathFinale = Path.resolve(path);

        // Détérmination du path
            while (Fs.existsSync(pathFinale)) {
                nbTentative++;

                pathFinale = Path.resolve(`${path}${nbTentative}`);
            }

        // Création du dossier
            Fs.mkdirSync(pathFinale);

        // Envoie
            return pathFinale
    }
}

module.exports = FoldSystem;