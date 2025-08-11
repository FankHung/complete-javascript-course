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
