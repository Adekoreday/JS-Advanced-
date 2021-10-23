//Functions
/*

A programming language is said to have First-class functions when functions in that language are treated like any other variable.
For example, in such a language, a function can be passed as an argument to other functions, can be returned by another function and can be assigned as a value to a variable.
Mozilla docs
e.g. const hello = () => console.log('hello world!)
*/

/**
 * A function expression is very similar to and has almost the same syntax as a function declaration (see function statement for details). 
 * The main difference between a function expression and a function declaration is the function name, 
 * which can be omitted in function expressions to create anonymous functions.
 *
 *  A function expression has to be stored in a variable and can be accessed using variableName
 * 
 * >> function declaration
 * function functionName(x, y) { statements... return (z) };
 * 
 * >> function expression (anonymous)
 * let variableName = function(x, y) { statements... return (z) };
 * 
 * >> function expression (named)
 * let variableName = function functionName(x, y) { statements... return (z) };
 * /

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


/// OBJECTS

/**
 * Inheritance in js means one object gets access to another object properties and methods.
 * 
 * There are two kinds of object inheritance
 * 
 * 1. Classical Inheritance
 * 2. Prototype Inheritance
 * 
*/

/// Function Constructors

/**   
 * A function constructor is a normal function that is used to construct objects
 * the 'this' variable points to an empty object, and that function is returned from the object automatically
 */

function Person() {
    this.firstname = 'ade';
    this.lastname = 'yemi'
}

// new keyword here enables us to build function constructors

var john = new Person();
console.log(john, 'this is john>>>>'); // this john is equal to {firstname: 'ade', lastname: 'yemi'}

// this new keyword makes the this property of person into an empty object {}
// the addition we do to that new object i.e. this.firstname and this.lastname gets returned into john provided we didnt return a value explicitly i.e.

function Person2() {
    this.firstname = 'ade';
    this.lastname = 'yemi';
    return {}
}

var jane = new Person2(); 
console.log(jane, 'this is jane>>>>>>'); // this jane is equal to {}


//Every Function has a prototype value e.g. jane.__proto__ or Person2.prototype
// the prototype value of a function is the value of its prototype when using the function as a function constructor
// so the following below would work
var jude = new Person();
Person.prototype.getFullName = function() {
    return this.firstname + ' ' + this.lastname; 
}

// so we can do 

console.log(jude.getFullName());

// its better to place more methods on the prototype cause all instance of the object would share one single prototype

// Example of inbuilt function constructors in js
// the num.toFixed lives on the function constructor Number.prototype
var num = new Number('3');
console.log(num.toFixed(2));


//  here we create a primitive 
// the javascript engine wrap this primitive into a function constructor of type Number i.e. 

// var num2 = new Number(3);
var num2 = 3
console.log(num2.toFixed(2));

// A more popular function constructor is 

var date = new Date('3/1/2015');


// with function constructor we can add more functionalitites to inbuilt primitives in javascript by updating the prototype inheritance

String.prototype.isLengthGreaterThan = function (limit) {
    return this.length > limit
}
// all strings moving forward would have access to this, since they all share the same prototype
console.log("hello".isLengthGreaterThan(10), 'this is the hello world>>>>');

// you need to be careful here not to override an existing functionality and mostly this works for most

//avoid using (for in ) while using arrays in js so you wont loop into prototype values defined by another library or package
//e.g

Array.prototype.getlength = function() {
    return this.length;
}
var arrNew = [1,2,3]

let lengthOfEverything = 0;
for(i in arrNew) {
        lengthOfEverything ++;
}

console.log(lengthOfEverything, 'length of everything>>>>') 
// here we get 4 cause of the extra inbuilt property we added kindly use standard for loops for arrays
// our lengthOfEverything should be 3 

// A polyfill adds a feature which the engine may lack

var b = 'Hello';
console.log(typeof b);

var d = [];
console.log(typeof d); // returns an empty string wierd!
console.log(Object.prototype.toString.call(d)) //returns [object Array]

var z = function () {}
console.log(typeof z) // prints a function

// using use strict in javascript 

/**
 * using use strict in js
 * you could add use strict to the top of the file or the top of the function
 * 
*/

function UseStrictInFunction() {
    "use strict"
    person2 = [];
    console.log(person2);
}

