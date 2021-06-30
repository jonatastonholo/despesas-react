import { makeStyles } from "@material-ui/core";

export const darkTheme = {
  background: "#3c3f41",
  color: "#b7bdb7",
};

export const commonStyles = makeStyles({
  darkTheme: {
    background: "#3c3f41",
    color: "#b7bdb7",
  },

  center: {
    textAlign: "center",
    alignItems: "center",
    margin: "auto",
  },
  container: {
    textAlign: "center",
    alignItems: "center",
    margin: "auto",
    padding: "1rem",
  },
  fonts: {
    color: darkTheme.color,
  },
});
