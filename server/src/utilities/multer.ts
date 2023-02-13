import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|)$/)) {
      return cb(new Error("upload png"));
    }
    cb(null, true);
  },
});

export default upload;
