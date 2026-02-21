
import { useEffect } from 'react'
import { obtenerDatosDeCandidato } from './services/apiJobPosition/apiJobPosition'
import './App.css'
import { NotFoundCandidateException } from './services/apiJobPosition/errors/notFoundCandidateException';

function App() {
  useEffect(() => {
      obtenerDatosDeCandidato("santozzi@gmail.com").then((datos)=>{
          console.log(`${datos.firstName} ${datos.lastName}`);
          
      })
      .catch((error)=>{
        if(error instanceof NotFoundCandidateException){
          console.log(error.message)
        }
        
      });
      
  }, [])
  

  return (
    <>
      
    </>
  )
}

export default App
