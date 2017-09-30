// console.log('\u263A        \u2603        \u272f');
// let text = 'Hello I\'m Oscar';
// console.log(text);

//Hoisting
var foo;                  // 'foo' is a declaration, it's global and gets hoisted
function magic() {         // 'magic()' also gets hoisted to the top
    var foo;              // here 'foo' is declared within 'magic()' and gets hoisted
    foo = "hello world";  // we assign a value to our function scoped 'foo'
    console.log(foo);     // we log it as 'hello world'
}
foo = "bar";              // here, we assign a value to the global 'foo'
magic();                  // magic is called, the first console.log runs
console.log(foo);         // finally we log the global foo

//Functions act like a cage, preventing declarations from rising past.
// Key Rules of Hoisting
// • Variable declarations rise to the top of their scope like hot air balloons.

// • Functions create their own scope and act like cages, preventing declarations from rising out.

// • Assignments, or = signs, act like anchors.They stay put, no matter how the code is rearranged.

// • let and const will throw an error if called before they get assigned.
//Debugging JS

// Recap
// When debugging your JS, always confirm that you have no syntax errors first.Your code will not run until those syntax errors are fixed.
// When hunting  syntax errors, typically the actual problem is before the line that errored.Work backwards from there.
// Console.log everything! Often times the biggest errors come from faulty assumptions.That variable you thought was a string was actually an array of strings, which can completely change your logic.
// Run your code early and often, especially at first.If you're writing 20 or 30 lines of JavaScript at a time before seeing if any of it works, you're coding too much! The stronger you get with JS, the more assumptions you can make, but at first assume nothing!