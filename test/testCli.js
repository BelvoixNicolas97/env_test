const CLI = require("./../bin/Cli.js");

async function main () {
    CLI.titre("Test de la class Cli");
    CLI.subTitre("Test de la fonction subTitre");
    CLI.valid("Test de la function de la fonction valid");
    CLI.miss("Test de la fonction miss");
    CLI.inValid("Test de la fonction inValid");
    await CLI.yesOrNo("Test de la fonction yesOrNo");
}

main();