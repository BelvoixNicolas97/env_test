/**
 * Le module permet d'interagir avec le system de dossier de l'environnement de test.
 * @module foldSystem
 * @author Nicolas Belvoix <belvoixnicolas1997@gmail.com>
 * @copyright Nicolas Belvoix 2024
 * @version 1.10.4
 */

const Path = require("path");
const Fs = require("fs");

/**
 * Contient [TXT.foldSystem]{@link TXT}.
 * @constant
 * @type {object}
 */
const TXT = require('./../json/txt.json').foldSystem;
/**
 * Contient [ERROR]{@link ERROR}.
 */
const ERROR = require("./../json/error.json");

/**
 * La Class permet de gérer le system de fichier de l'environnement de test.</br>
 * La Class va créé un fichier principal via [Class FoldSystem.createdirprincipal()]{@link module:foldSystem~FoldSystem#createDirPrincipal} et crée des sous-dossiers grace à [Class FoldSystem.createdirtest()]{@link module:foldSystem~FoldSystem#createDirTest}.</br>
 * L'URL des sous-dossiers de test est récupérable avec [Class FoldSystem.gettesturl()]{@link module:foldSystem~FoldSystem#getTestUrl}.
 * @class
 */
class FoldSystem {
    /**
     * Chemin absolu du dossier de test principal.
     * @type {string}
     */
    #PATH;

    /**
     * La variable contient la liste des URL des sous-dossiers de test. Les clés sont le nom de test.
     * @type {object.<string, string>}
     */
    #LIST_TEST = {};
    
    /**
     * Le constructor va créé le dossier principal s'il n'existe pas et supprimer la contenue de l'ancien test.
     * @constructor
     * @param {string} path Chemin du dossier de test.
     * @throws Renvoie une erreur "[PARAM_TYPE]{@link ERROR}" par [Class FoldSystem.createDirPrincipal()]{@link module:foldSystem~FoldSystem#createDirPrincipal}.</br>
     *         Renvoie une erreur "[TYPE_PATH]{@link ERROR}" par [Class FoldSystem.createDirPrincipal()]{@link module:foldSystem~FoldSystem#createDirPrincipal}.
     * @see [Class FoldSystem.createDirPrincipal()]{@link module:foldSystem~FoldSystem#createDirPrincipal} est utilisé.
     * @see [Class FoldSystem.clean()]{@link module:foldSystem~FoldSystem#clean} est utilisé.
     * @see [Class FoldSystem.updateListTest()]{@link module:foldSystem~FoldSystem#updateListTest} est utilisé.
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
     * La fonction permet de créer le dossier principal s'il n'existe pas et d'initialiser le chemin absolu dans [Class FoldSytem.PATH]{@link module:foldSystem~FoldSystem#PATH}.
     * @function
     * @param {string} path Chemin du dossier de test.
     * @throws Renvoie une erreur "[PARAM_TYPE]{@link ERROR}" si le chemin du dossier de test n'est pas une chaine de caractère.</br>
     *         Renvoie une erreur "[TYPE_PATH]{@link ERROR}" si le dossier de test existe déjà et qu'il ne s'agit pas d'un dossier.
     * @see [TXT]{@link module:foldSystem~TXT} est utilisé.
     * @see [ERROR]{@link module:foldSystem~ERROR} est utilisé.
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

    /**
     * La fonction permet de supprimer la contenue du dossier de test.
     * @function
     * @see [Class FoldSystem.PATH]{@link module:foldSystem~FoldSystem#PATH} est utilisé.
     */
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

    /**
     * La fonction permet de récupérer l'URL absolue du dossier de test.
     * @function
     * @returns {string}
     * @see [Class FoldSystem.PATH]{@link module:foldSystem~FoldSystem#PATH} est utilisé.
     */
    getPath () {
        return this.#PATH;
    }

//   LIST TEST
    /**
     * La fonction permet de générer une liste d'URL à partir du contenir du dossier de test principal.</br>
     * Le nom des sous-dossiers est utilisé comme nom de test.
     * @function
     * @see [Class FoldSystem.PATH]{@link module:foldSystem~FoldSystem#PATH} est utilisé.
     * @see [Class FoldSystem.LIST_TEST]{@link module:foldSystem~FoldSystem#LIST_TEST} est utilisé.
     */
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

    /**
     * La fonction retourne la liste des tests connue.
     * @function
     * @returns {string[]}
     * @see [Class FoldSystem.LIST_TEST]{@link module:foldSystem~FoldSystem#LIST_TEST} est utilisé.
     */
    getListTest () {
        return Object.keys(this.#LIST_TEST);
    }

    /**
     * La fonction permet de récupérer l'URL du sous-dossier de test.
     * @function
     * @param {string} testName Doit être le nom de test contenue dans la liste de [Class FoldSystem.getListTest()]{@link module:foldSystem~FoldSystem#getTestUrl}.
     * @returns {string} L'URL absolue du sous-dossier de test.
     * @throws Renvoie une erreur "[NOT_IN_LIST]{@link ERROR}" si le test ne fait pas partie de [Class FoldSystem.LIST_TEST]{@link module:foldSystem~FoldSystem#LIST_TEST}.
     * @see [TXT]{@link module:foldSystem~TXT} est utilisé.
     * @see [ERROR]{@link module:foldSystem~ERROR} est utilisé.
     * @see [Class FoldSystem.LIST_TEST]{@link module:foldSystem~FoldSystem#LIST_TEST} est utilisé.
     */
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
     * La fonction va créée un sous-dossier unique de test.</br>
     * Si le dossier de test existe, il sera incrémenté.
     * @function
     * @param {string} nameTest Nom du test. 
     * @returns {string} Nom définitif du test.
     * @throws Renvoie une erreur "[PARAM_TYPE]{@link ERROR}" si le nom du test n'est pas une chaine de caractère.
     * @see [TXT]{@link module:foldSystem~TXT} est utilisé.
     * @see [ERROR]{@link module:foldSystem~ERROR} est utilisé.
     * @see [Class FoldSystem.PATH]{@link module:foldSystem~FoldSystem#PATH} est utilisé.
     * @see [Class FoldSystem.updateListTest]{@link module:foldSystem~FoldSystem#updateListTest} est utilisé.
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