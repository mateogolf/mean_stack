class Ninja {
    // Create a new class called Ninja with the following attributes:
    constructor(name = "", health = 100,speed=3,strength=3){
        this.name = name;
        this.health = health;
        this.speed = speed;
        this.strength = strength;
    }

    sayName(){
        console.log("My ninja name is " + this.name + "!");
        return this;
    }
    showStats(){
        console.log(`Name: ${this.name}, Health: ${this.health},Speed: ${this.speed},Strength: ${this.strength}`);
        return this;
    }
    drinkSake(){
        this.health += 10;
        return this;
    }
}

var ninja1 = new Ninja("Hyabusa");
ninja1.sayName();
// -> "My ninja name is Hyabusa!"
ninja1.showStats();
// -> "Name: Hayabusa, Health: 100, Speed: 3, Strength: 3"

class Sensei extends Ninja{
    constructor(name = "", health = 200, speed = 10, strength = 10) {
        super(name, health, speed, strength);
        this.wisdom = 10;
    }
    speakWisdom(){
        this.drinkSake();
        console.log("What one programmer can do in one month, two programmers can do in two months.");
        return this;
    }
}
// example output
let super_sensei = new Sensei("Master Splinter");
super_sensei.speakWisdom();
// -> "What one programmer can do in one month, two programmers can do in two months."
super_sensei.showStats();
// -> "Name: Master Splinter, Health: 210, Speed: 10, Strength: 10"