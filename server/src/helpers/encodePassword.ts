import bcrypt from "bcrypt"
import config from "../config"

export const encodePassword = (password: string): string => {
    const saltRound = parseInt(config.salt as string, 10)
    return bcrypt.hashSync(`${password}${config.pepperKey}`, saltRound)
}

export const comparePassword = (
    tryPassword: string,
    realPassword: string
): boolean => {
    return bcrypt.compareSync(`${tryPassword}${config.pepperKey}`, realPassword)
}
