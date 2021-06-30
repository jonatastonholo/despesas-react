import { CardPanel } from "./CardPanel";
import ContentTable from "./ContentTable";
import { Despesa } from "../domain/Despesa";
import React from "react";

type props = {
  despesas: Despesa[];
};
export function ContentPanel({ despesas }: props) {
  if (!despesas || despesas.length === 0) {
    return <></>;
  }
  return (
    <CardPanel>
      <ContentTable despesas={despesas} />
    </CardPanel>
  );
}
