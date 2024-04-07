const Cli = require("../bin/Cli.js");
const EnvTest = require("../bin/envTest.js");

const PATH_TEST = "./test/testEnvTest";
const MODEL_LIST_TEST = {
    test2: {
        file: "file"
    }
};

async function main () {
        let envTest;

    Cli.titre("Test de la class EnvTest");

        envTest = testInitEnvTest();
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
                envTest = new EnvTest(PATH_TEST);

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

main();