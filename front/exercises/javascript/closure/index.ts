// CHALLENGE 1
function createFunction() {
  return function () {
    console.log("hello")
  }
}

// /*** Uncomment these to check your work! ***/
// const function1 = createFunction();
// function1(); // => should console.log('hello');

// CHALLENGE 2
function createFunctionPrinter(input: string) {
  return function () {
    console.log(input)
  }
}

// /*** Uncomment these to check your work! ***/
// const printSample = createFunctionPrinter('sample');
// printSample(); // => should console.log('sample');
// const printHello = createFunctionPrinter('hello');
// printHello(); // => should console.log('hello');

// CHALLENGE 3
function outer() {
  let counter = 0; // this variable is outside incrementCounter's scope
  function incrementCounter() {
    counter++;
    console.log("counter", counter);
  }
  return incrementCounter;
}

const willCounter = outer();
const jasCounter = outer();

// Uncomment each of these lines one by one.
// Before your do, guess what will be logged from each function call.

// /*** Uncomment these to check your work! ***/
// willCounter();
// willCounter();
// willCounter();

// jasCounter();
// willCounter();

function addByX(x: number) {
  return function (input: number) {
    input += x
    return input
  }
}

// /*** Uncomment these to check your work! ***/
const addByTwo = addByX(2);
// addByTwo(1); // => should return 3
// addByTwo(2); // => should return 4
// addByTwo(3); // => should return 5

const addByThree = addByX(3);
// addByThree(1); // => should return 4
// addByThree(2); // => should return 5

const addByFour = addByX(4);
// addByFour(4); // => should return 8
// addByFour(5); // => should return 9

// CHALLENGE 4
function once(func: (...any: any[]) => any) {
  let moreThanOneTime = false
  let value: any;
  return function (num: number) {
    if (!moreThanOneTime) {
      value = func(num)
      moreThanOneTime = true
      return value
    }
    else {
      return value
    }
  }
}

// /*** Uncomment these to check your work! ***/
const onceFunc = once(addByTwo);
// console.log(onceFunc(4));  // => should log 6
// console.log(onceFunc(10));  // => should log 6
// console.log(onceFunc(9001));  // => should log 6

// CHALLENGE 5
function after(count: number, func: (...any: any[]) => any) {
  let counterBefore = 1
  return function () {
    if (counterBefore >= count) {
      func();
      count--;
    }
    else {
      counterBefore++;
    }
  }
}

// /*** Uncomment these to check your work! ***/
const called = function () { console.log('hello') };
const afterCalled = after(3, called);
// afterCalled(); // => nothing is printed
// afterCalled(); // => nothing is printed
// afterCalled(); // => 'hello' is printed

// CHALLENGE 6
function delay(func: (...any: any[]) => void, wait: number, ...any: any[]) {
  setTimeout(() => {
    func(any)
  }, wait);
}

// CHALLENGE 7
function rollCall(names: string[]) {
  let index = 0
  return function () {
    if (index === names.length) {
      console.log('Everyone accounted for');
    }
    else {
      console.log(names[index]);
      index++;
    }
  }
}

// /*** Uncomment these to check your work! ***/
// const rollCaller = rollCall(['Victoria', 'Juan', 'Ruth'])
// rollCaller() // => should log 'Victoria'
// rollCaller() // => should log 'Juan'
// rollCaller() // => should log 'Ruth'
// rollCaller() // => should log 'Everyone accounted for'

// CHALLENGE 8
function saveOutput(func: (...any: any[]) => any, magicWord: string) {
  const obj: any = {}
  return function (input: any) {
    if (input === magicWord) {
      return obj
    }
    else {
      obj[input] = func(input)
      return obj[input]
    }
  }
}

// /*** Uncomment these to check your work! ***/
const multiplyBy2 = function (num: number) { return num * 2; };
const multBy2AndLog = saveOutput(multiplyBy2, 'boo');
// console.log(multBy2AndLog(2)); // => should log 4
// console.log(multBy2AndLog(9)); // => should log 18
// console.log(multBy2AndLog('boo')); // => should log { 2: 4, 9: 18 }

// CHALLENGE 9
function cycleIterator(array: string[]) {
  let index = 0;
  return function () {
    let value = array[index];
    index = (index + 1) % array.length
    return value;
  }
}

// /*** Uncomment these to check your work! ***/
const threeDayWeekend = ['Fri', 'Sat', 'Sun'];
const getDay = cycleIterator(threeDayWeekend);
// console.log(getDay()); // => should log 'Fri'
// console.log(getDay()); // => should log 'Sat'
// console.log(getDay()); // => should log 'Sun'
// console.log(getDay()); // => should log 'Fri'

// CHALLENGE 10
function defineFirstArg<T>(func: (...any: any[]) => any, arg: T) {
  return function (...args: any[]) {
    return func(arg, ...args)
  }
}

// /*** Uncomment these to check your work! ***/
// const subtract = function(big: number, small: number) { return big - small; };
// const subFrom20 = defineFirstArg(subtract, 20);
// console.log(subFrom20(5)); // => should log 15

// CHALLENGE 11
function dateStamp(func: (...any: any[]) => any) {
  const obj = {}
  return function (...args: any[]) {
    return {
      date: new Date(),
      output: func(args)
    }
  }
}

// /*** Uncomment these to check your work! ***/
// const stampedMultBy2 = dateStamp(n => n * 2);
// console.log(stampedMultBy2(4)); // => should log { date: (today's date), output: 8 }
// console.log(stampedMultBy2(6)); // => should log { date: (today's date), output: 12 }

// CHALLENGE 12
function censor() {
  const pairs: [string, string][] = [];
  return function (str1: string, str2?: string) {
    if (str2 !== undefined) {
      pairs.push([str1, str2]);
    }
    else {
      let result = str1
      for (let [target, replacement] of pairs) {
        result = result.replace(target, replacement)
      }
      return result
    }
  }
}

// /*** Uncomment these to check your work! ***/
// const changeScene = censor();
// changeScene('dogs', 'cats');
// changeScene('quick', 'slow');
// console.log(changeScene('The quick, brown fox jumps over the lazy dogs.')); // => should log 'The slow, brown fox jumps over the lazy cats.'

// CHALLENGE 13
function createSecretHolder(secret: number) {
  return {
    getSecret() {
      return secret
    },
    setSecret(input: number) {
      secret = input
    }
  }
}

// /*** Uncomment these to check your work! ***/
// let obj = createSecretHolder(5)
// console.log(obj.getSecret()) // => returns 5
// obj.setSecret(2)
// console.log(obj.getSecret()) // => returns 2

// CHALLENGE 14
function callTimes() {
  let counter = 1
  return function () {
    console.log(counter);
    counter++;
  }
}

// /*** Uncomment these to check your work! ***/
// let myNewFunc1 = callTimes();
// let myNewFunc2 = callTimes();
// myNewFunc1(); // => 1
// myNewFunc1(); // => 2
// myNewFunc2(); // => 1
// myNewFunc2(); // => 2

// CHALLENGE 15
function roulette(num: number) {
  let counter = 1;
  return function () {
    if (counter < num) {
      counter++
      return "spin"
    }
    else if (counter === num) {
      counter++;
      return "win"
    }
    else {
      return "pick a number to play again"
    }
  }
}

// /*** Uncomment these to check your work! ***/
const play = roulette(3);
// console.log(play()); // => should log 'spin'
// console.log(play()); // => should log 'spin'
// console.log(play()); // => should log 'win'
// console.log(play()); // => should log 'pick a number to play again'
// console.log(play()); // => should log 'pick a number to play again'

// CHALLENGE 16
function average() {
  let sum = 0
  let count = 0
  return function (num?: number) {
    if (num === undefined) {
      return count === 0 ? 0 : sum / count
    }
    else {
      sum += num;
      count++;
      return sum / count
    }
  }
}

// /*** Uncomment these to check your work! ***/
// const avgSoFar = average();
// console.log(avgSoFar()); // => should log 0
// console.log(avgSoFar(4)); // => should log 4
// console.log(avgSoFar(8)); // => should log 6
// console.log(avgSoFar()); // => should log 6
// console.log(avgSoFar(12)); // => should log 8
// console.log(avgSoFar()); // => should log 8

// CHALLENGE 17
function makeFuncTester(arrOfTests: string[][]) {
  return function (func: (...args: any[]) => any) {
    for (let element of arrOfTests) {
      if (func(element[0]) !== element[1]) {
        return false
      }
    }
    return true
  }
}

// /*** Uncomment these to check your work! ***/
// const capLastTestCases = [];
// capLastTestCases.push(['hello', 'hellO']);
// capLastTestCases.push(['goodbye', 'goodbyE']);
// capLastTestCases.push(['howdy', 'howdY']);
// const shouldCapitalizeLast = makeFuncTester(capLastTestCases);
// const capLastAttempt1 = (str:string) => str.toUpperCase();
// const capLastAttempt2 = (str:string) => str.slice(0, -1) + str.slice(-1).toUpperCase();
// console.log(shouldCapitalizeLast(capLastAttempt1)); // => should log false
// console.log(shouldCapitalizeLast(capLastAttempt2)); // => should log true

// CHALLENGE 18
function makeHistory(limit: number) {
  let arr: string[] = []
  return function (str: string) {
    if (str === "undo") {
      if (arr.length === 0) {
        return 'nothing to do'
      }
      else {
        let popped = arr.pop()
        return popped + ' undone'
      }
    } else {
      arr.push(str)
      while (arr.length > limit) {
        arr.shift()
      }
      return str + ' done'
    }
  }
}

// /*** Uncomment these to check your work! ***/
// const myActions = makeHistory(2);
// console.log(myActions('jump')); // => should log 'jump done'
// console.log(myActions('undo')); // => should log 'jump undone'
// console.log(myActions('walk')); // => should log 'walk done'
// console.log(myActions('code')); // => should log 'code done'
// console.log(myActions('pose')); // => should log 'pose done'
// console.log(myActions('undo')); // => should log 'pose undone'
// console.log(myActions('undo')); // => should log 'code undone'
// console.log(myActions('undo')); // => should log 'nothing to undo'

