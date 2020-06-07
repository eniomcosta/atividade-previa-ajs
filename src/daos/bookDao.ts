import Book from "../interfaces/Book";
import { db } from "../database/database";

class BookDao {
  create = async (b: Book) => {
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
  };

  update = async (b: Book) => {
    let fields = "";

    let hasPrevious = false;

    if (b.title !== undefined) {
      fields += ` title = "${b.title}" `;
      hasPrevious = true;
    }

    if (b.author !== undefined) {
      hasPrevious ? (fields += ",") : "";
      fields += ` author = "${b.author}" `;
      hasPrevious = true;
    }

    if (b.publishing_company !== undefined) {
      hasPrevious ? (fields += ",") : "";
      fields += ` publishing_company = "${b.publishing_company}" `;
      hasPrevious = true;
    }
    if (b.area !== undefined) {
      hasPrevious ? (fields += ",") : "";
      fields += ` area = "${b.area}" `;
      hasPrevious = true;
    }

    await db.run(`UPDATE Book SET ${fields} WHERE id = ${b.id}`);
  };

  delete = async (id: number) => {
    await db.run(`DELETE FROM Book WHERE id = ${id}`);
  };

  findById = async (id: number): Promise<Book | undefined> => {
    return await db.get<Book>(`SELECT * FROM Book WHERE id = :id`, {
      ":id": id,
    });
  };
}

export default new BookDao();
