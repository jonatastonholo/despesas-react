// @flow
import * as React from "react";
import { Card, makeStyles, Typography } from "@material-ui/core";
import { darkTheme } from "../Styles";

type Props = {
  title: string;
};

const useStyles = makeStyles({
  header: {
    background: "linear-gradient(45deg, #3C3F41 30%, #3C3F41 70%)",
    border: 0,
    borderRadius: 5,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    fontWeight: 200,
    padding: "0.25rem",
    marginTop: "25px",
    textAlign: "center",
    color: darkTheme.color,
  },
});

export function Header({ title }: Props) {
  const classes = useStyles();
  return (
    <Card className={classes.header}>
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
    </Card>
  );
}
