class Test {
    #CLI
    #PATH

    constructor (cli, path) {
        cli.titre(`Test en construction`);
            this.#CLI = cli;
            this.#PATH = path;
    }

    start () {
        this.#CLI.txt(`Le test a été lancer`);
    }
}

module.exports = Test;