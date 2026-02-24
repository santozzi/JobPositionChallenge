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
  id: number;
  title: string;
};

export async function obtenerDatosDeCandidato(
  email: string,
): Promise<Candidato> {
  //no llego a estas porque valido el email en PostulationViewer lo hice así para desacoplar el código
  if (!email) {
    throw new Error("Falta el email del candidato");
  }

  if (!esEmailValido(email)) {
    throw new Error("Formato de email incorrecto");
  }
 //-------------------------------------------------->

 const data = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${email}`,
  );

  if (!data.ok) {
    if (data.status === 404) {
      throw new NotFoundCandidateException(
        "No se encontró un candidato con ese email",
      );
    } else {
      throw new Error("Error inesperado");
    }
  }
  const datosDelCandidato = await data.json();

  return datosDelCandidato;
}

export async function obtenerPostulacionesDisponibles(): Promise<
  Postulacion[]
> {
  const data = await fetch(`${BASE_URL}/api/jobs/get-list`);
  if (!data.ok) {
    if(data.status === 404){
      throw new Error ("Error con el servidor, intente más tarde")
    }else {
      throw new Error("Error inesperado");
    }
    
  }

  const datosDePostulaciones = await data.json();

  if (datosDePostulaciones.length == 0) {
    throw new EmptyOpenPositionListException(
      "No se encontraron posiciones abiertas",
    );
  }
  return datosDePostulaciones;
}

export async function enviarPostulacion(apply: Apply): Promise<boolean> {
  const data = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({...apply}),
  });
  

  if (!data.ok) {
    if(data.status === 400){
      throw new Error("Solicitud incorrecta, error interno");
    }else{
      throw new Error("Error inesperado");
    }
  }
  return true;
}
