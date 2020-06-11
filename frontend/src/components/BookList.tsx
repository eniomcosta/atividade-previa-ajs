import React, { useState, useEffect, FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Book } from "../interfaces/Book";
import BookApi from "../api/BookApi";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

const BookList: FC = () => {
  const [books, setBooks] = useState<Book[]>();

  const loadBooks = async () => {
    const books = await BookApi.getAll();

    setBooks(books);
  };

  const handleDelete = async (id: number) => {
    await BookApi.delete(id);

    const leftBooks = books?.filter((b) => b.id !== id);

    setBooks(leftBooks);
  };

  useEffect(() => {
    loadBooks();
  }, [books]);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();

  return (
    <Container className="container" fixed>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Author</TableCell>
              <TableCell align="center">Publishing</TableCell>
              <TableCell align="center">Area</TableCell>
              <TableCell align="center">#</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books?.map((b) => (
              <TableRow key={b.id}>
                <TableCell component="th" scope="row">
                  {b.title}
                </TableCell>
                <TableCell align="center">{b.author}</TableCell>
                <TableCell align="center">{b.publishing_company}</TableCell>
                <TableCell align="center">{b.area}</TableCell>
                <TableCell align="center">
                  <button onClick={() => handleDelete(b.id)}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BookList;
