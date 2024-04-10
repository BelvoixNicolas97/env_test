const Cli = require("../bin/Cli.js");
const EnvTest = require("../bin/envTest.js");

const PATH_TEST = "./test/testEnvTest";
const PATH_OUT = "./test/outTestEnvTest"
const MODEL_LIST_TEST = {
    test2: {
        fileVide: ""
    }
};

let ENV_TEST;

async function main () {
    Cli.titre("Test de la class EnvTest");

        ENV_TEST = testInitEnvTest();
        testListTest();
        await test();

}

function testInitEnvTest () {
    Cli.subTitre(`Test d'initialisation de la Class EnvTest`);
        let pathFile = "./package.json";
        let envTest;

        Cli.txt(`Initialisation par défault`);
            try {
                envTest = new EnvTest();

                Cli.cleanUpLine();
                Cli.valid(`Initialisation par défault a aboutie.`);
                Cli.valid(`Modules(${envTest.getListModule().length}): ${envTest.getListModule()}`);
            } catch (error) {
                Cli.cleanUpLine();
                Cli.inValid(`Initialisation par défau a échouer`);
                Cli.inValid(error);
            }

        Cli.txt(`Initialisation avec une valeur erroner`);
            try {
                envTest = new EnvTest(56);

                Cli.cleanUpLine();
                Cli.inValid(`Initialisation avec une valeur erroner a aboutie.`);
                Cli.inValid(`Modules(${envTest.getListModule().length}): ${envTest.getListModule()}`);
            } catch (error) {
                Cli.cleanUpLine();
                Cli.valid(`Initialisation avec une valeur erroner a échouer`);
                Cli.valid(error);
            }

        Cli.txt(`Initialisation sur un fichier`);
            try {
                envTest = new EnvTest(pathFile);

                Cli.cleanUpLine();
                Cli.inValid(`Initialisation sur un fichier a aboutie.`);
                Cli.inValid(`Modules(${envTest.getListModule().length}): ${envTest.getListModule()}`);
            } catch (error) {
                Cli.cleanUpLine();
                Cli.valid(`Initialisation sur un fichier a échouer`);
                Cli.valid(error);
            }

        Cli.txt(`Initialisation sur un dossier valide`);
            try {
                envTest = new EnvTest(PATH_TEST, PATH_OUT);

                Cli.cleanUpLine();
                Cli.valid(`Initialisation sur un dossier valide a aboutie.`);
                Cli.valid(`Modules(${envTest.getListModule().length}): ${envTest.getListModule()}`);
            } catch (error) {
                Cli.cleanUpLine();
                Cli.inValid(`Initialisation sur un dossier valide a échouer`);
                Cli.inValid(error);

                throw error;
            }

        // Envoie
            return envTest;
}

function testListTest () {
    Cli.subTitre(`Test de la liste de test générer`);
        let listTest = {};

    Cli.txt(`Récupération de la liste`);
        try {
            for (let module of ENV_TEST.getListModule()) {
                listTest[module] = {};

                for (let test of ENV_TEST.getListTest(module)) {
                    listTest[module][test] = "";
                }
            }

            console.log(listTest);
        } catch (error) {
            Cli.cleanUpLine();
            Cli.inValid(`La récupération de la liste de tes a échouer.`);
            Cli.inValid(error);

            throw error;
        }
        Cli.cleanUpLine();
        Cli.valid(`Récupération de la liste términer`);
        if (JSON.stringify(listTest) === JSON.stringify(MODEL_LIST_TEST)) {
            Cli.valid(JSON.stringify(listTest, null, 2));
        }else {
            Cli.miss(`La liste n'est différent`);
            Cli.miss("Model:")
            Cli.miss(JSON.stringify(MODEL_LIST_TEST, null, 2));
            Cli.miss("Ressus:")
            Cli.miss(JSON.stringify(listTest, null, 2));
        }
}

async function test () {
    Cli.subTitre("Test du lancement des tests");
        let listTest = [];

    Cli.txt("Récupération des tests");
        for (let module of ENV_TEST.getListModule()) {
            for (let test of ENV_TEST.getListTest(module)) {
                listTest.push({
                    module: module,
                    test: test
                });
            }
        }
        Cli.cleanUpLine();
        Cli.valid(`Récupération des tests términer (${listTest.length} tests récupérés)`);

    Cli.txt(`Lancement de ${listTest.length} tests :`);
        for (let test of listTest) {
            await ENV_TEST.test(test.module, test.test);
        }
        Cli.valid(`Les ${listTest.length} tests en été fait`);
}

main();