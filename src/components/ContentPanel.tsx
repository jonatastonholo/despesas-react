import { CardPanel } from "./CardPanel";
import ContentTable from "./ContentTable";
import { IDespesa } from "../domain/IDespesa";
import React from "react";

type props = {
  despesas: IDespesa[];
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
