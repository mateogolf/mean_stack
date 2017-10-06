var _ = {
    map: function (list,iteratee) {
        //code here;
        if(list.constructor == Array){
            var result = [];
            for (let i = 0; i < list.length; i++) {
                result[i] = iteratee(list[i]);
            }
            return result;
        } else if (list.constructor == Object){
            var result = {};
            for(let key in list){
                result[key] = iteratee(list[key],key);
            }
            return result;
        }else{console.log("Not an array or object");}
        return list;
    },
    reduce: function (list,iteratee,memo=0) {
        // code here;
        // if(!memo){memo=0;}
        if(list.constructor != Array){
            console.log("not an array");
            return;
        }
        var result = 0;
        for (let i = 0; i < list.length; i++) {
            // if(typeof list[i] != 'number'){
            //     console.log("element in array NOT a number")
            // }
            memo ? result = iteratee(memo, list[i]) : result =iteratee(result,list[i]);
        }
        return result;
    },
    find: function (list,predicate) {
        // code here;
        if (list.constructor != Array) {
            console.log("not an array");
            return;
        }
        for (let i = 0; i < list.length; i++) {
            if (predicate(list[i])) {
                return list[i];
            }
        }
        return undefined;
    },
    filter: function (list,predicate) {
        // code here;
        if (list.constructor != Array) {
            console.log("not an array");
            return;
        }
        var result = [];
        for(let i=0;i<list.length;i++){
            if (predicate(list[i])){
                result.push(list[i]);
            }
        }
        return result;
    },
    reject: function (list, predicate) {
        // code here;
        if (list.constructor != Array) {
            console.log("not an array");
            return;
        }
        var result = [];
        for (let i = 0; i < list.length; i++) {
            if (!predicate(list[i])) {
                result.push(list[i]);
            }
        }
        return result;
    }
}
// you just created a library with 5 methods!
var arr1 = [1, 2, 3, 4, 5, 6];
var evens = _.filter(arr1, function (num) { return num % 2 == 0; });
var mult2 = _.map(arr1, function (num) { return num *2; });
var map2 = _.map({ one: 1, two: 2, three: 3 }, function (num, key) { return num * 3; });
var sum = _.reduce([1, 2, 3], function (memo, num) { return memo + num; });
var find_even = _.find([1, 2, 3, 4, 5, 6], function (num) { return num % 2 == 0; });
var odds = _.reject(arr1, function (num) { return num % 2 == 0; });
// console.log(evens); // if things are working right, this will return [2,4,6].
// console.log(mult2);
// console.log(map2);
console.log(sum);
// console.log(find_even);
// console.log(odds);