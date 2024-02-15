## Author : Fredd Bezerra

# Lazy Evaluation Implementation

This is a solution to a coding test that involves implementing a `Lazy` class for lazy evaluation in JavaScript. Lazy evaluation is an evaluation strategy that delays the evaluation of an expression until its value is needed.

## Requirements

The `Lazy` class should have the following interface:

### `Lazy()` Constructor

Creates a new instance of a `Lazy` object that models a lazy computation.

### `add(fn, ...args)`

Adds a function to the chain of functions to be evaluated at a later stage.

- The `add` function can receive an arbitrary number of arguments.
- The first argument to `add` is a function.
- When the function is called, it will be called with the remaining arguments supplied to `add` (if any) followed by a single argument that will be an item from the target array supplied to `evaluate`.
- You should be able to chain together calls to `add` and `evaluate`.

### `evaluate(target)`

Returns an array containing the result of applying the chain of functions to the array `target`.

- The functions should be applied in the order they were added to the `Lazy` instance.
- Assume that `add` was called at least once (i.e., don't account for the case where the `Lazy` instance had no functions added to it).

## Implementation

The implementation of the `Lazy` class is as follows:

```javascript
class Lazy {
  constructor() {
    this.functions = [];
  }

  add(fn, ...args) {
    this.functions.push({ fn, args });
    return this;
  }

  evaluate(target) {
    return target.map((item) =>
      this.functions.reduce(
        (currentValue, { fn, args }) => fn(...args, currentValue),
        item
      )
    );
  }
}

module.exports = Lazy;
```

The `Lazy` class has a `functions` array that stores the functions and their arguments added using the `add` method. The `add` method takes a function and optional arguments, wraps them in an object, and pushes them into the `functions` array. It also returns the `Lazy` instance, allowing for method chaining.

The `evaluate` method takes a target array as input and applies the chain of functions to each item in the array. It uses the `map` method to iterate over the target array and the `reduce` method to apply each function in the `functions` array to the current item. The `reduce` method accumulates the result of each function call, passing the previous result as the last argument to the next function.

## Usage

Here's an example usage of the `Lazy` class:

```javascript
const lazy = new Lazy();
const result = lazy
  .add(function timesTwo(a) {
    return a * 2;
  })
  .add(function plus(a, b) {
    return a + b;
  }, 1)
  .evaluate([1, 2, 3]);

console.log(result); // Output: [3, 5, 7]
```

In this example, we create a new `Lazy` instance and chain two function calls using the `add` method. The first function, `timesTwo`, multiplies the input by 2. The second function, `plus`, adds 1 to the input. Finally, we call `evaluate` with an input array of `[1, 2, 3]`, which applies the chain of functions to each element in the array.

The `evaluate` method returns a new array `[3, 5, 7]`, where each element is the result of applying the chain of functions to the corresponding element in the input array.
