/**
 * Le module permet d'écrire dans un fichier log.
 * @module fileLog
 * @author Nicolas Belvoix <belvoixnicolas1997@gmail.com>
 * @copyright Nicolas Belvoix 2024
 * @version 1.2.1
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
     * Contient le nombre d'octers stocker dans le fichier.
     * @type {bigint}
     * @default 0n
     */
    #BYTE = BigInt(0);

    /**
     * @constructor
     * @param {string} path L'url du fichier de log
     */
    constructor (path) {
            let pathAbsolue;
            let fn;
            let byte;

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

        // Récupération ds donnée
            byte = FS.fstatSync(fn, {bigint: true}).size;

        // Initialisation des donnée
            this.#PATH = pathAbsolue;
            this.#FILEHANDLER = fn;
            this.#CLOSE = false;
            this.#BYTE = byte;

        // Mise en place des triggers
            process.on("exit", () => {
                this.close();
            });
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