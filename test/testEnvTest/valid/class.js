class Test {
    #CLI
    #PATH

    constructor (cli, path) {
        cli.subTitre(`Test en construction`);
            this.#CLI = cli;
            this.#PATH = path;
    }

    start () {
        this.#CLI.subTitre(`Le test a été lancer`);
    }
}

module.exports = Test;