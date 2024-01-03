import express from "express";
import router from "./routes";
import cors from "cors";
import errorHandleing from "./services/Error";
import configMorgan from "./config/morgan";

const App = express();
App.use(express.json());
App.use(cors());
configMorgan(App);
App.use(router);
App.use(errorHandleing);

export default App;
