/**
 * Le module permet d'intéragire avec le system de dossier de l'environnement de test.
 * @module foldSystem
 * @author Nicolas Belvoix <belvoixnicolas1997@gmail.com>
 * @copyright Nicolas Belvoix 2022
 * @version 1.5.0
 */

const Path = require("path");
const Fs = require("fs");
const FS_PROMISE = require("fs/promises");

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
     * La fonction netoie le dossier de test.
     * @async
     * @function
     * @returns {number} Le nombre de dossier supprimer.
     * @see [Class FoldSystem.PATH]{@link module:foldSystem~FoldSystem#PATH} est utilisé.
     * @see [Class FoldSystem.cleanDir]{@link module:foldSystem~FoldSystem#cleanDir} est utilisé.
     */
    async clean () {
        let pathMain = this.#PATH;
        let nbRm = 0;
        let listPromise = [];
        let listDir = [];
        let result;

        // Récupération de la liste des dossier
            listDir = await FS_PROMISE.readdir(pathMain);

        // Lancement du netoyage
            for (let nameDir of listDir) {
                let path = Path.join(pathMain, nameDir);

                listPromise.push(this.#cleanDir(path));
            }

        // Attente de la fin du netoyage
            result = await Promise.allSettled(listPromise);

        // Intérprétation du résultat
            for await (let resultPromise of result) {
                if (resultPromise.status == "fulfilled" && resultPromise.value) {
                    nbRm++;
                }
            }

        // Suppresion du dossier
            if ((await FS_PROMISE.readdir(pathMain)).length <= 0) {
                await FS_PROMISE.rmdir(pathMain);
            }

        // Envoie
            return nbRm;
    }

    /**
     * La fonction supprime un dossier de test si il est vide.
     * @async
     * @function
     * @param {string} path Chemin du dossier a netoyer.
     * @returns {boolean} Renvoie true si le dossier est supprimer.
     */
    #cleanDir = async function (path) {
        let result = false;
        let nbSubDirFile = 0;

        // Vérification
            if (typeof path !== "string") {
                let txt = TXT.cleanDir.errorTypePath.replace("typePath", typeof path);
                let error = new Error(txt);

                error.name = ERROR.paramType;

                throw error;
            }else if (!Fs.existsSync(path)) {
                let txt = TXT.cleanDir.errorNotExist.replace("@path@", path);
                let error = new Error(txt);

                error.name = ERROR.dirNotExist;

                throw error;
            }else if (!(await FS_PROMISE.stat(path)).isDirectory()) {
                let txt = TXT.cleanDir.errorDir.replace("@path@", path);
                let error = new Error(txt);

                error.name = ERROR.typePath;

                throw error;
            }

        // Récupération du nombre de fichier
            nbSubDirFile = (await FS_PROMISE.readdir(path)).length;

        // Suppresion
            if (nbSubDirFile <= 0) {
                await FS_PROMISE.rmdir(path);

                result = true;
            }

        // Envoie
            return result;
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