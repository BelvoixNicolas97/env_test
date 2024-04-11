/**
 * Le module est le point de départ du programme.
 * @module index
 * @author Nicolas Belvoix <belvoixnicolas1997@gmail.com>
 * @copyright Nicolas Belvoix 2024
 * @version 1.4.1
 * @requires module:envTest~EnvTest
 * @requires module:cli~Cli
 */

const EnvTest = require("./bin/envTest.js");
const Cli = require("./bin/Cli.js");

/**
 * Contient l'URL du fichier actuelle.
 * @type {string}
 */
const URL_FILE = __filename;
/**
 * Contient l'url du programme invoquer par le terminal via "process.argv[1]".
 * @type {string}
 */
const URL_PROCESS = process.argv[1];

/**
 * La fonction contient le programme de lancement de l'environnement de test.</br>
 * Les options "-in" et "-out" prennent une URL pour configurer le dossier de test et le dossier de sortie du test.</br>
 * Si "-in" et "-out" sont oubliés. Les valeurs par défaut de [Class EnvTest]{@link module:envTest~EnvTest} seront utilisées.</br>
 * le test peuvent étre soummis de deux maniére "nomDuModule/nomDuTest" et "nomDuModule".</br>
 * Si le nom du test n'est pas soumis. Tous les tests connus du modèle seront lancer.</br>
 * Si aucun test n'est soumis. Tous les tests connus seront lancer.
 * @class
 */
class Index {
    /**
     * La variable contient une instance de [class EnvTest]{@link module:envTest~EnvTest}.
     * @type {module:envTest~EnvTest}
     */
    #ENV_TEST;

    /**
     * @constructor
     * @param {string[]} argv Contenue de "process.argv".
     * @throws Renvoie une erreur "[PARAM_TYPE]{@link ERROR}" ou "[TYPE_PATH]{@link ERROR}" par [Class EnvTest.setPathWork()]{@link module:envTest~EnvTest#setPathWork}.
     * @throws Renvoie une erreur "[PARAM_TYPE]{@link ERROR}" ou "[TYPE_PATH]{@link ERROR}" par [Class FoldSystem]{@link module:foldSystem~FoldSystem}.
     * @see [Class EnvTest]{@link module:envTest~EnvTest} est utilisé.
     * @see [Class EnvTest.getListModule()]{@link module:envTest~EnvTest#getListModule} est utilisé.
     * @see [Class Index.header()]{@link module:index~Index#header} est utilisé.
     * @see [Class Index.getData()]{@link module:index~Index#getData} est utilisé.
     * @see [Class Index.test()]{@link module:index~Index#test} est utilisé.
     */
    constructor (argv) {
        let args = argv.slice(2);
        let datas;

        // Affichage du header
            this.#header();

        // Récupération des donnée
            datas = this.#getData(args);
        
        // Initialisation de l'environement de test
            this.#ENV_TEST = new EnvTest(datas.pathIn, datas.pathOut);

        // Lancement des test
            if (datas.listTest.length <= 0) {
                datas.listTest = this.#ENV_TEST.getListModule();
            }
            this.#test(datas.listTest);
    }

    /**
     * La fonction va écrire de l'entête dans le terminal.
     * @function
     * @see [Class Cli.miss()]{@link module:cli~Cli#miss} est utilisé.
     */
    #header = function () {
        let header = [
            "#-------------------------------------------------------------------------#",
            "|  _____           _                                                 _    |",
            "| |  ___|         (_)                                               | |   |",
            "| | |__ _ ____   ___ _ __ ___  _ __  _ __   ___ _ __ ___   ___ _ __ | |_  |",
            "| |  __| '_ \\ \\ / / | '__/ _ \\| '_ \\| '_ \\ / _ \\ '_ ` _ \\ / _ \\ '_ \\| __| |",
            "| | |__| | | \\ V /| | | | (_) | | | | | | |  __/ | | | | |  __/ | | | |_  |",
            "| \\____/_| |_|\\_/ |_|_|  \\___/|_| |_|_| |_|\\___|_| |_| |_|\\___|_| |_|\\__| |",
            "|                         _        _            _                         |",
            "|                        | |      | |          | |                        |",
            "|                      __| | ___  | |_ ___  ___| |_                       |",
            "|                     / _` |/ _ \\ | __/ _ \\/ __| __|                      |",
            "|                    | (_| |  __/ | ||  __/\\__ \\ |_                       |",
            "|                     \\__,_|\\___|  \\__\\___||___/\\__|                      |",
            "|                                                                         |",
            "#-------------------------------------------------------------------------#"
        ];

        for (let line of header) {
            Cli.miss(line);
        }
    }

    /**
     * La fonction récupérée les données envoyer par le processus.</br>
     * S'il détecte "-in" il utilisera la prochaine valeur comme URL du dossier de test.</br>
     * S'il détecte "-out" il utilisera la prochaine valeur comme URL du dossier de sortie du test.</br>
     * Le reste sera considéré comme un test a faire.
     * @function
     * @param {string[]} datas Les données reçues sans les URL des programmes utilisés.
     * @returns {Object} Les données formater du processus.
     * @property {?string} pathIn=null L'URL du dossier de test.
     * @property {?string} pathOut=null L'URL de sortie.
     * @property {string[]} listTest Liste des tests.
     */
    #getData = function (datas) {
        let result = {
            pathIn: null,
            pathOut: null,
            listTest: []
        };

        // Récupération des données
            for (let index = 0; index < datas.length; index++) {
                let data = datas[index];

                if ("-in" == data) {
                    result.pathIn = datas[index + 1];

                    index++;
                }else if ("-out" == data) {
                    result.pathOut = datas[index + 1];

                    index++;
                }else {
                    result.listTest.push(data);
                }
            }

        // Envoire
            return result;
    }

    /**
     * La fonction lance la séquence de test.
     * @async
     * @function
     * @param {string[]} listTest Liste des tests à effectuer.</br>
     *                            Si le module et le test ne sont pas séparés par un "/". le contenue est considéré comme un module.</br>
     *                            S'il s'agit d'un module. Les tests du module sont récupérés via [Class EnvTest.getListTest()]{@link module:envTest~EnvTest#getListTest}.
     * @see [Class EnvTest.getListTest()]{@link module:envTest~EnvTest#getListTest} est utilisé.
     * @see [Class EnvTest.test()]{@link module:envTest~EnvTest#test} est utilisé.
     * @see [Class Cli.inValid()]{@link module:cli~Cli#inValid} est utilisé.
     * @see [Class Index.ENV_TEST]{@link module:index~Index#ENV_TEST} est utilisé.
     */
    #test = async function (listTest) {
        let envTest =  this.#ENV_TEST;

        for (let data of listTest) {
            let isIncludeTest = data.includes("/");
            let groupListTest = [];

            // Formatage de la liste de test
                if(isIncludeTest) {
                    let posSep = data.search("/");
                    let module = data.slice(0, posSep);
                    let test = data.slice(posSep+1);
                    
                    groupListTest.push({
                        module: module,
                        test: test
                    });
                }else {
                    try {
                        for (let test of envTest.getListTest(data)) {
                            groupListTest.push({
                                module: data,
                                test: test
                            });
                        }
                    } catch (error) {
                        Cli.inValid(error);

                        continue;
                    }
                }
            
            // Test
                for (let test of groupListTest) {
                    try {
                        await envTest.test(test.module, test.test);
                    } catch (error) {
                        Cli.inValid(error);

                        continue;
                    }
                }
        }
    }
}

// SCRIPT
    if (URL_FILE === URL_PROCESS) {
        new Index(process.argv);
    }

    module.exports = EnvTest;