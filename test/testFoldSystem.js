const Fs = require("fs");
const PATH = require("path");

const Cli = require("../bin/Cli.js");
const FoldSystem = require("../bin/foldSystem.js");

const PATH_DIR_TEST = "./test/out";

async function main () {
    Cli.titre("Test de la class FoldSystem");
        initClass();
        createSubDir();
}

function initClass () {
    let foldSystem;
    Cli.subTitre(`Test d'initialisation de la class FoldSystem`);
        Cli.txt(`Initialisation de la Class sans URL du dossier.`);
            try {
                foldSystem = new FoldSystem();
                Cli.cleanUpLine();
                Cli.inValid(`La Class a été initialiser sans URL de dossier.`);
                Cli.inValid(`Path: "${foldSystem.getPath()}"`);

                process.exit();
            } catch (error) {
                Cli.cleanUpLine();
                Cli.valid("La class n'a pas été initialiser sans URL de dossier.");
                Cli.valid(error);
                Cli.txt("");
            }

        Cli.txt(`Initialisation de la Class sur l'URL d'un fichier.`);
            try {
                foldSystem = new FoldSystem("./package.json");

                Cli.cleanUpLine();
                Cli.inValid(`La Class a été initialiser sur l'URL d'un fichier.`);
                Cli.inValid(`Path: "${foldSystem.getPath()}"`);
                Cli.txt("");
            } catch (error) {
                Cli.cleanUpLine();
                Cli.valid("La class n'a pas été initialiser sur l'URL d'un fichier.");
                Cli.valid(error);
                Cli.txt("");
            }

        Cli.txt(`Initialisation de la class sur l'URL du dossier "${PATH_DIR_TEST}".`);
            try {
                foldSystem = new FoldSystem(PATH_DIR_TEST);

                if (Fs.existsSync(PATH_DIR_TEST) && Fs.statSync(PATH_DIR_TEST).isDirectory()) {
                    Cli.cleanUpLine();
                    Cli.valid(`La Class a été initialiser et e dossier "${PATH_DIR_TEST}" a été crée.`);
                    Cli.valid(`Path: "${foldSystem.getPath()}"`);
                }else {
                    Cli.cleanUpLine();
                    Cli.miss(`La Class a été initialiser et e dossier "${PATH_DIR_TEST}" n'a pas été crée.`);
                    Cli.miss(`Path: "${foldSystem.getPath()}"`);
                }
            } catch (error) {
                Cli.cleanUpLine();
                Cli.inValid(`La class n'a pas été initialisation sur l'URL du dossier "${PATH_DIR_TEST}".`);
                Cli.inValid(error);

                process.exit();
            }
}

function createSubDir () {
    let foldSystem;

    Cli.subTitre("Création d'un dossier de sous test");
        Cli.txt(`Initialisation de la class.`);
            try {
                foldSystem = new FoldSystem(PATH_DIR_TEST);
            } catch (error) {
                Cli.cleanUpLine();
                Cli.inValid(`La class n'a pas été initialiser sur le dossier "${PATH_DIR_TEST}".`);
                Cli.inValid(error);

                process.exit();
            }
            Cli.cleanUpLine();
            Cli.valid(`La class a été initialiser.\r\n`);

        Cli.txt("Création d'un dossier erroné.");
            try {
                foldSystem.createDirTest(56);

                Cli.cleanUpLine();
                Cli.inValid(`Le dossier erroné a été crée.`);
                Cli.txt("");
            } catch (error) {
                Cli.cleanUpLine();
                Cli.valid(`Le dossier erroné n'a pas été crée.`);
                Cli.valid(error);
                Cli.txt("");
            }

        Cli.txt(`Création d'un sous-dossier.`);
            try {
                let path = PATH.resolve(PATH.join(PATH_DIR_TEST, "test"));
                let testName;
                let pathAbsolue;
                
                testName = foldSystem.createDirTest("test");
                pathAbsolue = foldSystem.getTestUrl(testName);

                Cli.cleanUpLine();
                if (!Fs.existsSync(pathAbsolue)) {
                    Cli.inValid(`Le dossier "${pathAbsolue}" n'a pas été créé.`);
                    Cli.txt("");
                }else if (!Fs.statSync(pathAbsolue).isDirectory()) {
                    Cli.inValid(`Le dossier "${pathAbsolue}" n'est pas un dossier.`);
                    Cli.txt("");
                }else if (path != pathAbsolue) {
                    Cli.miss(`Le dossier "${pathAbsolue}" a été créé au lieu de "${path}".`);
                    Cli.txt("");
                }else {
                    Cli.valid(`Le dossier "${pathAbsolue}" a été créé.`);
                    Cli.txt("");
                }
            } catch (error) {
                Cli.cleanUpLine();
                Cli.inValid("Le dossier de test n'a pas pu être créé.");
                Cli.inValid(error);
                Cli.txt("");
            }

        Cli.txt(`Création d'un sous-dossier existant.`);
            try {
                let path = PATH.resolve(PATH.join(PATH_DIR_TEST, "test1"));
                let testName;
                let pathAbsolue;
                
                testName = foldSystem.createDirTest("test");
                pathAbsolue = foldSystem.getTestUrl(testName);

                Cli.cleanUpLine();
                if (!Fs.existsSync(pathAbsolue)) {
                    Cli.inValid(`Le dossier existant "${pathAbsolue}" n'a pas été créé.`);
                }else if (!Fs.statSync(pathAbsolue).isDirectory()) {
                    Cli.inValid(`Le dossier existant "${pathAbsolue}" n'est pas un dossier.`);
                }else if (path != pathAbsolue) {
                    Cli.miss(`Le dossier existant "${pathAbsolue}" a été créé au lieu de "${path}".`);
                }else {
                    Cli.valid(`Le dossier existant "${pathAbsolue}" a été créé.`);
                }
            } catch (error) {
                Cli.cleanUpLine();
                Cli.inValid("Le dossier existant de test n'a pas pu être créé.");
                Cli.inValid(error);
            }
}

main();