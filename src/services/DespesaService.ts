import { axiosInstance } from "./httpService";
import { Despesa } from "../domain/Despesa";
import { ApiError } from "../error/ApiError";

const url = "/despesas";

export async function listDespesas(
  ano?: string | null,
  mes?: string | null
): Promise<Despesa[] | undefined> {
  try {
    const filter = !!ano && !!mes ? `?mes=${ano}-${mes}&_sort=dia` : "";
    const response = await axiosInstance.get(url + filter);
    if (response.status === 200) {
      const { data: despesas }: { data: Despesa[] } = response;
      return despesas;
    } else {
      throw new ApiError(response.status, "Erro ao tentar listar as despesas", response);
    }
  } catch (e) {
    console.error(e);
  }
}
