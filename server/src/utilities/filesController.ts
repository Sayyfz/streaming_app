import fs from "fs"

export const deleteImage = (filePath: string): void => {
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
