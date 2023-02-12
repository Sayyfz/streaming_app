import sharp from "sharp";

async function resizeImage(
  filename: Buffer,
  width: number,
  height: number,
  path: string
): Promise<string> {
  const poster_image = `${Date.now()}.jpg`;
  const output = `${path}/${poster_image}`;

  await sharp(filename)
    .resize({
      width,
      height,
    })
    .toFormat("jpg")
    .toFile(output);

  return poster_image;
}
export default resizeImage;
