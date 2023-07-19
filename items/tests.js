function assert(value) {
    if (!value) {
        throw new Error();
    }
}

function foo() {
    assert(true);
}

function bar() {
    assert(false);
}

const tests = [
    foo,
    bar,
];

function runTests() {
    tests.forEach(element => {
        try {
            element();
            console.log(`${element.name}: Success`);
        } catch (error) {
            console.log(`${element.name}:`);
            console.log(error);
        }
    });
}

runTests();