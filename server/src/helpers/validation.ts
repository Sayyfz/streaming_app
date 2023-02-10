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
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const result = re.test(this.value as string)
    if(!result) {
      throwError('Invalid email', 422)
    }
    return this;
  }
  isPassword() {
    const re = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))/
    const result = re.test(this.value as string);
    if(!result) {
      throwError('Password must at least contain 6 characters and a combination of lowercase and uppercase letters and numbers', 422)
    }
    return this;
  }

  isNotEmpty(): this | undefined {
    if (this.value === undefined) return;
    if (!(this.value as string).length) {
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


// const getInstance = () => {
//   let instance: Validation;
//   return (validationTarget: { [x: string]: string | number }) => {
//     if (!instance) {
//       instance = new Validation(validationTarget);
//     }
//     return instance;
//   };
// };

// export default getInstance()

