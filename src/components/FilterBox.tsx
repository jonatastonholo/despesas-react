import { Box, FormControl, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";

import { commonStyles, theme } from "../Styles";
import { CardPanel } from "./CardPanel";
import { LoadingCard } from "./LoadingCard";

const useStyles = makeStyles({
  formControl: {
    margin: "10px",
    color: theme.fonts.color,
  },
  totalExpenses: {
    marginLeft: "0.50rem",
    fontWeight: 800,
  },
  categoryBox: {
    width: "200px",
    color: theme.fonts.color,
  },
});

type props = {
  years: string[];
  selectedYear: string | null;
  selectedMonth: string | null;
  months: string[];
  categories: string[];
  selectedCategory: string | null;
  totalExpenses: string;
  onYearChange: (year: string) => void;
  onMonthChange: (year: string) => void;
  onCategoryChange: (category: string) => void;
};

export function FilterBox({
  years,
  selectedYear,
  months = [],
  selectedMonth,
  categories = [],
  selectedCategory,
  totalExpenses,
  onYearChange,
  onMonthChange,
  onCategoryChange,
}: props) {
  const classes = useStyles();
  const css = commonStyles();

  function handleYearChange(event: any) {
    onYearChange(event.target.value);
  }

  function handleMonthChange(event: any) {
    const { value } = event.target;
    console.log(value);
    onMonthChange(value);
  }

  function handleCategoryChange(event: any) {
    const { value } = event.target;
    onCategoryChange(value);
  }

  if (
    years.length === 0 ||
    months.length === 0 ||
    categories.length === 0 ||
    !selectedYear ||
    !selectedMonth ||
    !selectedCategory
  ) {
    return <LoadingCard />;
  }

  return (
    <CardPanel>
      <Box flex="1">
        <FormControl className={classes.formControl}>
          <InputLabel id="select-year" className={css.fonts}>
            Ano
          </InputLabel>
          <Select
            className={css.fonts}
            labelId="select-year"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {years.map((year, idx) => (
              <MenuItem key={idx} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel className={css.fonts} id="select-month">
            Mês
          </InputLabel>
          <Select
            className={css.fonts}
            labelId="select-month"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            {months.map((month, idx) => (
              <MenuItem key={idx} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel className={css.fonts} id="select-category">
            Categorias
          </InputLabel>
          <Select
            className={classes.categoryBox}
            labelId="select-category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((category, idx) => (
              <MenuItem key={idx} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box className={css.container}>
        Despesa Total:
        <span className={classes.totalExpenses}>{totalExpenses}</span>
      </Box>
    </CardPanel>
  );
}
