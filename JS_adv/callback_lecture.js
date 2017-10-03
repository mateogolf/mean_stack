function sayHello(name, cd) {
    console.log("Hello " + name);
    cd();
}
function sayGoodbye() {
    console.log("goodbye");
}

sayHello("Matt", sayGoodbye);