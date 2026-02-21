
import { useEffect } from 'react'
import { obtenerDatosDeCandidato, obtenerPostulacionesDisponibles } from './services/apiJobPosition/apiJobPosition'
import './App.css'
import { NotFoundCandidateException } from './services/apiJobPosition/errors/notFoundCandidateException';
import { EmptyOpenPositionListException } from './services/apiJobPosition/errors/emptyOpenPositionListException';

function App() {
  useEffect(() => {
      // obtenerDatosDeCandidato("santozzi@gmail.com").then((datos)=>{
      //     console.log(`${datos.firstName} ${datos.lastName}`);
          
      // })
      // .catch((error)=>{
      //   if(error instanceof NotFoundCandidateException){
      //     console.log(error.message)
      //   }
        
      // });
      obtenerPostulacionesDisponibles().then((postulaciones)=>{
        postulaciones.map((postulacion=>{
          console.log(postulacion.id,postulacion.title);
          
        }))
      }).catch(error=>{
        if(error instanceof EmptyOpenPositionListException){
          console.log(error.message);
          
        }
      })
      
  }, [])
  

  return (
    <>
      
    </>
  )
}

export default App
