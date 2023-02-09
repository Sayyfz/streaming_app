class Validation {
  value: string;
  constructor(value: string) {
    this.value = value;
  }

  isEmail() {
    console.log("email", this.value);

    return this;
  }
  isPassward() {
    console.log("isPassward", this.value);

    return this;
  }
}
let instance: Validation; // all files will receive this instance

export default (options: string) => {
  console.log(options);
  if (!instance) {
    // only the first call to require will use these options to create an instance
    instance = new Validation(options);
  }
  return instance;
};
