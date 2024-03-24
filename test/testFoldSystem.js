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
    Cli.subTitre(`Test d'initialisation de la class FoldSystem`);
        Cli.txt(`Initialisation de la class sans url du dossier`);
            try {
                new FoldSystem();
                Cli.cleanUpLine();
                Cli.inValid("La class a été initialiser sans url de dossier");

                process.exit();
            } catch (error) {
                Cli.cleanUpLine();
                Cli.valid("La class n'a pas été initialiser sans url de dossier");
                Cli.valid(error);
                Cli.txt("");
            }

        Cli.txt(`Initialisation de la class sur l'url d'un fichier`);
            try {
                new FoldSystem("./package.json");

                Cli.cleanUpLine();
                Cli.inValid(`La class a été initialiser sur l'url d'un fichier`);
            } catch (error) {
                Cli.cleanUpLine();
                Cli.valid("La class n'a pas été initialiser sur l'url d'un fichier");
                Cli.valid(error);
                Cli.txt("");
            }

        Cli.txt(`Initialisation de la class sur l'url du dossier "${PATH_DIR_TEST}"`);
            try {
                new FoldSystem(PATH_DIR_TEST);

                if (Fs.existsSync(PATH_DIR_TEST) && Fs.statSync(PATH_DIR_TEST).isDirectory()) {
                    Cli.cleanUpLine();
                    Cli.valid(`La class a été initialiser et e dossier "${PATH_DIR_TEST}" a été crée`);
                }else {
                    Cli.cleanUpLine();
                    Cli.miss(`La class a été initialiser et e dossier "${PATH_DIR_TEST}" n'a pas été crée`);
                }
            } catch (error) {
                Cli.cleanUpLine();
                Cli.inValid(`La class n'a pas été initialisation sur l'url du dossier "${PATH_DIR_TEST}"`);
                Cli.inValid(error);

                process.exit();
            }
}

function createSubDir () {
    let foldSystem;
    let pathAbsolue;

    Cli.subTitre("Création d'un dossier de sous test");
        Cli.txt(`Initialisation de la class`);
            try {
                foldSystem = new FoldSystem(PATH_DIR_TEST);
            } catch (error) {
                Cli.cleanUpLine();
                Cli.inValid(`La class n'a pas été initialiser sur le dossier "${PATH_DIR_TEST}"`);
                Cli.inValid(error);

                process.exit();
            }
            Cli.cleanUpLine();
            Cli.valid(`La class a été initialiser\r\n`);

        Cli.txt("Création d'un dossier erroner");
            try {
                foldSystem.createDirTest(56);

                Cli.cleanUpLine();
                Cli.inValid(`Le dossier erroner a été crée`);
                Cli.txt("");
            } catch (error) {
                Cli.cleanUpLine();
                Cli.valid(`Le dossier erroner n'a pas été crée`);
                Cli.valid(error);
                Cli.txt("");
            }

        Cli.txt(`Création d'un sous dossier`);
            try {
                let path = PATH.resolve(PATH.join(PATH_DIR_TEST, "test"));
                
                pathAbsolue = foldSystem.createDirTest("test");

                Cli.cleanUpLine();
                if (!Fs.existsSync(pathAbsolue)) {
                    Cli.inValid(`Le dossier "${pathAbsolue}" n'a pas été crée`);
                    Cli.txt("");
                }else if (!Fs.statSync(pathAbsolue).isDirectory()) {
                    Cli.inValid(`Le dossier "${pathAbsolue}" n'est pas un dossier`);
                    Cli.txt("");
                }else if (path != pathAbsolue) {
                    Cli.miss(`Le dossier "${pathAbsolue}" a été crée au lieu de "${path}"`);
                    Cli.txt("");
                }else {
                    Cli.valid(`Le dossier "${pathAbsolue}" a été crée`);
                    Cli.txt("");
                }
            } catch (error) {
                Cli.cleanUpLine();
                Cli.inValid("Le dossier de test n'a pas put étre crée");
                Cli.inValid(error);
                Cli.txt("");
            }

        Cli.txt(`Création d'un sous dossier existant`);
            try {
                let path = PATH.resolve(PATH.join(PATH_DIR_TEST, "test1"));
                
                pathAbsolue = foldSystem.createDirTest("test");

                Cli.cleanUpLine();
                if (!Fs.existsSync(pathAbsolue)) {
                    Cli.inValid(`Le dossier existant "${pathAbsolue}" n'a pas été crée`);
                }else if (!Fs.statSync(pathAbsolue).isDirectory()) {
                    Cli.inValid(`Le dossier existant "${pathAbsolue}" n'est pas un dossier`);
                }else if (path != pathAbsolue) {
                    Cli.miss(`Le dossier existant "${pathAbsolue}" a été crée au lieu de "${path}"`);
                }else {
                    Cli.valid(`Le dossier existant "${pathAbsolue}" a été crée`);
                }
            } catch (error) {
                Cli.cleanUpLine();
                Cli.inValid("Le dossier existant de test n'a pas put étre crée");
                Cli.inValid(error);
            }
}

main();