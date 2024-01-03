import { Express } from "express";
import fs from "fs";
import path from "path";
import morganBody from "morgan-body";
import Helper from "../services/Utils/Helper/HelperService";

const configMorgan = (App: Express) => {
  const logDir = path.join(__dirname, "..", "..", "logs");

  !fs.existsSync(logDir) && fs.mkdirSync(logDir);

  const log = fs.createWriteStream(
    path.join(logDir, `express${Helper.toDay()}.log`),
    {
      flags: "a",
    }
  );

  return morganBody(App, {
    noColors: true,
    stream: log,
  });
};

export default configMorgan;
