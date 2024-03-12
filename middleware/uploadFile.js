import multer from "multer";
import path from "path";
import fs from "fs";

let limit = { filesize: 1024 * 1024 * 2 };
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let staticFolder = req.query.staticFolder || "./public";

    if (!fs.existsSync(staticFolder)) {
      fs.mkdirSync(staticFolder, { recursive: true });
    }

    cb(null, staticFolder);
  },
  filename: (req, file, cb) => {
    let fileName = Date.now() + file.originalname;
    cb(null, fileName);
  },
});

let fileFilter = (req, file, cb) => {
  let validExtensions = req.query.validExtensions
    ? req.query.validExtensions.split(",")
    : [
        ".jpeg",
        ".jpg",
        ".JPG",
        ".JPEG",
        ".png",
        ".svg",
        ".doc",
        ".pdf",
        ".mp4",
      ];
  let originalName = file.originalname;
  let originalExtension = path.extname(originalName); //note path module is inbuilt module(package) of node js (ie no need to install path package)
  let isValidExtension = validExtensions.includes(originalExtension);
  if (isValidExtension) {
    cb(null, true);
  } else {
    cb(new Error("File is not supported"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limit,
});

export default upload;