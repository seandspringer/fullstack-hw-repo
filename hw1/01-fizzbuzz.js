/** Exercise 01 - Fizzbuzz

Problem: 

Given an integer n, return a string array answer (1-indexed) where:

answer[i] === "FizzBuzz" if i is divisible by 3 and 5.
answer[i] === "Fizz" if i is divisible by 3.
answer[i] === "Buzz" if i is divisible by 5.
answer[i] === i (as a string) if none of the above conditions are true.

Example 1:

Input: n = 3
Output: ["1","2","Fizz"]

Example 2:

Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]

Example 3:

Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]

**/

const fizzbuzz = function fizzBuzzdiv3and5_fizzdiv3_buzzdiv5_elsestr(n) {
  const temp = [];
  for (let i = 1; i <= n; ++i) {
    temp.push(i);
  }

  return temp.map((number) => {
    if (number % 3 === 0 && number % 5 === 0) {
      return 'FizzBuzz';
    } else if (number % 3 === 0) {
      return 'Fizz';
    } else if (number % 5 === 0) {
      return 'Buzz';
    } else {
      return String(number);
    }
  });
};

console.log('FizzBuzz for 3:', fizzbuzz(3));
console.log('FizzBuzz for 5:', fizzbuzz(5));
console.log('FizzBuzz for 15:', fizzbuzz(15));
