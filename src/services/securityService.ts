import { IUser } from "../domain/IUser";
import { axiosInstance } from "./httpService";
import { ApiError } from "../error/ApiError";

export async function signIn(email: string, password: string): Promise<IUser | undefined> {
  try {
    const url = "/sessao/criar";
    const response = await axiosInstance.post(url, { email, senha: password });
    if (response.status === 200) {
      const { nome: name, email } = response.data;
      return { name, email };
    } else {
      throw new ApiError(response.status, "Erro ao realizar login", response);
    }
  } catch (e) {
    console.error(e);
  }
}

export async function getSession () : Promise<IUser | undefined> {
  try {
    const url = "/sessao/usuario";
    const response = await axiosInstance.get(url);
    if (response.status === 200) {
      const { nome: name, email } = response.data;
      return { name, email};
    } else {
      throw new ApiError(response.status, "Erro ao buscar sessão", response);
    }
  } catch (e) {
    console.error(e);
  }
}

export async function signOut () : Promise<IUser | undefined> {
  try {
    const url = "/sessao/finalizar";
    const response = await axiosInstance.post(url, {});
    if (response.status === 200) {
      const { nome: name, email } = response.data;
      return { name, email};
    } else {
      throw new ApiError(response.status, "Erro ao realizar login", response);
    }
  } catch (e) {
    console.error(e);
  }
}