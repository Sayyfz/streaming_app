import { throwError } from "./error.helpers"
class Validation {
    private column: { [x: string]: string | number }
    private key: string
    private value: string | number

    constructor(column: { [x: string]: string | number }) {
        this.column = column
        this.key = Object.keys(this.column)[0]
        this.value = Object.values(this.column)[0]
    }
    required() {
        if (!this.value) {
            throwError(`${this.key} is required`, 422)
        }
        return this
    }
    isEmail(): this | undefined {
        if (!this.value) return

        const validRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if (this.value.toString().match(validRegex) === null) {
            throwError(`pleast insert valid  Email`, 422)
        }
        return this
    }
    passwordStrength(strong?: string): this | undefined {
        if (!this.value) return

        const strongRegex = strong
            ? strong
            : new RegExp("^(?=.*[a-z])(?=.*[0-9])")
        if (this.value.toString().match(strongRegex) === null) {
            throwError(`${this.key} must have numbers and characters`, 422)
        }
        return this
    }

    min(num: number): this | undefined {
        if (!this.value) return

        if (this.value.toString().length < num) {
            throwError(`${this.key} must be >= ${num}`, 422)
        }
        return this
    }

    max(num: number): this | undefined {
        if (!this.value) return

        if (this.value.toString().length > num) {
            throwError(`${this.key} must be <= ${num}`, 422)
        }
        return this
    }

    range(max: number, min: number): this | undefined {
        if (!this.value) return

        if (
            this.value.toString().length > max ||
            this.value.toString().length < min
        ) {
            throwError(`${this.key} must be between ${max} and ${min} `, 422)
        }
        return this
    }

    isInt(): this | undefined {
        if (!this.value) return

        if (/^\d+$/.test(this.value as string)) return this
        throwError(`${this.key} should be integer`, 422)
    }

    isNotEmpty(): this | undefined {
        if (!this.value) return
        if (this.value.toString().length == 0) {
            throwError(`please add valid value to ${this.key} `, 422)
        }
        return this
    }

    setColumn(col: { [x: string]: string | number }) {
        this.key = Object.keys(col)[0]
        this.value = Object.values(col)[0]
        return this
    }
}

let instance: Validation

export default (column: { [x: string]: string | number }) => {
    if (!instance) {
        instance = new Validation(column)
    }
    return instance.setColumn(column)
}
