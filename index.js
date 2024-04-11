function test () {
    console.log("dekpz");

    setImmediate(test);
}

test();

export default test;