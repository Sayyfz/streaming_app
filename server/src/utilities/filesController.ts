import { postersPath } from "../path"
import fs from "fs"

export const deleteImage = (filePath: string): void => {
    console.log(filePath)

    if (!fs.existsSync(filePath)) {
        throw {
            message: ` image not found `,
            status: 404,
            error: new Error(),
        }
    }

    fs.unlink(filePath, (err) => {
        if (err) throw err
    })
}
