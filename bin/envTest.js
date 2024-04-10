/**
 * Le module permet de mettre en place un environnement de test.
 * @module envTest
 * @author Nicolas Belvoix <belvoixnicolas1997@gmail.com>
 * @copyright Nicolas Belvoix 2024
 * @version 1.4.4
 * @requires module:foldSystem~FoldSystem
 * @requires module:fileLog~FileLog
 * @requires module:cli~Cli
 */

const PATH = require("path");
const FS = require("fs");

const FoldSystem = require("./foldSystem.js");
const FileLog = require("./fileLog.js");
const Cli = require("./Cli.js");

/**
 * Contient [TXT.envTest]{@link TXT}.
 * @constant
 * @type {object}
 */
const TXT = require('./../json/txt.json').envTest;
/**
 * Contient [ERROR]{@link ERROR}.
 */
const ERROR = require("./../json/error.json");

/**
 * La classe permet de gérer un environnement de test.
 * @class
 */
class EnvTest {
    /**
     * La variable stocke l'URL absolue du dossier ou se trouve les fichiers de tests.
     * @type {string}
     * @default "./test"
     */
    #PATH_WORK = "./test";

    /**
     * La variable stocke la liste des tests.
     * @type {Object<module, Object>}
     * @default "{}"
     * @property {Object<test, string>} [nomDuModule] Contiennent les tests du module (le nom de la clé correspond au nom du dossier).
     * @property {string} nomDuModule.test Contient l'URL absolue du fichier Javascript du test à réaliser. Le nom de la clé correspond au nom du fichier sans l'extension.
     */
    #LIST_TEST = {};

    /**
     * La variable contient une instance de là [Class FoldSystem]{@link module:foldSystem~FoldSystem}.
     * @type {module:foldSystem~FoldSystem}
     */
    #FOLD_SYSTEM;

    /**
     * @constructor
     * @param {?string} [pathIn = null] URL du dossier de test.
     * @param {?string} [pathOut = null] URL du dossier de sortie.
     * @throws Renvoie une erreur "[PARAM_TYPE]{@link ERROR}" ou "[TYPE_PATH]{@link ERROR}" par [Class EnvTest.setPathWork()]{@link module:envTest~EnvTest#setPathWork}.
     * @throws Renvoie une erreur "[PARAM_TYPE]{@link ERROR}" ou "[TYPE_PATH]{@link ERROR}" par [Class FoldSystem]{@link module:foldSystem~FoldSystem}.
     * @see [Class FoldSystem]{@link module:foldSystem~FoldSystem} est utilisé.
     * @see [Class EnvTest.PATH_WORK]{@link module:envTest~EnvTest#PATH_WORK} est utilisé.
     * @see [Class EnvTest.setPathWork()]{@link module:envTest~EnvTest#setPathWork} est utilisé.
     * @see [Class EnvTest.updateListTest()]{@link module:envTest~EnvTest#updateListTest} est utilisé.
     */
    constructor (pathIn = null, pathOut = null) {
        let pathInFinal = (pathIn === null)?this.#PATH_WORK:pathIn;
        let pathOutFinal = (pathOut === null)?"./out":pathOut;

        // Intégration de pathWork
            this.#setPathWork(pathInFinal);
            this.#updateListTest();

        // Intégration de FOLD_SYSTEM
            this.#FOLD_SYSTEM = new FoldSystem(pathOutFinal);

        // Sauvegarde de la sortie du terminal
            process.stdout.writeSave = process.stdout.write;
            process.stderr.writeSave = process.stderr.write;
    }

// PATH WORK
    /**
     * La fonction va initialiser l'URL absolue du dossier de test dans [Class EnvTest.PATH_WORK]{@link module:envTest~EnvTest#PATH_WORK}.
     * @function
     * @param {string} path Url du dossier de test.
     * @returns {string} URL absolue du dossier de test.
     * @throws Renvoie une erreur "[PARAM_TYPE]{@link ERROR}" si l'URL du dossier de test n'est pas une chaine de caractère.</br>
     *         Renvoie une erreur "[TYPE_PATH]{@link ERROR}" si l'URL du dossier de test n'existe pas ou si c'est un fichier.
     * @see [TXT]{@link module:envTest~TXT} est utilisé.
     * @see [ERROR]{@link module:envTest~ERROR} est utilisé.
     * @see [Class EnvTest.PATH_WORK]{@link module:envTest~EnvTest#PATH_WORK} est utilisé.
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
     * La fonction permet de récupérer l'URL absolue du dossier de test.
     * @function
     * @returns {string}
     * @see [Class EnvTest.PATH_WORK]{@link module:envTest~EnvTest#PATH_WORK} est utilisé.
     */
    getPathWork () {
        return this.#PATH_WORK;
    }

// LIST TEST
    /**
     * La fonction crée une liste de test à partir du dossier [Class EnvTest.PATHWORK]{@link module:envTest~EnvTest#PATH_WORK}.</br>
     * Les clés sont le nom des sous-dossiers et les sous-clés le nom des fichiers Javascript sans leurs extensions.
     * @function
     * @see [Class EnvTest.PATH_WORK]{@link module:envTest~EnvTest#PATH_WORK} est utilisé.
     * @see [Class EnvTest.LIST_TEST]{@link module:envTest~EnvTest#LIST_TEST} est utilisé.
     */
    #updateListTest = function () {
        let pathWork = this.#PATH_WORK;
        let listFold = FS.readdirSync(pathWork);
        let listTest = {};

        // Récupération de la liste des modules
            for (let module of listFold) {
                let pathModule = PATH.join(pathWork, module);
                let isFold = FS.statSync(pathModule).isDirectory();
                let isInList = Object.keys(listTest).includes(module);

                // Vérification
                    if (!isFold || isInList) {
                        continue;
                    }

                // Création du module
                    listTest[module] = {};

                // Récupération des test
                    for (let test of FS.readdirSync(pathModule)) {
                        let pathTest = PATH.join(pathModule, test);
                        let testFormat = PATH.basename(pathTest, PATH.extname(pathTest));
                        let isFile = FS.statSync(pathTest).isFile();
                        let isInListTest = Object.keys(listTest[module]).includes(testFormat);
                        let isJs = (PATH.extname(pathTest) == ".js" || PATH.extname(pathTest) == ".JS")?true:false;

                        // Vérification
                            if (!isFile || isInListTest || !isJs) {
                                continue;
                            }

                        // Création du test
                            listTest[module][testFormat] = pathTest;
                    }

                // Vérification du nobre de test
                    if (Object.keys(listTest[module]).length <= 0) {
                        delete listTest[module];
                    }
            }

        // Intégration
            this.#LIST_TEST = listTest;
    }

    /**
     * La fonction renvoie la liste des modules de test stocker dans [Class EnvTest.LIST_TEST]{@link module:envTest~EnvTest#LIST_TEST}.
     * @function
     * @returns {string[]} Liste des modules.
     * @see [Class EnvTest.LIST_TEST]{@link module:envTest~EnvTest#LIST_TEST} est utilisé.
     */
    getListModule () {
        let modules = Object.keys(this.#LIST_TEST);

        // Envoie
            return modules;
    }

    /**
     * La fonction permet de récupérer la liste des tests d'un module.
     * @function
     * @param {string} module Le nom du module.
     * @returns {string[]} Liste de noms des tests du module.
     * @throws Renvoie une erreur "[PARAM_TYPE]{@link ERROR}" si le nom du module n'est pas une chaine de caractères.</br>
     *         Renvoie une erreur "[NOT_IN_LIST_TEST]{@link ERROR}" si le module ne fait pas partie de la liste.
     * @see [TXT]{@link module:envTest~TXT} est utilisé.
     * @see [ERROR]{@link module:envTest~ERROR} est utilisé.
     * @see [Class EnvTest.LIST_TEST]{@link module:envTest~EnvTest#LIST_TEST} est utilisé.
     */
    getListTest (module) {
        let listModule = Object.keys(this.#LIST_TEST);
        let isString = typeof module == "string";
        let isInList = isString && listModule.includes(module);
        let listTest;

        // Vérification
            if (!isString) {
                let txt = TXT.getListTest.errorType.replace("@typeModule@", typeof module);
                let error = new Error(txt);

                error.name = ERROR.paramType;

                throw error;
            }else if (!isInList) {
                let txt = TXT.getListTest.errorInList.replace("@module@", module);
                let error = new Error(txt);

                error.name = ERROR.notInListTest;

                throw error;
            }

        // Récupération de la liste
            listTest = Object.keys(this.#LIST_TEST[module]);

        // Envoie
            return listTest;
    }

// TEST
    /**
     * La fonction permet de lancer un test.</br>
     * Pour chaque test [Class FoldSystem.createDirTest()]{@link module:foldSystem~FoldSystem#createDirTest} sera utilisé pour créer un dossier de test.</br>
     * Chaque test recevra une version de [Class Cli]{@link module:cli~Cli} et de l'URL absolue de son dossier de test.</br>
     * Chaque test enregistre la sortie du terminal dans un fichier "out.txt" via [Class fileLog]{@link module:fileLog~FileLog}.
     * @async
     * @function
     * @param {string} module Le nom d'un module contenue dans [Class EnvTest.getListModule()]{@link module:envTest~EnvTest#getListModule}.
     * @param {string} test Le nom du test contenue dans [Class EnvTest.getListTest()]{@link module:envTest~EnvTest#getListTest}.
     * @throws Renvoie une erreur "[NOT_IN_LIST_TEST]{@link ERROR}" si le module ou le test ne font pas partie de la liste.
     * @throws Renvoie une erreur "[PARAM_TYPE]{@link ERROR}" par [Class FoldSystem.createDirTest()]{@link module:foldSystem~FoldSystem#createDirTest}.</br>
     *         Renvoie une erreur "[NOT_IN_LIST]{@link ERROR}" par [Class FoldSystem.getTestUrl()]{@link module:foldSystem~FoldSystem#getTestUrl}.
     * @throws Renvoie une erreur "[PARAM_TYPE]{@link ERROR}" ou "[TYPE_PATH]{@link ERROR}" par [Class FileLog]{@link module:fileLog~FileLog}.</br>
     *         Renvoie une erreur "[PARAM_TYPE]{@link ERROR}" ou "[FILE_CLOSE]{@link ERROR}" par [Class FileLog.write()]{@link module:fileLog~FileLog#write}.
     * @see [TXT]{@link module:envTest~TXT} est utilisé.
     * @see [ERROR]{@link module:envTest~ERROR} est utilisé.
     * @see [Class FoldSystem.createDirTest()]{@link module:foldSystem~FoldSystem#createDirTest} est utilisé.
     * @see [Class FoldSystem.getTestUrl()]{@link module:foldSystem~FoldSystem#getTestUrl} est utilisé.
     * @see [Class FileLog]{@link module:fileLog~FileLog} est utilisé.
     * @see [Class FileLog.write()]{@link module:fileLog~FileLog#write} est utilisé.
     * @see [Class FileLog.close()]{@link module:fileLog~FileLog#close} est utilisé.
     */
    async test (module, test) {
        let isInListModule = Object.keys(this.#LIST_TEST).includes(module);
        let isInListTest = (isInListModule && Object.keys(this.#LIST_TEST[module]).includes(test))?true:false;
        let pathTest = (isInListModule && isInListTest)?this.#LIST_TEST[module][test]:"";
        let nameFoldTest = `${module}_${test}`;
        let pathFoldTest = "";
        let fileLog;
        let saveTitle = process.title;
        let testImport;
        let classTest;

        // Vérification
            if (!isInListModule) {
                let txt = TXT.test.errorNotInListModule.replace("@module@", module);
                let error = new Error(txt);

                error.name = ERROR.notInListTest;

                throw error;
            }else if (!isInListTest) {
                let txt = TXT.test.errorNotInListTest.replace("@module@", module).replace("@test@", test);
                let error = new Error(txt);

                error.name = ERROR.notInListTest;

                throw error;
            }

        // Création du dossier de test
            nameFoldTest = this.#FOLD_SYSTEM.createDirTest(nameFoldTest);
            pathFoldTest = this.#FOLD_SYSTEM.getTestUrl(nameFoldTest);

        // Création du fichier de log
            fileLog = new FileLog(PATH.join(pathFoldTest, "out.txt"));

        // Connection du terminal au fichier txt
            process.stdout.write = (data) => {
                fileLog.write(data);
                process.stdout.writeSave(data);

                return true;
            };
            process.stderr.write = (data) => {
                fileLog.write(data);
                process.stderr.writeSave(data);

                return true;
            };

        // Changement du titre
            process.title = TXT.test.terminalTitre.replace("@module@", module).replace("@test@", test);

        // Lancement du test
            try {
                Cli.titre(TXT.test.titreTest.replace("@module@", module).replace("@test@", test));

                testImport = require(pathTest);
                classTest = new testImport(Cli, pathFoldTest);
                await classTest.start();
            } catch (error) {
                Cli.txt("");
                Cli.txt("");
                Cli.inValid(TXT.test.errorTest.replace("@module@", module).replace("@test@", test));
                Cli.inValid(error);
            }

        // D'éconnection du fichier txt du términal
            process.stdout.write = process.stdout.writeSave;
            process.stderr.write = process.stderr.writeSave;

        // Fermeture du fichier
            fileLog.close();

        // Remise a zéro du titre
            process.title = saveTitle;
    }
}

module.exports = EnvTest;