"use client";
import React, { useEffect, useState } from "react";
import {
  enviarPostulacion,
  obtenerDatosDeCandidato,
  obtenerPostulacionesDisponibles,
  type Postulacion,
} from "../../services/apiJobPosition/apiJobPosition";
import { EmptyOpenPositionListException } from "../../services/apiJobPosition/errors/emptyOpenPositionListException";
import { NotFoundCandidateException } from "../../services/apiJobPosition/errors/notFoundCandidateException";
import { PostulationViewer } from "./PostulationViewer";
import { Applied } from "./Applied";
import { configAPI } from "../../config/ConfigApi";
import "./css/styles.css";
export type Apply = {
  uuid: string;
  jobId: number;
  candidateId: string;
  applicationId:string;
  repoUrl: string;
};
const PostulationContainer: React.FC = () => {
  const [postulado, setPostulado] = useState<boolean>(false);
  const [applyEnviada, setApplyEnviada] = useState<boolean>(false);

  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);

  const handlerCandidato = (email: string, jobId: number) => {
    obtenerDatosDeCandidato(email)
      .then((candidato) => {
        const paraAplicar: Apply = {
          uuid: candidato.uuid,
          candidateId: candidato.candidateId,
          applicationId:candidato.applicationId ,
          jobId,
          repoUrl: configAPI().REPOSITORY,
        };

        enviarPostulacion(paraAplicar).then((respuesta) => {
          setApplyEnviada(respuesta);
        });

        setPostulado(true);
      })
      .catch((error) => {
        if (error instanceof NotFoundCandidateException) {
          console.log(error.message);
        }
      });
  };

  useEffect(() => {
    if (!postulado) {
      obtenerPostulacionesDisponibles()
        .then((postulaciones) => {
          setPostulaciones(postulaciones);
        })
        .catch((error) => {
          if (error instanceof EmptyOpenPositionListException) {
            console.log(error.message);
          }
        });
    }
  }, [postulado]);
  return (
    <div className="postulation-container-box">
      {!postulado ? (
        postulaciones.map((postulacion) => (
          <PostulationViewer
            key={`postulation${postulacion.id}`}
            handler={handlerCandidato}
            postulation={postulacion}
          />
        ))
      ) : (
        <Applied applyData={applyEnviada} />
      )}
    </div>
  );
};

export default PostulationContainer;
