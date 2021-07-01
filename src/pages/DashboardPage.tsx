import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IDespesa } from "../domain/IDespesa";
import { listDespesas } from "../services/despesaService";
import { Container } from "@material-ui/core";
import { Header } from "../components/Header";
import { FilterBox } from "../components/FilterBox";
import { ContentPanel } from "../components/ContentPanel";
import { toReal } from "../helpers/utils";

const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export default function DashboardPage() {
  const { yearMonth } = useParams<{ yearMonth: string }>();
  const [initialYear, initialMonthIdx] = yearMonth.split('-');
  const [despesas, setDespesas] = useState<IDespesa[] | []>([]);
  const [despesasFiltered, setDespesasFilter] = useState<IDespesa[] | []>([]);
  const [selectedYear, setSelectedYear] = useState<string>(initialYear);
  const [selectedMonth, setSelectedMonth] = useState<string>(months[parseInt(initialMonthIdx)]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [categories, setCategories] = useState<string[]>([]);
  const [years, setYears] = useState<string[] | []>([]);

  useEffect(() => {
    (async () => {
      const despesasList = (await listDespesas()) as Array<IDespesa>;
      setDespesas(despesasList);
    })();
  }, []);

  useEffect(() => {
    const yearsList: string[] = [];
    const categoriesList: string[] = ["Todas"];
    for (let despesa of despesas) {
      const year = despesa.mes.split("-")[0];
      if (!yearsList.includes(year)) {
        yearsList.push(year);
      }

      if (!categoriesList.includes(despesa.categoria)) {
        categoriesList.push(despesa.categoria);
      }
    }

    setYears(yearsList);
    setCategories(categoriesList);
    setSelectedCategory(categoriesList[0])
  }, [despesas]);

  useEffect(() => {
    (async () => {
      if (!!selectedMonth && !!selectedYear) {
        let month = "";
        if(selectedMonth !=='Todos') {
          const idx = months.indexOf(selectedMonth);
          month = (idx + 1).toLocaleString().padStart(2, "0")
        }

        const filteredDespesas = (await listDespesas(
          selectedYear,
          month,
          selectedCategory === 'Todas' ? '' : selectedCategory
        )) as Array<IDespesa>;
        setDespesasFilter(filteredDespesas);
      }
    })();
  }, [selectedYear, selectedMonth, selectedCategory]);

  function handleYearChange(year: string): void {
    setSelectedYear(year);
  }

  function handleMonthChange(month: string): void {
    setSelectedMonth(month);
  }

  function handleCategoryChange(category: string): void {
    setSelectedCategory(category);
  }

  //prettier-ignore
  function calculateTotal(): string {
    return toReal(
      despesasFiltered
        .map((despesa) => despesa.valor)
        .reduce((acc, cur) => acc + cur, 0)
    );
  }

  return (
    <Container>
      <Header title={"Despesas"} />
      <FilterBox
        years={years}
        selectedYear={selectedYear}
        months={["Todos", ...months]}
        categories={categories}
        selectedMonth={selectedMonth}
        selectedCategory={selectedCategory}
        totalExpenses={calculateTotal()}
        onYearChange={handleYearChange}
        onMonthChange={handleMonthChange}
        onCategoryChange={handleCategoryChange}
      />
      <ContentPanel despesas={despesasFiltered} />
    </Container>
  );
}
