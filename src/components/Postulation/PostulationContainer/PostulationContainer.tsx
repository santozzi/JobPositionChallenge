"use client";
import React, { useEffect, useState } from "react";
import {
  enviarPostulacion,
  obtenerDatosDeCandidato,
  obtenerPostulacionesDisponibles,
  type Postulacion,
} from "../../../services/apiJobPosition/apiJobPosition";
import { PostulationViewer } from "./../PostulationViewer";
import { configAPI } from "../../../config/ConfigApi";
import "./css/styles.css";
import Swal from "sweetalert2";
import { NotFoundCandidateException } from "../../../services/apiJobPosition/errors/notFoundCandidateException";

export type Apply = {
  uuid: string;
  jobId: number;
  candidateId: string;
  applicationId: string;
  repoUrl: string;
};

const PostulationContainer: React.FC = () => {
  const [postulado] = useState<boolean>(false);
  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);
  const handlerCandidato = async (email: string, jobId: number) => {
    try {
      const candidato = await obtenerDatosDeCandidato(email);
      const paraAplicar: Apply = {
        uuid: candidato.uuid,
        candidateId: candidato.candidateId,
        applicationId: candidato.applicationId,
        jobId,
        repoUrl: configAPI().REPOSITORY,
      };
       await enviarPostulacion(paraAplicar);
       Swal.fire("Envio exitoso");
      
    } catch (error) {
      if (error instanceof NotFoundCandidateException) Swal.fire(error.message);
    }
  };

  useEffect(() => {
    if (!postulado) {
      obtenerPostulacionesDisponibles().then((postulaciones) => {
        setPostulaciones(postulaciones);
      }).catch((error)=>Swal.fire(error.message));
    }
  }, [postulado]);
  return (
    <div className="postulation-container-box">
      {
        postulaciones.map((postulacion) => (
          <PostulationViewer
            key={`postulation${postulacion.id}`}
            handler={handlerCandidato}
            postulation={postulacion}
          />
        ))
       }
    </div>
  );
};

export default PostulationContainer;
