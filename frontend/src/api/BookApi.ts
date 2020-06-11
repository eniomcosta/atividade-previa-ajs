import axios from "axios";
import { Book } from "../interfaces/Book";

const api = process.env.REACT_APP_API_URL;

class BookApi {
  getAll = async (): Promise<Book[]> => {
    try {
      const books = await axios.get<Book[]>(`${api}/books`);
      return books.data;
    } catch (e) {
      throw new Error("Error trying to fetch info from API");
    }
  };

  save = async (book: Book): Promise<Book> => {
    const result = await axios.post<Book>(`${api}/books`, book);

    return result.data;
  };

  delete = async (id: number): Promise<Book> => {
    const result = await axios.delete<Book>(`${api}/books/${id}`);

    return result.data;
  };
}

export default new BookApi();
