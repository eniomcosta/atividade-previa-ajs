import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";

import { Book } from "../interfaces/Book";
import BookApi from "../api/BookApi";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    color: "black",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  grid: {
    paddingBottom: theme.spacing(1),
  },

  button: {
    marginBottom: theme.spacing(2),
  },
}));

const BookForm: FC = () => {
  const history = useHistory();
  const classes = useStyles();

  const onSubmit = async (data: Book) => {
    await BookApi.save(data);

    history.push("/");
  };

  const { register, handleSubmit } = useForm<Book>();

  return (
    <Container className="container">
      <div className={classes.paper}>
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography component="h1" variant="h5">
            Book
          </Typography>
          <Grid className={classes.grid}>
            <input
              id="title"
              name="title"
              required
              ref={register}
              placeholder="Títle"
            />
          </Grid>
          <Grid className={classes.grid}>
            <input
              id="author"
              name="author"
              required
              ref={register}
              placeholder="Author"
            />
          </Grid>
          <Grid className={classes.grid}>
            <input
              id="publishing_company"
              name="publishing_company"
              required
              ref={register}
              placeholder="Publishing Company"
            />
          </Grid>
          <Grid className={classes.grid}>
            <input
              id="area"
              name="area"
              required
              ref={register}
              placeholder="Area"
            />
          </Grid>

          <input type="submit" value="Save" />
        </form>
      </div>
    </Container>
  );
};

export default BookForm;
