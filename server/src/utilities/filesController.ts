import { postersPath } from "../path"
import fs from "fs"

export const deleteImage = (filename: string): void => {
    const file = `${postersPath}/${filename}`

    console.log(file)

    if (!fs.existsSync(file)) {
        throw {
            message: ` image not found `,
            status: 404,
            error: new Error(),
        }
    }

    fs.unlink(file, (err) => {
        if (err) throw err
    })
}
