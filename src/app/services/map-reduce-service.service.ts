import { Injectable } from '@angular/core';

// Functions Declarations

// 1. Using a similar construction, write a sumSquares function that sums
// the square of numbers between the lower bound a and an upper bound
// b. This should implement the mathematical function
function sumSquares(a: number, b: number): number {
  return a > b ? 0 : a * a + sumSquares(a + 1, b);
}

// 2. Your function should sum the cubes of numbers between the lower bound a and the upper bound b
function sumCubes(a: number, b: number): number {
  return a > b ? 0 : a * a * a + sumCubes(a + 1, b);
}

// 3. Your function should sum the factorials of numbers between the lower bound a and the upper bound b.
function sumFactorial(a: number, b: number): number {
  if (a > b) {
    return 0;
  } else {
    let res = 1;
    for (let i = 1; i <= a; i++) {
      res *= i;
    }
    return res + sumFactorial(a + 1, b);
  }
}

// 4. The sumMap function takes two parameter groups.
// The first parameter group accepts the mapping function, while the second parameter group defines the bounds
const sumMap: (
  mapFn: (value: number) => number
) => (a: number, b: number) => number =
  (
    mapFn // This is the first part of the function, taking mapFn
  ) =>
  (a, b) => {
    // This is the second part, the function that gets returned

    if (a > b) {
      return 0;
    }

    let sum = 0;
    for (let i = a; i <= b; i++) {
      sum += mapFn(i); // Apply the mapping function to each number
    }
    return sum;
  };

// 5. Refactor the sumInt, sumSquares, sumCubes, sumFactorial as constant using the sumMap function
const sumInt2 = sumMap((x) => x + x);
const sumSquares2 = sumMap((x) => x * x);
const sumCubes2 = sumMap((x) => x * x * x);
const sumFactorial2 = sumMap((x) => {
  let res = 1;
  for (let i = 1; i <= x; i++) {
    res *= i;
  }
  return res;
});

// 6. Write a prodInts function in the style of sumInts. Your function should
// compute the product of numbers between the lower bound a and the
// upper bound b, implementing the mathematical expression
function prodInts(a: number, b: number): number {
  return a > b ? 1 : a * prodInts(a + 1, b);
}

// 7. Write a prodSquares function that multiplies together the squares of
// numbers from the lower bound a to the upper bound b
function prodSquares(a: number, b: number): number {
  return a > b ? 1 : a * a * prodSquares(a + 1, b);
}

// 8. Write a prodCubes function that multiplies together the cubes of numbers from the lower bound a to the upper bound b
function prodCubes(a: number, b: number): number {
  return a > b ? 1 : a * a * a * prodCubes(a + 1, b);
}

// 9. Write a prodFactorial function that multiplies together the factorials
// of numbers from the lower bound a to the upper bound b.
function prodFactorial(a: number, b: number): number {
  if (a > b) {
    return 1;
  } else {
    let res = 1;
    for (let i = 1; i <= a; i++) {
      res *= i;
    }
    return res * prodFactorial(a + 1, b);
  }
}

// 10. Design a prodMap function
// that allows for mapping any function onto numbers in the range before
// multiplying the results between the bounds a and b
const prodMap: (
  mapFn: (value: number) => number
) => (a: number, b: number) => number =
  (
    mapFn // This is the first part of the function, taking mapFn
  ) =>
  (a, b) => {
    // This is the second part, the function that gets returned
    if (a > b) {
      return 1;
    }
    let prod = 1;
    for (let i = a; i <= b; i++) {
      prod *= mapFn(i); // Apply the mapping function to each number
    }
    return prod;
  };

// 11. Refactor prodInt, prodSquares, prodCubes, prodFactorial as constant using the prodMap function
const prodInt2 = prodMap((x) => x);
const prodSquares2 = prodMap((x) => x * x);
const prodCubes2 = prodMap((x) => x * x * x);
const prodFactorial2 = prodMap((x) => {
  let res = 1;
  for (let i = 1; i <= x; i++) {
    res *= i;
  }
  return res;
});

// 12. By now, you should recognize a pattern between the sumMap and prodMap
// functions. This observation should guide you in creating a mapReduce
// function that encompasses the functionalities of both. The mapReduce
// function should use the following signature:
const mapReduce: (
  mapFn: (value: number) => number,
  reduceFn: (first: number, second: number) => number,
  zero: number
) => (a: number, b: number) => number =
  (
    mapFn,
    reduceFn,
    zero // This part takes the mapFn, reduceFn, and zero value
  ) =>
  (a, b) => {
    // This part is the function that gets returned, taking the bounds
    if (a > b) {
      return zero; // If the range is empty, return the 'zero' (identity) value
    }
    let accumulator = zero; // Initialize the accumulator with the 'zero' value
    for (let i = a; i <= b; i++) {
      // Apply the reduction function
      accumulator = reduceFn(accumulator, mapFn(i)); // Apply the mapping function to the current number
    }

    return accumulator;
  };

// 13. Refactor the mapReduce function to create mapReduce2, which should
// accept three parameter groups. This adjustment prepares us to later
// refactor both sumMap and prodMap functions as constants using mapReduce2
const mapReduce2: (
  reduceFn: (first: number, second: number) => number,
  zero: number
) => (mapFn: (value: number) => number) => (a: number, b: number) => number =
  (reduceFn, zero) => (mapFn) => (a, b) => {
    if (a > b) {
      return zero;
    }
    let accumulator = zero;
    for (let i = a; i <= b; i++) {
      accumulator = reduceFn(accumulator, mapFn(i));
    }

    return accumulator;
  };

// 14. Rewrite the sumMap and prodMap as functions of the mapReduce2
const sumMap2 = mapReduce2((acc: number, value: number) => acc + value, 0);
const prodMap2 = mapReduce2((acc: number, value: number) => acc * value, 1);

// 15. In order to test new sumMap2 and prodMap2
const prodSquares3 = prodMap2((x) => x * x);
const prodCubes3 = prodMap2((x) => x * x * x);
const sumSquares3 = sumMap2((x) => x * x);
const sumCubes3 = sumMap2((x) => x * x * x);

@Injectable({
  providedIn: 'root',
})
export class MapReduceServiceService {
  constructor() {}

  logTestFunction(): void {
    console.log('sumSquares(1,5): ', sumSquares(1, 5));
    console.log('sumCubes(1,5): ', sumCubes(1, 5));
    console.log('sumFactorial(1,5): ', sumFactorial(1, 5));

    console.log('sumInt2(1,5):', sumInt2(1, 5));
    console.log('sumSquares2(1,5):', sumSquares2(1, 5)); // 55
    console.log('sumCubes2(1,5):', sumCubes2(1, 5)); // 225
    console.log('sumFactorial2(1,5):', sumFactorial2(1, 5)); // 153

    console.log('prodSquares(1, 5): ', prodSquares(1, 5)); // 14400
    console.log('prodCubes(1, 5): ', prodCubes(1, 5)); // 1,728,000
    console.log('prodFactorial(1, 5): ', prodFactorial(1, 5)); // 34,560

    console.log('prodSquares2(1, 5): ', prodSquares2(1, 5)); // 14400
    console.log('prodCubes2(1, 5): ', prodCubes2(1, 5)); // 1,728,000
    console.log('prodFactorial2(1, 5): ', prodFactorial2(1, 5)); // 34,560

    console.log('prodSquares3(1, 5): ', prodSquares3(1, 5)); // 14400
    console.log('prodCubes3(1, 5): ', prodCubes3(1, 5)); // 1,728,000

    console.log('sumSquares3(1, 5): ', sumSquares3(1, 5)); // 55
    console.log('sumCubes3(1, 5): ', sumCubes3(1, 5)); // 225
  }
}
