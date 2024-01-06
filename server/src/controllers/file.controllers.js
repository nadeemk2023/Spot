import { error } from "console";
import path from "path";
import { uuid } from "uuidv4";

export async function uploadImage(req, res, next) {
  console.log(req.files);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "No files Uploaded" });
  }

  const image = req.files.files;

  const generatedImageName = uuid() + "." + image.name.split(".").at(-1);

  const uploadPath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "images",
    generatedImageName
  );

  image.mv(uploadPath, (error) => {
    if (error) {
      return res.sendStatus(500);
    }
    res.json({ path: `/images/${generatedImageName}` });
  });
}
