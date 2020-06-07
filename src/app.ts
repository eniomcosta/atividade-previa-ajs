import express from "express";
import dotenv from "dotenv";
import bookRouter from "./routes/bookRouter";

class App {
  app: express.Application = express();
  start() {
    //Inicializa as variáveis
    dotenv.config();
    this.app.use(express.json());

    this.setupRoutes();

    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  }

  setupRoutes() {
    this.app.use("/library", bookRouter);
  }
}

export default new App();
