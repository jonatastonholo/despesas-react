import React, { useEffect, useState } from "react";
import { Despesa } from "./domain/Despesa";
import { listDespesas } from "./services/DespesaService";
import { Container } from "@material-ui/core";
import { Header } from "./components/Header";
import { FilterBox } from "./components/FilterBox";
import { ContentPanel } from "./components/ContentPanel";
import { toReal } from "./helpers/Utils";

const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export default function Main() {
  const [despesas, setDespesas] = useState<Despesa[] | []>([]);
  const [despesasFiltered, setDespesasFilter] = useState<Despesa[] | []>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>(months[0]);
  const [years, setYears] = useState<string[] | []>([]);

  useEffect(() => {
    (async () => {
      const despesasList = (await listDespesas()) as Array<Despesa>;
      setDespesas(despesasList);
    })();
  }, []);

  useEffect(() => {
    const yearsList: string[] = [];
    for (let despesa of despesas) {
      const year = despesa.mes.split("-")[0];
      if (!yearsList.includes(year)) {
        yearsList.push(year);
      }
    }
    setSelectedYear(yearsList[0]);
    setYears(yearsList);
  }, [despesas]);

  useEffect(() => {
    (async () => {
      if (!!selectedMonth && !!selectedYear) {
        const idx: number = months.indexOf(selectedMonth);
        const filteredDespesas = (await listDespesas(
          selectedYear,
          (idx + 1).toLocaleString().padStart(2, "0")
        )) as Array<Despesa>;
        setDespesasFilter(filteredDespesas);
      }
    })();
  }, [selectedYear, selectedMonth]);

  function handleYearChange(year: string): void {
    setSelectedYear(year);
  }

  function handleMonthChange(month: string): void {
    setSelectedMonth(month);
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
        months={months}
        selectedMonth={selectedMonth}
        totalExpenses={calculateTotal()}
        onYearChange={handleYearChange}
        onMonthChange={handleMonthChange}
      />
      <ContentPanel despesas={despesasFiltered} />
    </Container>
  );
}
