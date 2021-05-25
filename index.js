//Functions
/*
first class functions that are assigned to a variable, returned from a function and also can be passed as an argument"
e.g. const hello = () => console.log('hello world!)
*/

/**
 * A function expression is very similar to and has almost the same syntax as a function declaration (see function statement for details). 
 * The main difference between a function expression and a function declaration is the function name, 
 * which can be omitted in function expressions to create anonymous functions.
 */
// CLosures

function buildfunctions () {
    var arr = [];
    for (var i=0; i<3; i++) {
        arr.push(function () {
            console.log(i);
        });
    }
    return arr;
}

// How to fix using immediately invoked function
// by passing the result into an immediately invoked function which then pass the result in a nested function to be returned.
function buildfunctions2() {
    var arr = [];
    for (var i=0; i<3; i++) {
        arr.push((function(j){
            return function(){
                console.log(j);
            }
        })(i))
    }
    return arr;
}

// using es6 let keyword
function buildfunctions3 () {
    var arr = [];
    for (let i=0; i<3; i++) {
        arr.push(function () {
            console.log(i);
        });
    }
    return arr;
}


buildfunctions()[0]();
buildfunctions()[1]();
buildfunctions()[2]();

console.log('using immediately invoked functions>>>')

buildfunctions2()[0]();
buildfunctions2()[1]();
buildfunctions2()[2]();

console.log('using es6 let keyword')

buildfunctions3()[0]();
buildfunctions3()[1]();
buildfunctions3()[2]();


// Applying closures 
// Function Factories
function makeGreetings (language) {

    return function (firstname, lastname) {
        if(language == 'en') {
            console.log(`hello ${firstname} ${lastname}`);
        }

        if(language == 'es') {
            console.log(`hola ${firstname} ${lastname}`)
        }
    }
}


function sayHiLater() {
    //function setTimeOut used closures to access greeting
    var greeting = 'hi';
    setTimeout(() => console.log(greeting), 1000);

}

sayHiLater();

/*
function is a special type of object
they have access to the following properties for manipulating 'this' property
1. call
2. apply
3. bind
*/

let person = {
    firstname: 'adeyemi',
    lastname: 'adekorede',
    getFullName: function () {
        console.log(`${this.firstname} - ${this.lastname}`)
        console.log('----------------------------------------')
    }
}

//Hard binding 1
let logName = function(lang1, lang2) {
    this.getFullName();
}

const logPersonName = logName.bind(person);

logPersonName('en', 'lang');

// Hard binding2

let logName2 = function(lang1, lang2) {
    this.getFullName();
}
.bind(person);

logName2('en', 'lang');

// working with arrow functions
// this in myMethod refers to global lexical scope 
/*
const myObject = {
  myArrowFunction: null,
  myMethod: () => { console.log(this) }; //refers to global window for this.
  }
};
*/


// In this approach using arrow function 'this' here would refer to the object 
/**
const myObject = {
  myArrowFunction: null,
  myMethod: function () {
    this.myArrowFunction = () => { console.log(this) };
  }
};
 */


// CALL function property
/**
 Unlike bind, call lets you call a function with parameters then specify what their 'this' should be
 with call you can do the following
*/

logName.call(person, 'en', 'lang');

// APPLY function property is similar to call, but params must be pased as array
logName.apply(person, ['en', 'lang']);

//function expression can be immediately invoked using apply or call

(function() {
    this.getFullName();
}).apply(person, ['en', 'lang']);


// TO APPLY THESE CALL, APPLY AND BIND LETS DIVE INTO THE BELOW

//1. function borrowing

/**
 * I want to use person3 in place of person in person.getFullName fuction so i borrowed it.
 * since the object am borrowing from has similar property name 
 */
person3 = {
    firstname: 'hello',
    lastname: 'bae'
}

person.getFullName.apply(person3, ['en', 'lang']);

// 2. function currying

/**
 * unlike call and apply that simply pass parameters to a function if you pass parameters through bind it creates a copy of the function
 * all passed parameter becomes the fixed argument of a copy of the function e.g.
 */

function multiply (a, b) {
    return a * b;
}

const multiplyTwo = multiply.bind(this, 2); // returns a copy of multiply into multiplyTwo, then set a = 2 as fixed property in the copy 

// the above is equal to 

/** 
 * const multiplyTwo = function (b) {
 *      const a =2;
 *      return a * b
 * }
 */

console.log(multiplyTwo(5)) // this set b to 5

// if we had done below

/** 
 * const multiplyTwo = multiply.bind(this, 2, 3); // these set fix property for a and b
 * multiplyTwo(4) // four here would be treated as an extra parameter passed to the function result remains 5
 * 
 */

// So in general when we take a function, the create a copy of it with preset parameters, this process is called currying
// this is useful in mathematical computation


// FUNCTIONAL PROGRAMMING

function mapForEach(arr, fn) {
    const newArr = [];
    for(let i =0; i< arr.length; i++) {
        newArr.push(fn(arr[i])); // this run each logic you wanna run on each item then push the result into a new array..
    }
    return newArr;
}

const arr = [1,2,3];
console.log(arr, 'this is the array>>>>>');
const arr2 = mapForEach(arr, (a) => a*2);
console.log(arr2, 'this is array2>>>>>>');


// we could apply bind to allow fn accept more than one parameter

const callback = function (limiter, item) {
    return item > limiter;
}

const arr3 = mapForEach(arr, callback.bind(this, 1));

console.log(arr3, 'this is the array 3');

// we could further abstract away the callback to prevent us from calling bind always

const callbackAbstraction = function (limiter) {
    return callback.bind(this, limiter);
}
const arr4 = mapForEach(arr, callbackAbstraction(2));

console.log(arr4, 'this is the array 4>>>>>>')

// avoid mutating data in the nested functions, any changes in data should happen at the highest level possible



