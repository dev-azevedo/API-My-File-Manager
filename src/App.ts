import express from "express";
import router from "./routes";
import cors from "cors";
import errorHandleing from "./services/Error";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import configMorgan from "./config/morgan";

const App = express();
App.use(express.json());
App.use(cors());
configMorgan(App);
App.use(router);
App.use(errorHandleing);
App.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export default App;
