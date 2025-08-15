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

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.accelerate = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate(); // BMW is going at 130 km/h
bmw.accelerate(); // BMW is going at 140 km/h
mercedes.accelerate(); // Mercedes is going at 105 km/h
mercedes.accelerate(); // Mercedes is going at 115 km/h
bmw.brake(); // BMW is going at 135 km/h
mercedes.brake(); // Mercedes is going at 110 km/h

///////////////////////////////////////
// ES6 Classes

// class expression
// const PersonCl = class {};

// class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Methods will be added to .prototype property
  // 在 class 這個 JS 特殊類型裡面創建的方法, 就直接是類別方法, 也就是 JS 的原型方法
  // 若要在外部添加類別方法, 就必須對類別的原型屬性添加原型方法
  calcAge() {
    console.log(2025 - this.birthYear);
  }
}

const jessica = new PersonCl('Jessica', 1996);
console.log(jessica);
jessica.calcAge(); // 29
console.log(jessica.__proto__ === PersonCl.prototype); // true

PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};
jessica.greet(); // Hey Jessica

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode
