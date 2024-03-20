/**
 * Le module permet d'intéragire avec le system de dossier de l'environnement de test.
 * @module foldSystem
 * @author Nicolas Belvoix <belvoixnicolas1997@gmail.com>
 * @copyright Nicolas Belvoix 2022
 * @version 1.4.0
 */

const Path = require("path");
const Fs = require("fs");

const TXT = require('./../json/txt.json').foldSystem;
const ERROR = require("./../json/error.json");

/**
 * @class
 */
class FoldSystem {
    /**
     * Chemin absolue du dossier de test principale.
     * @type {string}
     */
    #PATH;
    
    /**
     * @constructor
     * @param {string} path Chemin du dossier de test.
     */
    constructor (path) {
        // Création du dossier
            this.#createDirPrincipal(path);
    }

    /**
     * La fonction va crée un dossier unique de sous test. Si le chemin indiquer existe déja. Il va incrémenter un nombre a la fin.
     * @function
     * @param {string} nameTest Nom du test. 
     * @returns {string} Chemin absolue du dossier crée.
     */
    createDirTest (nameTest) {
        let nbTentative = 0;
        let pathFinale = "";

        // Vérification
            if (typeof nameTest !== "string") {
                let txt = TXT.createDirTest.errorTypeNameDir.replace("@typeNameTest@", typeof nameTest);
                let error = new Error(txt);

                error.name = ERROR.paramType;

                throw error;
            }

        // Transformation
            pathFinale = Path.join(this.#PATH, nameTest);

        // Détérmination du path
            while (Fs.existsSync(pathFinale)) {
                nbTentative++;

                pathFinale = `${Path.join(this.#PATH, nameTest)}${nbTentative}`;
            }

        // Création du dossier
            Fs.mkdirSync(pathFinale);

        // Envoie
            return pathFinale
    }

    /**
     * La fonction permet de crée et d'initialiser le dossier principale de test.
     * @function
     * @param {string} path Chemin du dossier.
     * @see [Class FoldSystem.PATH]{@link module:foldSystem~FoldSystem#PATH} est utilisé.
     */
    #createDirPrincipal = function (path) {
        let pathAbsolue = "";

        // Vérification
            if (typeof path !== "string") {
                let txt = TXT.createDirPrincipal.errorTypePath.replace("@typePath@", typeof path);
                let error = new Error(txt);

                error.name = ERROR.paramType;

                throw error;
            }else if (Fs.existsSync(path) && !Fs.statSync(path).isDirectory()) {
                let txt = TXT.createDirPrincipal.errorPathFile.replace("@path@", path);
                let error = new Error(txt);

                error.name = ERROR.typePath;

                throw error;
            }

        // Transformation
            pathAbsolue = Path.resolve(path);

        // Création du dossier
            if (!Fs.existsSync(pathAbsolue)) {
                Fs.mkdirSync(pathAbsolue);
            }

        // Intégration
            this.#PATH = pathAbsolue;
    }
}

module.exports = FoldSystem;