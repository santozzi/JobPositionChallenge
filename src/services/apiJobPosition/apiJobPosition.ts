import { configAPI } from "../../config/ConfigApi";
import { NotFoundCandidateException } from "./errors/notFoundCandidateException";

const BASE_URL = configAPI().BASE_URL;
export type Candidato = {
  uuid: string;
  candidateId: string;
  applicationId: string;
  firstName: string;
  lastName: string;
  email: string;
};

export async function obtenerDatosDeCandidato(email: string):Promise<Candidato> {
  if (!email) {
    throw new Error("Falta el email del candidato");
  }
  //TODO: usar expresion regular para chequear el formato del email
 
  const data = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${email}`,
  );
  const datosDelCandidato = await data.json();
   
  if(datosDelCandidato.error == "No candidate found with that email"){
      //Esto lo hago para desacoplar los errores de la api con los que recibe la aplicacion, mañana cambio de api lo cambio de aca y la app ni enterada.
      throw new NotFoundCandidateException("No se encontró un candidato con ese email")
  }
  return datosDelCandidato as Candidato;


}
