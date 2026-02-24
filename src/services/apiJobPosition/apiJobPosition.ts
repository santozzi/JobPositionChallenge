import type { Apply } from "../../components/Postulation/PostulationContainer/PostulationContainer";
import { configAPI } from "../../config/ConfigApi";
import { esEmailValido } from "../../utils/esEmailValido";
import { EmptyOpenPositionListException } from "./errors/emptyOpenPositionListException";
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
export type Postulacion = {
  id: number, 
  title: string
}

export async function obtenerDatosDeCandidato(email: string):Promise<Candidato> {

  if (!email) {
    throw new Error("Falta el email del candidato");
  }
  if(!esEmailValido(email)){
    throw new Error("Formato de email incorrecto");
  }

 
  const data = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${email}`,
  );
  if(!data.ok){
     throw new Error("Error inesperado");
  }
  const datosDelCandidato = await data.json();
   
  if(datosDelCandidato.error == "No candidate found with that email"){
      
      throw new NotFoundCandidateException("No se encontró un candidato con ese email")
  }
  return datosDelCandidato as Candidato;


}
export async function obtenerPostulacionesDisponibles():Promise<Postulacion[]> {


  const data = await fetch(
    `${BASE_URL}/api/jobs/get-list`,
  );
  const datosDePostulaciones= await data.json();
   
  if(datosDePostulaciones.length == 0){
      //Esto lo hago para desacoplar los errores de la api con los que recibe la aplicacion, mañana cambio de api lo cambio de aca y la app ni enterada.
      throw new EmptyOpenPositionListException("No se encontraron posiciones abiertas")
  }
  return datosDePostulaciones as Postulacion[];


}

export async function enviarPostulacion(apply:Apply):Promise<boolean>{
  const data = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({...apply}),
  });

  console.log("en enviar", JSON.stringify({...apply}));
  const error = await data.json();

  if (!data.ok) {
    
    console.log(error);
    
   return false;
  }

    console.log(error);
  return true;
}