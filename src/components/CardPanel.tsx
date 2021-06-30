// @flow
import * as React from "react";
import { Box, Card, makeStyles } from "@material-ui/core";
import { darkTheme } from "../Styles";

type Props = {
  children: React.ReactNode;
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "0.50rem",
    textAlign: "center",
    background: darkTheme.background,
    color: darkTheme.color,
    border: 0,
    borderRadius: 5,
    marginTop: "1rem",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    textAlign: "left",
    marginTop: "2px",
    color: darkTheme.color,
  },
});

export function CardPanel({ children }: Props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Box className={classes.content}>{children}</Box>
    </Card>
  );
}
