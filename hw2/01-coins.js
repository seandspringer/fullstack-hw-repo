/** Exercise 01 - Coins **/

// Add your function here
const CENTS = [
  {
    value: 100,
    singular: 'dollar',
    plural: 'dollars',
  },
  {
    value: 25,
    singular: 'quarter',
    plural: 'quarters',
  },
  {
    value: 10,
    singular: 'dime',
    plural: 'dimes',
  },
  {
    value: 5,
    singular: 'nickel',
    plural: 'nickels',
  },
  {
    value: 1,
    singular: 'penny',
    plural: 'pennies',
  },
];

const calculateChange = (number) => {
  let prefix = `$${number} ==>`;
  let current = Math.round(number * 100); //convert to cents

  if (current >= 10000) return `${prefix} Error: the number is too large`;
  else if (current === 0) return `${prefix} No Change!`;

  const change = [];

  //destructoring using object names (5.1)
  for (const { value, singular, plural } of CENTS) {
    const count = Math.floor(current / value);
    current %= value; // remaining change after accounting for value
    if (count > 0) {
      count === 1
        ? change.push(`${count} ${singular}`)
        : change.push(`${count} ${plural}`);
    }
  }

  return `${prefix} ${change.join(', ')}`;
};

// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Add additional test cases here
console.log(calculateChange(0.01));
console.log(calculateChange(0.0));
console.log(calculateChange(100));
console.log(calculateChange(99.99));
