/**
 * Le module permet de mettre en place un environnement de test.
 * @module envTest
 * @author Nicolas Belvoix <belvoixnicolas1997@gmail.com>
 * @copyright Nicolas Belvoix 2024
 * @version 1.1.0
 */

const PATH = require("path");
const FS = require("fs");

/**
 * Contient [TXT.fileLog]{@link TXT}.
 * @constant
 * @type {object}
 */
const TXT = require('./../json/txt.json').envTest;
/**
 * Contient [ERROR]{@link ERROR}.
 */
const ERROR = require("./../json/error.json");

/**
 * @class
 */
class EnvTest {
    #PATH_WORK = "./test";

    constructor (pathIn = null) {
        let pathInFinal = (pathIn === null)?this.#PATH_WORK:pathIn;

        // Intégration de pathWork
            this.#PATH_WORK(pathInFinal);
    }

// PATH WORK
    /**
     * Permet d'initialiser l'url du dossier de test.
     * @function
     * @param {string} path 
     * @returns {string} Url absolue du dossier de test.
     */
    #setPathWork = function (path) {
        let pathFormat = (typeof path == "string")?PATH.resolve(path):"";

        // Vérification
            if (typeof path !== "string") {
                let txt = TXT.setPathWork.errorType.replace("@typePath@", typeof path);
                let error = new Error(txt);

                error.name = ERROR.paramType;

                throw error;
            }else if (!FS.existsSync(pathFormat)) {
                let txt = TXT.setPathWork.errorNotExist.replace("@path@", pathFormat);
                let error = new Error(txt);

                error.name = ERROR.typePath;

                throw error;
            }else if (!FS.statSync(pathFormat).isDirectory()) {
                let txt = TXT.setPathWork.errorNotFold.replace("@path@", pathFormat);
                let error = new Error(txt);

                error.name = ERROR.typePath;

                throw error;
            }

        // Intégration
            this.#PATH_WORK = pathFormat;

        // Envoie
            return pathFormat;
    }

    /**
     * Permet de récupérer l'url du dossier de test.
     * @function
     * @returns {string}
     */
    getPathWork () {
        return this.#PATH_WORK;
    }
}

module.exports = EnvTest;