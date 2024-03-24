/**
 * Le module permet d'intéragire avec le system de dossier de l'environnement de test.
 * @module foldSystem
 * @author Nicolas Belvoix <belvoixnicolas1997@gmail.com>
 * @copyright Nicolas Belvoix 2022
 * @version 1.9.2
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

    #LIST_TEST = {};
    
    /**
     * @constructor
     * @param {string} path Chemin du dossier de test.
     */
    constructor (path) {
        // Création du dossier
            this.#createDirPrincipal(path);

        // Suppression des test précédent
            this.#clean();

        // Création de la liste de test
            this.updateListTest();
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

    #clean = function () {
        let path = this.#PATH;
        let inDir = [];

        // Récupération de la liste du contenue du dossier
            inDir = Fs.readdirSync(path);

        // Suppression
            for (let dir of inDir) {
                let pathDir = Path.join(path, dir);

                Fs.rmSync(pathDir, {recursive: true, force: true});
            }
    }

//   LIST TEST
    updateListTest () {
        let path = this.#PATH;
        let listInDir = Fs.readdirSync(path);
        let result = {};

        // Filtrage
            for (let dir of listInDir) {
                let pathDir = Path.join(path, dir);
                let isDir = Fs.statSync(pathDir).isDirectory();

                if (isDir) {
                    result[dir] = pathDir;
                }
            }

        // Intégration
            this.#LIST_TEST = result;
    }

    getListTest () {
        return Object.keys(this.#LIST_TEST);
    }

    getTestUrl (testName) {
        let listTest = this.#LIST_TEST;
        let path = "";

        // Vérification
            if (!Object.keys(listTest).includes(testName)) {
                let txt = TXT.getTestUrl.notInList.replace("@nameTest@", testName);
                let error = new Error(txt);

                error.name = ERROR.notInList;

                throw error;
            }

        // Récupération de l'url
            path = listTest[testName];

        // Envoie
            return path;
    }

//   DIR
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

        // Mise a jour de la liste de test
            this.updateListTest();

        // Envoie
            return Path.basename(pathFinale);
    }
}

module.exports = FoldSystem;