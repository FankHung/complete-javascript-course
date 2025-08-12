'use strict';

//////////////////////////////////////////////
// Constructor Functions and the new Operator
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // 永遠不應該在構造函式內建立方法
  // 這是因為我們有可能會使用一個構造函式來建立很多物件實例,
  // 假設建立了1000個, 那麼也就代表構造函式內的方法被建了1000個副本, 而這個影響對代碼的效能很糟糕.
  //   this.calcAge = function () {
  //     console.log(2025 - this.birthYear);
  //   };
};

const fank = new Person('Fank', 1989);
const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1978);

console.log(fank);
console.log(fank instanceof Person); // true

//////////////////////////////////////////////
// Prototypes
console.log(Person.prototype); // {constructor: ƒ}

Person.prototype.calcAge = function () {
  console.log(2025 - this.birthYear);
};

fank.calcAge(); // 36
matilda.calcAge(); // 8

console.log(fank.__proto__); // {constructor: ƒ, calcAge: ƒ}
console.log(fank.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(fank)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

Person.prototype.species = 'Homo Sapiens';
console.log(fank.species, matilda.species);

console.log(fank.hasOwnProperty('firstName')); // true
console.log(fank.hasOwnProperty('species')); // false

//////////////////////////////////////////////
// Prototypal Inheritance on Built-In Objects
console.log(fank.__proto__); // Prototype of Person
console.log(fank.__proto__.__proto__); // Prototype of Object
console.log(fank.__proto__.__proto__.__proto__); // null

// JS類的原型中的 constructor 屬性會返回此類的構造函式
console.dir(Person.prototype.constructor);

const arr = [3, 6, 4, 5, 6, 9, 3]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__); // Prototype of Object

// 可以對 JS 內建的 Array 類新增原型方法或屬性, 並且所有的 Array 物件也都會繼承
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());
const h1 = document.querySelector('h1');
console.dir(h1);
console.dir(x => x + 1);
