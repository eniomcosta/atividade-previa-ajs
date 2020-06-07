import express from "express";
import { db } from "../database/database";
import Book from "../interfaces/Book";
import { ActionTypes } from "../enums/actionTypes";
import bookDao from "../daos/bookDao";

class BookController {
  index = async (_: express.Request, res: express.Response) => {
    const result = await db.all<Book[]>("SELECT * FROM Book");
    return res.json(result);
  };

  create = async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    const errors = await this.validate(req, ActionTypes.INSERT);

    if (errors.length > 0) {
      return res.status(412).json({ errors: errors });
    } else {
      const b: Book = req.body;

      await bookDao.create(b);

      return res.send();
    }
  };

  update = async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    const errors = await this.validate(req, ActionTypes.UPDATE);

    if (errors.length > 0) {
      return res.status(412).json({ errors: errors });
    } else {
      const id = req.params.id;
      const b: Book = { id, ...req.body };

      await bookDao.update(b);

      return res.send();
    }
  };

  delete = async (req: express.Request, res: express.Response) => {
    const errors = await this.validate(req, ActionTypes.DELETE);

    if (errors.length > 0) {
      return res.status(412).json({ errors: errors });
    } else {
      await bookDao.delete(parseInt(req.params.id));

      return res.send();
    }
  };

  validate = async (
    req: express.Request,
    action: ActionTypes
  ): Promise<string[]> => {
    const errors: string[] = [];

    const b: Book = req.body;

    switch (action) {
      case ActionTypes.INSERT:
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

        break;

      case ActionTypes.UPDATE:
        if (Object.keys(b).length === 0) {
          return ["No data was provided"];
        }

        if (req.params.id === undefined) {
          return ["Book to update not provided"];
        } else {
          const result = await bookDao.findById(parseInt(req.params.id));

          if (result === undefined) {
            return ["Book not found"];
          }
        }
        if (b.title !== undefined && b.title.trim() === "") {
          errors.push("Title must be provided");
        }

        if (b.author !== undefined && b.author.trim() === "") {
          errors.push("Author must be provided");
        }

        if (
          b.publishing_company !== undefined &&
          b.publishing_company.trim() === ""
        ) {
          errors.push("Publishing Company must be provided");
        }

        if (b.area !== undefined && b.area.trim() === "") {
          errors.push("Area must be provided");
        }
        break;

      case ActionTypes.DELETE:
        const result = await bookDao.findById(parseInt(req.params.id));

        if (result === undefined) {
          errors.push("Book not found");
        }
        break;

      default:
        break;
    }

    return errors;
  };
}

export default new BookController();
