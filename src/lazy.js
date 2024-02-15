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

// evaluate(target) {
//     const result = [];

//     for (let i = 0; i < target.length; i++) {
//       let currentItem = target[i];
//       for (let j = 0; j < this.functions.length; j++) {
//         const { fn, args } = this.functions[j];
//         currentItem = fn(...args, currentItem);
//       }
//       result.push(currentItem);
//     }

//     return result;
//   }
