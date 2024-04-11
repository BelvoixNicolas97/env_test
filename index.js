const EnvTest = require("./bin/envTest.js");
const Cli = require("./bin/Cli.js");

const URL_FILE = __filename;
const URL_PROCESS = process.argv[1];

/**
 * @class
 */
class Index {
    #ENV_TEST;

    constructor (argv) {
        let args = argv.slice(2);
        let datas;

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
     * La fonction récupére les donnée envoier par le process.
     * @function
     * @param {string[]} datas Les donée recu.
     * @returns {Object} Les donnée formater.
     * @property {?string} pathIn=null L'url du dossier de test.
     * @property {?string} pathOut=null L'url de sortie.
     * @property {string[]} listTest Liste des test.
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
     * 
     * @async
     * @function
     * @param {*} listTest 
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