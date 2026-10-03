/** Exercise 02 - Two Sum

Problem:

You are given an array of integers 'nums' and an integer 'target', write a function that returns indices of the two 
numbers such that they add up to target.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

**/

const twoSums = function returnIndicesOfNumsThatSumsToTarget(nums, target) {
  const outputArray = [];
  const inputArray = Array.from(nums); //just to ensure nums is an array
  const count = nums.length;

  for (let i = 0; i < count; ++i) {
    for (let j = i + 1; j < count; ++j) {
      const sum = inputArray[i] + inputArray[j];
      if (sum === target) {
        outputArray.push(i, j);
      }
    }
  }

  return outputArray;
};

console.log(twoSums([2, 7, 11, 15], 9));
console.log(twoSums([3, 2, 4], 6));
console.log(twoSums([3, 3], 6));
