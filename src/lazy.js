export class Lazy {
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
