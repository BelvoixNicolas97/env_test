/**
 * Le module permet d'écrire dans un fichier log.
 * @module fileLog
 * @author Nicolas Belvoix <belvoixnicolas1997@gmail.com>
 * @copyright Nicolas Belvoix 2024
 * @version 1.6.2
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
 * La fonction permet d'écrire dans un fichier log.</br>
 * Si le fichier existe déjà, le fichier sera écrasé.</br>
 * Une fois l'écriture terminée, utilisée [Class FileLog.close()]{@link module:fileLog~FileLog#close}. Le fichier sera fermé automatiquement à la fin du programme en cours.
 * @class
 */
class FileLog {
    /**
     * La constante contient l'URL absolue du fichier.
     * @type {string}
     */
    #PATH;
    /**
     * Contient le descripteur de fichier de log.
     * @type {number}
     */
    #FILEHANDLER;
    /**
     * La constante indique si le descripteur de fichier est fermé via [Class FileLog.close()]{@link module:fileLog~FileLog#close}.
     * @type {boolean}
     * @default true;
     */
    #CLOSE = true;

    /**
     * Contient le nombre d'Octets écrit dans le fichier via [Class FileLog.write()]{@link module:fileLog~FileLog#write}.
     * @type {bigint}
     * @default 0n
     */
    #BYTE_WRITE = BigInt(0);

    /**
     * @constructor
     * @param {string} path L'URL du fichier de log.
     * @throws Renvoie une erreur "[PARAM_TYPE]{@link ERROR}" si l'URL du fichier de log n'est pas une chaine de caractères.</br>
     *         Renvoie une erreur "[TYPE_PATH]{@link ERROR}" si le fichier de log n'est pas un fichier.
     * @see [TXT]{@link module:fileLog~TXT} est utilisé.
     * @see [ERROR]{@link module:fileLog~ERROR} est utilisé.
     * @see [Class FileLog.PATH]{@link module:fileLog~FileLog#PATH} est utilisé.
     * @see [Class FileLog.FILEHANDLER]{@link module:fileLog~FileLog#FILEHANDLER} est utilisé.
     * @see [Class FileLog.CLOSE]{@link module:fileLog~FileLog#CLOSE} est utilisé.
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
     * La fonction permet de récupérer l'URL absolue du fichier.
     * @function
     * @returns {string}
     * @see [Class FileLog.PATH]{@link module:fileLog~FileLog#PATH} est utilisé.
     */
    getPath () {
        return this.#PATH;
    }

    /**
     * La fonction permet de récupérer le nombre d'octets du fichier.
     * @function
     * @returns {bigint}
     * @throws Renvoie une erreur "[FILE_CLOSE]{@link ERROR}" si le fichier a été fermer par [Class FileLog.close()]{@link module:fileLog~FileLog#close}.
     * @see [TXT]{@link module:fileLog~TXT} est utilisé.
     * @see [ERROR]{@link module:fileLog~ERROR} est utilisé.
     * @see [Class FileLog.PATH]{@link module:fileLog~FileLog#PATH} est utilisé.
     * @see [Class FileLog.FILEHANDLER]{@link module:fileLog~FileLog#FILEHANDLER} est utilisé.
     * @see [Class FileLog.CLOSE]{@link module:fileLog~FileLog#CLOSE} est utilisé.
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
     * La fonction permet de récupérer le nombre d'octets écrit dans le fichier via cette instance.
     * @function
     * @returns {bigint}
     * @see [Class FileLog.BYTE_WRITE]{@link module:fileLog~FileLog#BYTE_WRITE} est utilisé.
     */
    getByteWrite () {
        return this.#BYTE_WRITE;
    }

//   WRITE
    /**
     * La fonction écrit dans le fichier de log.
     * @function
     * @param {string} txt Le texte a écrire.
     * @returns {bigint} Le nombre d'octets écrit dans le fichier.
     * @throws Renvoie une erreur "[PARAM_TYPE]{@link ERROR}" si le texte à écrire n'est pas une chaine de caractère.</br>
     *         Renvoie une erreur "[FILE_CLOSE]{@link ERROR}" si le fichier a été fermer par [Class FileLog.close()]{@link module:fileLog~FileLog#close}.
     * @see [TXT]{@link module:fileLog~TXT} est utilisé.
     * @see [ERROR]{@link module:fileLog~ERROR} est utilisé.
     * @see [Class FileLog.FILEHANDLER]{@link module:fileLog~FileLog#FILEHANDLER} est utilisé.
     * @see [Class FileLog.CLOSE]{@link module:fileLog~FileLog#CLOSE} est utilisé.
     * @see [Class FileLog.BYTE_WRITE]{@link module:fileLog~FileLog#BYTE_WRITE} est utilisé.
     */
    write (txt) {
        let fn = this.#FILEHANDLER;
        let isClose = this.#CLOSE;
        let byte = this.#BYTE_WRITE;
        let buffer;

        // Vérification
            if (typeof txt !== "string") {
                let txtError = TXT.write.errorTypeParam.replace("@path@", this.#PATH).replace("@typeTxt@", typeof txt);
                let error = new Error(txtError);

                error.name = ERROR.paramType;

                throw error;
            }else if (isClose) {
                let txtError = TXT.write.errorClose.replace("@path@", this.#PATH).replace("@fn@", fn);
                let error = new Error(txtError);

                error.name = ERROR.fileClose;

                throw error;
            }

        // Transformation
            buffer = Buffer.from(txt);

        // Ecriture
            FS.writeSync(fn, buffer);

        // Update du nombre de byte ecrit
            this.#BYTE_WRITE = byte + BigInt(buffer.byteLength);
        
        // Envoie
            return BigInt(buffer.byteLength);
    }

//   CLOSE
    /**
     * La function ferme le fichier.
     * @function
     * @see [Class FileLog.FILEHANDLER]{@link module:fileLog~FileLog#FILEHANDLER} est utilisé.
     * @see [Class FileLog.CLOSE]{@link module:fileLog~FileLog#CLOSE} est utilisé.
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