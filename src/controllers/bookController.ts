import express from "express";
import { db } from "../database/database";
import Book from "../interfaces/Book";

class BookController {
  index = async (_: express.Request, res: express.Response) => {
    const result = await db.all<Book[]>("SELECT * FROM Book");
    return res.json(result);
  };

  create = async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    const errors = this.validate(req);

    if (errors.length > 0) {
      return res.status(412).json({ errors: errors });
    } else {
      const b: Book = req.body;

      await db.run(
        `INSERT INTO Book VALUES (:id, :title, :author, :publishing, :area)`,
        {
          ":id": null,
          ":title": b.title,
          ":author": b.author,
          ":publishing": b.publishing_company,
          ":area": b.area,
        }
      );

      return res.send();
    }
  };

  update = (_: express.Request, res: express.Response) => {
    return res.status(404).json({ errors: ["Not implemented yet"] });
  };

  delete = (_: express.Request, res: express.Response) => {
    return res.status(404).json({ errors: ["Not implemented yet"] });
  };

  validate = (req: express.Request): string[] => {
    const errors: string[] = [];

    const b: Book = req.body;

    console.error(b.author);

    if (Object.keys(b).length === 0) {
      return ["No data was provided"];
    }

    if (b.title === undefined || b.title.trim() === "") {
      errors.push("Title must be provided");
    }

    if (b.author === undefined || b.author.trim() === "") {
      errors.push("Author must be provided");
    }

    if (
      b.publishing_company === undefined ||
      b.publishing_company.trim() === ""
    ) {
      errors.push("Publishing Company must be provided");
    }

    if (b.area === undefined || b.area.trim() === "") {
      errors.push("Area must be provided");
    }

    return errors;
  };
}

export default new BookController();
