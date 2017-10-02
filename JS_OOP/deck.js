class Card{
    constructor(value,suit){
        if(value>13){
            console.log("Don't break my card with a bad value")
        }else{
            this.value = value;
        }
        if(this.isSuit(suit)){
            this.suit = suit;
        }else{
            console.log("Not a valid suit");
        }
        
    }
    isSuit(newSuit){
        var suits = ["♦", "♥", "♠", "♣"];
        for(let i=0;i<suits.length;i++){
            if(suits[i] === newSuit){
                return true;
            }
        }
        return false;
    }
    show(){
        if (this.value == 1) {
            return this.suit + ":A";
        } else if (this.value == 11) {
            return this.suit + ":J";
        } else if (this.value == 12) {
            return this.suit + ":Q";
        } else if (this.value == 13) {
            return this.suit + ":K";
        } else {
            return this.suit + ":" + this.value;
        }
    }
}

class Deck{
    constructor(){
        this.cards = [];
        this.reset();
        console.log(this.cards.length);
    }
    printDeck(){
        var string = "";
        for(let i=0;i<this.cards.length;i++){
            string += this.cards[i].show() + ", ";
        }
        return string;
    }
    get deck(){
        return this.cards;
    }
    set deck(cards){
        if(cards.constructor == Array){
            this.cards = cards;
        }
        else { console.log("Not an array of cards");}
    }
    // The Deck should be able to shuffle
    cut(){
        let random = Math.floor((Math.random() * this.cards.length));
        let first = this.cards.slice(0, random);
        let second = this.cards.slice(random, this.cards.length);
        this.cards = second.concat(first);
        this.printDeck();
    }
    shuffle(shuffleCount=1){
        for (let count = 0; count < shuffleCount;count++){
            this.cut();
            var shuffled = [];
            var half = Math.floor((Math.random()*this.cards.length));
            var first = this.cards.slice(0,half);
            var second = this.cards.slice(half, this.cards.length);
            if(first.length >= second.length){
                var loopCount = first.length;
            }else{
                var loopCount = second.length;
            }
            for(let i=0;i<loopCount;i++){
                if(i<first.length){
                    shuffled.push(first[i]);
                }
                if(i<second.length){
                    shuffled.push(second[i]);
                }
            }
            this.cards = shuffled;
            return this;
        }
    }
    // The Deck should be able to reset
    reset(){
        this.cards = [];
        var suits = ["♦", "♥", "♠", "♣"];
        for (let i = 0; i < suits.length; i++) {
            for (let val = 1; val < 14; val++) {
                var newCard = new Card(val, suits[i])
                this.cards.push(newCard);
                // console.log(newCard.show());
            }
        }
    }
    // The Deck should be able to deal a random card
    deal(){
        //random card from deck
        var index = Math.floor(Math.random()*this.cards.length);
        console.log(index);
        var cardDealt = this.cards[index];
        for (let i = index; i < this.cards.length-1;i++){
            this.cards[i]=this.cards[i+1];
        }
        this.cards.pop();
        return cardDealt;
    }
    // Deal should return the card that was dealt and remove it from the deck

}
// var deck1 = new Deck();
// deck1.shuffle(3);
// console.log(deck1.printDeck());
// console.log(deck1.cards.length);
// console.log(deck1.deal().show());
// console.log(deck1.cards.length);
class Player{
    constructor(name) {
        this.name = name;
        this.hand = [];
    }
    draw(deck){
        if (deck.constructor != Deck) {
            console.log("Input not a deck");
            return;
        }
        var newCard = deck.deal();
        console.log(`Player(${this.name}) drew: ${newCard.show()}`);
        this.hand.push(newCard);
        console.log(`Player(${this.name}) Hand Size:${this.hand.length}`);
        return this;
    }
    discard(index){
        if(index>=this.hand.length){
            console.log(`Player(${this.name}) doesn't have that many cards in hand.`);
            return;
        }
        var discard = this.hand[index];
        for (let i = index; i < this.hand.length - 1; i++) {
            this.hand[i] = this.hand[i + 1];
        }
        this.hand.pop();
        console.log(`Player(${this.name}) descarded: ${discard.show()}`);
        console.log(`Hand Size:${this.hand.length}`);
        return discard;
    }
}
var deck1 = new Deck();
deck1.shuffle(3);
var plyr1=new Player("Matt");
var plyr2 = new Player("Curly");
plyr1.draw(deck1).draw(deck1).draw(deck1);
plyr2.draw(deck1);
plyr1.discard(0);
plyr2.discard(0);
plyr2.discard(0);
console.log(deck1.cards.length);