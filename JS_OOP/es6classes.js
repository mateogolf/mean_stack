// Old ES5 way
// var Dot = function Dot(x, y) {
//     this.x = x;
//     this.y = y;
// }
// Dot.prototype.showLocation(){
//     console.log("This Dot is at x " + this.x + " and y " + this.y);
// }
// var dot1 = new Dot(55, 20);
// dot1.showLocation();
// New ES6 way
class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    showLocation() {
        // ES6 String Interpolation!
        console.log(`This Dot is at x ${this.x} and y ${this.y}`);
    }
    // simple method in the parent class: see below for call
    parentFunction() {
        return "This is coming from the parent!";
    }
}
let dot2 = new Dot(5, 13);
dot2.showLocation();

// class Dot2 {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
//     // prototype method
//     showLocation() {
//         console.log(`This Dot is at x ${this.x} and y ${this.y}`);
//     }
//     // static method
//     static getHelp() {
//         console.log("This is a Dot class, for created Dots! A Dot takes x and y coordinates, type 'new Dot' to create one!");
//     }
// }
// let dot3 = new Dot2(4, 2);
// // we can see showLocation from our instance...
// console.log(dot3.showLocation);
// // but we can't see getHelp
// // console.log(getHelp);
// // however we can call getHelp this way:
// Dot2.getHelp()
// // parent Dot class
// class Dot {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
//     showLocation() {
//         console.log(`This Dot is at x ${this.x} and y ${this.y}`);
//     }
// }
// child Circle class
class Circle extends Dot {
    constructor(x, y, radius) {
        super(x, y);
        this.radius = radius
    }
    showLocation() {
        console.log(`This Circle is at x ${this.x} and y ${this.y}`);
    }
    // simple function in the child class
    childFunction() {
        // by using super, we can call the parent method
        let message = super.parentFunction();
        console.log(message);
    }
}
// we can now create Circles
let circle1 = new Circle(33, 33, 33);
// same attributes as a Dot, plus a radius
console.log(circle1);
// and Circles can access Dot methods
circle1.showLocation();
let cerk = new Circle(1, 2, 3);
cerk.childFunction();
cerk.parentFunction();