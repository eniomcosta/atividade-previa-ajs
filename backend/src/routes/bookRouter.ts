import express, { Router } from "express";
import BookController from "../controllers/bookController";

const router: Router = express.Router();

router.get("/books", BookController.index);
router.post("/books", BookController.create);
router.put("/books/:id", BookController.update);
router.delete("/books/:id", BookController.delete);

export default router;
