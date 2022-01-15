import { Lote } from "./Lote";
import { PalestranteEvento } from "./PalestranteEvento";
import { RedeSocial } from "./RedeSocial";

export interface Evento {
  id : number;
  local : string;
  tema : string;
  dataEvento? : Date;
  qtdPessoas : number;
  imagemURL : string;
  telefone : string;
  email : string;
  lotes : Lote[];
  redesSociais : RedeSocial[];
  palestrantesEventos : PalestranteEvento[];
}
