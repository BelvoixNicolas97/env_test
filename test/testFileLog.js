const FS = require("fs");
const CRYPTO = require("crypto");

const Cli = require("../bin/Cli.js");
const FileLog = require("../bin/fileLog.js");

const PATH_DIR_TEST = "./test/out/testLog";

async function main () {
    Cli.titre("Test de la class FileLog");
        if (!FS.existsSync(PATH_DIR_TEST)) {
            Cli.subTitre("Création du dossier de test");
            Cli.txt(`Création du dossier "${PATH_DIR_TEST}" en cours ...`);
            try {
                FS.mkdirSync(PATH_DIR_TEST, {recursive: true});
            } catch (error) {
                Cli.cleanUpLine();
                Cli.inValid(`Le dossier "${PATH_DIR_TEST}" n'a pas put étre crée.`);
                Cli.inValid(error);

                process.exit();
            }
            Cli.cleanUpLine();
            Cli.valid(`Le dossier de test "${PATH_DIR_TEST}" a été crée.`);
        }else if (!FS.statSync(PATH_DIR_TEST).isDirectory()) {
            Cli.inValid(`Le dossier "${PATH_DIR_TEST}" existe déja et c'est un fichier.`);

            process.exit();
        }

        // Test
            testInit();

            testWrite(1);
            testWrite(100);
            testWrite(1000);
            testWrite(10000);
            testWrite(100000);
            testWrite(1000000);
}

function testInit () {
    Cli.subTitre(`Test d'initialisation de la class`);
        Cli.txt(`Initialisation sur un url erroner`);
            try {
                let file = new FileLog(5);

                Cli.cleanUpLine();
                Cli.inValid(`La class a été initialiser sur un url erroner`);
                Cli.inValid(`Path: "${file.getPath()} | Size: ${file.getByte()} Octers`);
                Cli.txt("");
            } catch (error) {
                Cli.cleanUpLine();
                Cli.valid(`La class n'a pas été initialiser sur une url erroner`);
                Cli.valid(error);
                Cli.txt("");
            }

        Cli.txt(`Initialisation de la class via le dossier "${PATH_DIR_TEST}"`);
            try {
                let file = new FileLog(PATH_DIR_TEST);

                Cli.cleanUpLine();
                Cli.inValid(`La class a été initialiser via le dossier "${PATH_DIR_TEST}"`);
                Cli.inValid(`Path: "${file.getPath()} | Size: ${file.getByte()} Octers`);
                Cli.txt("");
            } catch (error) {
                Cli.cleanUpLine();
                Cli.valid(`La class n'a pas été initialiser via le dossier "${PATH_DIR_TEST}"`);
                Cli.valid(error);
                Cli.txt("");
            }
        
        Cli.txt(`Initialisation de la class via le fichier "${PATH_DIR_TEST}/test.log"`);
            try {
                let file = new FileLog(PATH_DIR_TEST + "/test.log");

                Cli.cleanUpLine();
                Cli.valid(`La class a été initialiser vias un fichier`);
                Cli.valid(`Path: "${file.getPath()} | Size: ${file.getByte()} Octers`);
                Cli.txt("");
            } catch (error) {
                Cli.cleanUpLine();
                Cli.inValid(`La class n'a pas été initialiser via le fichier "${PATH_DIR_TEST}/test.log"`);
                Cli.inValid(error);
                Cli.txt("");
            }

        Cli.txt(`Initialisation de la class via un fichier déja initialiser`);
            try {
                let file = new FileLog(PATH_DIR_TEST + "/test.log");

                Cli.cleanUpLine();
                Cli.valid(`La class a été initialiser via un fichier déja initialiser`);
                Cli.valid(`Path: "${file.getPath()} | Size: ${file.getByte()} Octers`);
            } catch (error) {
                Cli.cleanUpLine();
                Cli.inValid(`La class n'a pas été initialiser via un fichier déja initialiser`);
                Cli.inValid(error);
            }
}

function testWrite (x=1, nbCaract=10000) {
    let file;
    let nbWrite = 0;

    Cli.subTitre("Test d'écriture");
        Cli.txt(`Initialisation de la class`);
        try {
            file = new FileLog(PATH_DIR_TEST + "/testWrite.log");

            Cli.cleanUpLine();
            Cli.valid(`La class a été initialiser sur "${PATH_DIR_TEST + "/testWrite.log"}"`);
            Cli.txt("");
        } catch (error) {
            Cli.cleanUpLine();
            Cli.inValid(`La class n'a pas été initialiser`);
            Cli.inValid(error);

            process.exit();
        }

        Cli.txt(`Ecriture ${x} fois dans le fichier sur avec des partie de ${nbCaract} caractère\r\n`);
            try {
                while (nbWrite < x) {
                    let txt = CRYPTO.randomBytes(nbCaract/2).toString("hex");
                    let nbWriteFile = 0;

                    nbWriteFile = file.write(txt);
                    nbWrite++;

                    Cli.cleanUpLine();
                    Cli.txt(`${nbWrite}/${x} ${nbWriteFile} Octer écrit`)
                }
            } catch (error) {
                Cli.inValid(`Le fichier a c'éser d'écrire a la ${nbWrite}/${x} fois`);
                Cli.inValid(error);

                process.exit();
            }
            Cli.cleanUpLine(2);
            Cli.valid(`Le fichier "${file.getPath()}" a été écrit ${nbWrite} fois (${file.getByteWrite()} Octers)`);
            Cli.txt("");
}

main();