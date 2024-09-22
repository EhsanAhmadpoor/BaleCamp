/****************************************************************
                  WORKING WITH OBJECT LITERALS
****************************************************************/

/*** CHALLENGE 1 ***/

function makePerson(name: string, age: number) {
  // add code here
  const myObj = Object.create(null);
  myObj.name = name;
  myObj.age = age;
  return myObj;
}

const vicky = makePerson("Vicky", 24);

// /********* Uncomment these lines to test your work! *********/
// console.log(vicky.name); // -> Logs 'Vicky'
// console.log(vicky.age); // -> Logs 24

/****************************************************************
                       USING OBJECT.CREATE
****************************************************************/

/*** CHALLENGE 2 ***/

const personStore = {
  // add code here
  greet: function () {
    console.log("hello")
  }
};

// /********* Uncomment this line to test your work! *********/
// personStore.greet(); // -> Logs 'hello'

/*** CHALLENGE 3 ***/

function personFromPersonStore(name: string, age: number) {
  // add code here
  const person = Object.create(personStore);
  person.name = name;
  person.age = age;
  return person;
}

const sandra = personFromPersonStore("Sandra", 26);

// /********* Uncomment these lines to test your work! *********/
// console.log(sandra.name); // -> Logs 'Sandra'
// console.log(sandra.age); //-> Logs 26
// sandra.greet(); //-> Logs 'hello'

/*** CHALLENGE 4 ***/

// add code here
(personStore as any).introduce = function () {
  console.log(`Hi, my name is ${this.name}`)
}
// sandra.introduce(); // -> Logs 'Hi, my name is Sandra'

/****************************************************************
                    USING THE 'NEW' KEYWORD
****************************************************************/

/*** CHALLENGE 5 ***/
function PersonConstructor(this: any) {
  // add code here
  this.greet = function () {
    console.log("hello")
  }
}

// /********* Uncomment this line to test your work! *********/
const simon = new (PersonConstructor as any)();
// simon.greet(); // -> Logs 'hello'

// /*** CHALLENGE 6 ***/

function personFromConstructor(name: string, age: number) {
  // add code here
  const person = new (PersonConstructor as any)();
  person.name = name;
  person.age = age;
  return person;
}

const mike = personFromConstructor("Mike", 30);

// // /********* Uncomment these lines to test your work! *********/
// console.log(mike.name); // -> Logs 'Mike'
// console.log(mike.age); //-> Logs 30
// mike.greet(); //-> Logs 'hello'

// /*** CHALLENGE 7 ***/
// // add code here
PersonConstructor.prototype.introduce = function () {
  console.log(`Hi, my name is ${this.name}`)
}

// mike.introduce(); // -> Logs 'Hi, my name is Mike'

// /****************************************************************
//                         USING ES6 CLASSES
// ****************************************************************/

// /*** CHALLENGE 8 ***/

class PersonClass {
  name: string | undefined;

  constructor(name?: string) {
    // add code here
    this.name = name;
  }

  // add code here
  greet() {
    console.log('hello');
  }
}

// // /********* Uncomment this line to test your work! *********/
// const george = new PersonClass();
// george.greet(); // -> Logs 'hello'

// /*** CHALLENGE 9 ***/

// // add code here

class DeveloperClass extends PersonClass {
  age: number;
  constructor(name: string, age: number) {
    super(name);
    this.age = age
  }
  introduce() {
    console.log(`Hello World, my name is ${this.name}`)
  }
}

// // /********* Uncomment these lines to test your work! *********/
// const thai = new DeveloperClass('Thai', 32);
// console.log(thai.name); // -> Logs 'Thai'
// thai.introduce(); //-> Logs 'Hello World, my name is Thai'

// /****************************************************************
//                       EXTENSION: SUBCLASSING
// ****************************************************************/

const userFunctionStore: any = {
  sayType: function () {
    console.log("I am a " + this.type);
  },
};

function userFactory(name: string, score: number) {
  let user = Object.create(userFunctionStore);
  user.type = "User";
  user.name = name;
  user.score = score;
  return user;
}

// /*** CHALLENGE 10 ***/

const adminFunctionStore = {
  // add code here
};
Object.setPrototypeOf(adminFunctionStore, userFunctionStore);

// /*** CHALLENGE 11, 12, 13 ***/

function adminFactory(name: string, score: number) {
  // add code here
  const admin = Object.create(adminFunctionStore);
  admin.name = name;
  admin.score = score;
  admin.type = 'Admin';
  return admin
}

// /*** CHALLENGE 14 ***/
// /* Put code here for a method called sharePublicMessage*/
(adminFunctionStore as any).sharePublicMessage = function () {
  console.log(`Welcome Users!`)
}
const adminFromFactory = adminFactory("Eva", 5);

// // /********* Uncomment these lines to test your work! *********/
adminFromFactory.sayType() // -> Logs "I am a Admin"
adminFromFactory.sharePublicMessage() // -> Logs "Welcome users!"
