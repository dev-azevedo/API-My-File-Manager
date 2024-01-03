import multer from "multer";
import fs, { existsSync } from "fs";
import path from "path";

// Post
const storage = multer.diskStorage({
  destination: async (req, file, callback) => {
    if (!req.params.id) {
      throw new Error(
        "O ID do cliente é obrigatório para cadastrar os arquivos."
      );
    }

    let directoryPath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      `${req.params.id}`
    );

    !existsSync(directoryPath) &&
      (await fs.promises.mkdir(directoryPath, { recursive: true }));

    callback(null, directoryPath);
  },

  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_-_${file.originalname}`);
  },
});

const uploadConfig = multer({
  storage: storage,
}).array("files", 10);

export { uploadConfig };
