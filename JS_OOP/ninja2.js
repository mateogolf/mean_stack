function Ninja(name="",health=100){
    // Create a new class called Ninja with the following attributes:
    this.name = name;
    this.health = health;
    var speed= 3;
    var strength= 3;

    this.sayName = function(){
        console.log("My ninja name is " + this.name+"!");
        return this;
    }
    this.showStats = function () {
        console.log(`Name: ${this.name}, Health: ${this.health},Speed: ${speed},Strength: ${strength}`);
        return this;
    }
    this.drinkSake = function() {
        this.health+=10;
        return this;
    }
    this.punch = function(ninja){
        if(ninja.constructor != Ninja){
            console.log("Target is not a ninja");
            return;
        }
        ninja.health -= 5;
        console.log(`${ninja.name} was punched by ${this.name} and lost 5 Health`);
    }
    this.kick = function (ninja) {
        if (ninja.constructor != Ninja) {
            console.log("Target is not a ninja");
            return;
        }
        ninja.health -= 15;
        console.log(`${ninja.name} was kicked by ${this.name} and lost 15 Health`);
    }
}
var blue_ninja = new Ninja("Goemon");
var red_ninja = new Ninja("Bill Gates");
red_ninja.punch("blue_ninja");
// -> "Goemon was punched by Bill Gates and lost 5 Health!"

blue_ninja.kick(red_ninja);
// -> "Bill Gates was kicked by Goemon and lost 15 Health!"
red_ninja.showStats();
blue_ninja.showStats();
