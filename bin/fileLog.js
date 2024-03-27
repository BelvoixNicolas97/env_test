/**
 * Le module permet d'écrire dans un fichier log.
 * @module fileLog
 * @author Nicolas Belvoix <belvoixnicolas1997@gmail.com>
 * @copyright Nicolas Belvoix 2024
 * @version 1.5.1
 */

const FS = require("fs");
const PATH = require("path");

/**
 * Contient [TXT.fileLog]{@link TXT}.
 * @constant
 * @type {object}
 */
const TXT = require('./../json/txt.json').fileLog;
/**
 * Contient [ERROR]{@link ERROR}.
 */
const ERROR = require("./../json/error.json");

/**
 * @class
 */
class FileLog {
    /**
     * La constant contient l'url absolue du fichier.
     * @type {string}
     */
    #PATH;
    /**
     * Contient le descripteur de fichier de log.
     * @type {number}
     */
    #FILEHANDLER;
    /**
     * La constente indique si le descripteur de fichier est fermer via close.
     * @type {boolean}
     * @default true;
     */
    #CLOSE = true;

    /**
     * Contient le nombre de byte écrit dans le fichier.
     * @type {bigint}
     * @default 0n
     */
    #BYTE_WRITE = BigInt(0);

    /**
     * @constructor
     * @param {string} path L'url du fichier de log
     */
    constructor (path) {
            let pathAbsolue;
            let fn;

        // Vérification
            if (typeof path !== "string") {
                let txt = TXT.constructor.errorTypePath.replace("@typeParh@", typeof path);
                let error = new Error(txt);

                error.name = ERROR.paramType;

                throw error;
            }else if (FS.existsSync(path) && !FS.statSync(path).isFile()) {
                let txt = TXT.constructor.errorTypeFile.replace("@path@", path);
                let error = new Error(txt);

                error.name = ERROR.typePath;

                throw error;
            }

        // Transformation
            pathAbsolue = PATH.resolve(path);

        // Ouverture du fichier
            fn = FS.openSync(pathAbsolue, "w");

        // Initialisation des donnée
            this.#PATH = pathAbsolue;
            this.#FILEHANDLER = fn;
            this.#CLOSE = false;

        // Mise en place des triggers
            process.on("exit", () => {
                this.close();
            });
    }

//   GET DATA
    /**
     * LA fonction permet de récupérer l'url absolue du fichier
     * @returns {string}
     */
    getPath () {
        return this.#PATH;
    }

    /**
     * La fonction permet de récupérer le nombre d'octer du fichier
     * @returns {bigint}
     */
    getByte () {
        let path = this.#PATH;
        let fn = this.#FILEHANDLER;
        let isClose = this.#CLOSE;
        let byte = BigInt(0);

        // Vérification
            if (isClose) {
                let txt = TXT.getByte.errorClose.replace("@path@", path).replace("@fn@", fn);
                let error = new Error(txt);

                error.name = ERROR.fileClose;

                throw error;
            }

        // Récupération des donnée
            byte = FS.fstatSync(fn, {bigint: true}).size;

        // Envoie
            return byte;
    }

    /**
     * La fonction permet de récupérer le nombre d'octer écrit dans le fichier via cette instance
     * @returns {bigint}
     */
    getByteWrite () {
        return this.#BYTE_WRITE;
    }

    /**
     * La function ferme le fichier.
     * @function
     */
    close () {
        let fn = this.#FILEHANDLER;
        let isClose = this.#CLOSE;

        if (!isClose) {
            FS.closeSync(fn);
            
            this.#CLOSE = true;
        }
    }
}

module.exports = FileLog;