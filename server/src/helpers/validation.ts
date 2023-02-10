import { throwError } from "./error.helpers";
class Validation {
  private column: { [x: string]: string | number };
  private key: string;
  private value: string | number;
  constructor(quary: { [x: string]: string | number }) {
    this.column = quary;
    this.key = Object.keys(this.column)[0];
    this.value = Object.values(this.column)[0];
  }

  isEmail() {
    console.log("email", this.value);

    return this;
  }
  isPassward() {
    console.log("isPassward", this.value);

    return this;
  }

  isNotEmpty(): this | undefined {
    if (this.value === undefined) return;
    if (!this.value.toString().length) {
      throwError(`${this.key} is required`, 422);
    }
    return this;
  }

  set(col: { [x: string]: string | number }) {
    this.column = col;

    return this
  }
}

let instance: Validation;

export default (options: { [x: string]: string | number }) => {
  console.log(options);
  if (!instance) {
    instance = new Validation(options);
  }
  return instance.set(options);
};
