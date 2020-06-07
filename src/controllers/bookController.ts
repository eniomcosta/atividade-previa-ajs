import express from "express";

class BookController {
  index = (_: express.Request, res: express.Response) => {
    return res.status(404).json({ errors: ["Not implemented yet"] });
  };

  create = (_: express.Request, res: express.Response) => {
    return res.status(404).json({ errors: ["Not implemented yet"] });
  };

  update = (_: express.Request, res: express.Response) => {
    return res.status(404).json({ errors: ["Not implemented yet"] });
  };

  delete = (_: express.Request, res: express.Response) => {
    return res.status(404).json({ errors: ["Not implemented yet"] });
  };
}

export default new BookController();
