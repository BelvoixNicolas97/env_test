const Fs = require("fs");

const Cli = require("../bin/Cli.js");
const FoldSystem = require("../bin/foldSystem.js");

const PATH_DIR_TEST = "./test/out";

async function main () {
    Cli.titre("Test de la class FoldSystem");
        initClass();
}

function initClass () {
    Cli.subTitre(`Initialisation de la class FoldSystem`);
        try {
            new FoldSystem();
            Cli.inValid("La class a été initialiser à vide");

            process.exit();
        } catch (error) {
            Cli.valid("La class n'a pas été initialiser à vide");
            Cli.valid(error);
        }

        try {
            new FoldSystem("./package.json");

            Cli.inValid(`La class a été initialiser sur la base d'un fichier`);
        } catch (error) {
            Cli.valid("La class n'a pas été initialiser sur la base d'un fichier");
            Cli.valid(error);
        }

        try {
            new FoldSystem(PATH_DIR_TEST);

            if (Fs.existsSync(PATH_DIR_TEST) && Fs.statSync(PATH_DIR_TEST).isDirectory()) {
                Cli.valid(`Le dossier "${PATH_DIR_TEST}" a été crée`);
            }else {
                Cli.miss(`Le dossier "${PATH_DIR_TEST}" n'a pas été crée`);
            }
        } catch (error) {
            Cli.inValid("La class n'a pas été initialiser");
            Cli.inValid(error);

            process.exit();
        }
}

main();