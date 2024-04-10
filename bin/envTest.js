/**
 * Le module permet de mettre en place un environnement de test.
 * @module envTest
 * @author Nicolas Belvoix <belvoixnicolas1997@gmail.com>
 * @copyright Nicolas Belvoix 2024
 * @version 1.4.1
 */

const PATH = require("path");
const FS = require("fs");

const FoldSystem = require("./foldSystem.js");
const FileLog = require("./fileLog.js");
const Cli = require("./Cli.js");

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
    /**
     * Url absolue du dossier de test.
     * @type {string}
     * @default "./test"
     */
    #PATH_WORK = "./test";

    /**
     * Liste des modules et des test.
     * @type {Object}
     * @default "{}"
     */
    #LIST_TEST = {};

    /**
     * Contient la [Class FoldSystem]{@link module:foldSystem~FoldSystem};
     * @type {module:foldSystem~FoldSystem}
     */
    #FOLD_SYSTEM;

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

// LIST TEST
    /**
     * Update de la liste de test
     * @function
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
     * Retourne la liste des module de test
     * @returns {string[]} List module
     */
    getListModule () {
        let modules = Object.keys(this.#LIST_TEST);

        // Envoie
            return modules;
    }

    /**
     * Récupére la liste des tests d'un module.
     * @function
     * @param {string} module Le module a récupérer
     * @returns {string[]} Nom des tests.
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
            process.title = `Teste du module ${module}.${test}`;

        // Lancement du test
            try {
                testImport = require(pathTest);
                classTest = new testImport(Cli, pathFoldTest);
                await classTest.start();
            } catch (error) {
                Cli.txt("");
                Cli.txt("");
                Cli.inValid(`Une erreur c'est produit lors du test du module ${module}.${test}.`);
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