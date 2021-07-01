import { IDespesa } from "../domain/IDespesa";
import { axiosInstance } from "./httpService";
import { ApiError } from "../error/ApiError";

const url = "/despesas";

export async function listDespesas(
  ano?: string | null,
  mes?: string | null,
  categoria?: string | null
): Promise<IDespesa[] | undefined> {
  try {
    // let filter = !!categoria ? `?categoria=${categoria}` : '';
    //
    // if (!!ano && !!mes) {
    //   filter += filter !== '' ? '&' : '?';
    //   filter += `mes=${ano}-${mes}&_sort=dia`;
    // }
    let filter = getFilter(ano, mes, categoria);
    console.log(url + filter);

    const response = await axiosInstance.get(url + filter);
    if (response.status === 200) {
      const { data: despesas }: { data: IDespesa[] } = response;
      return despesas;
    } else {
      throw new ApiError(response.status, "Erro ao tentar listar as despesas", response);
    }
  } catch (e) {
    console.error(e);
  }

  function getFilter(ano?: string | null, mes?: string | null, categoria?: string | null): string {
    let filter = !!categoria ? `?categoria=${categoria}` : "";


    if (!!ano) {
      filter += filter !== "" ? "&" : "?";
      filter += `${!!mes ? 'mes' : 'ano'}=${ano}`;
      if (!!mes) {
        filter += `-${mes}&_sort=dia`;
      } else {
        filter += "&_sort=mes";
      }
    }
    return filter;
  }
}
