// 1
console.log(hello);
var hello = 'world';
//Output=>undefined
// 2
var needle = 'haystack';
test();


function test() {
    var needle = 'magnet';
    console.log(needle);
}
//OUTPUT: ==>magnet
// 3
var brendan = 'super cool';
function print() {
    brendan = 'only okay';
    console.log(brendan);
}
console.log(brendan);
//Output:
//super cool (function wan't called)

// 4
var food = 'chicken';
console.log(food);//OUTPUT: chicken
eat();
function eat() {
    food = 'half-chicken';
    console.log(food);
    var food = ‘gone’;//Syntax error, should be ', not ’  AND this code doesn't change anything
}
//Output if fixed syntax error==>
//chicken
//half-chicken

// 5
mean();//mean not a function, never called
console.log(food);//food NOT defined
var mean = function () {
    food = "chicken"; //not defined with var,
    console.log(food); //OUTPUT=>undefined
    var food = "fish";
    console.log(food);
}
console.log(food);
OUTPUT: NONE, Syntax ERROR @ mean()


// 6
console.log(genre);//undefined
var genre = "disco";
rewind();
function rewind() {
    genre = "rock";
    console.log(genre);
    var genre = "r&b";
    console.log(genre);
}
console.log(genre);
//OUTPUT=>
//undefined
//rock
//r&b
//disco


// 7
dojo = "san jose";
console.log(dojo);
learn();
function learn() {
    dojo = "seattle";
    console.log(dojo);
    var dojo = "burbank";//declared somewhere, so using dojo before doesn't break it.
    console.log(dojo);
}
console.log(dojo);
//OUTPUT=>
//san jose
//seattle
//burbank
//san jose