const Cli = require("../bin/Cli.js");
const FoldSystem = require("../bin/foldSystem.js");

async function main () {
    Cli.titre("Test de la class FoldSystem");
        let foldSystem;

    Cli.subTitre(`Test de la construction de la class`);
        try {
            new FoldSystem("./test/out/test");
            foldSystem = new FoldSystem("./test/out/test");
        } catch (error) {
            Cli.inValid(`La class FoldSystem n'a pas put étre crée.`);
            Cli.inValid(error);

            process.exit();
        }
        Cli.valid(`La class FoldSystem a été crée.`);
}

main();