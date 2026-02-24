"use client";
import React, { useState } from 'react';
import type { Postulacion } from '../../../services/apiJobPosition/apiJobPosition';
import { esEmailValido } from '../../../utils/esEmailValido';
import "./css/styles.css";
type PropPostulacionViewer ={
	handler:(email:string,jobId:number)=>void,
	postulation:Postulacion
}


const PostulationViewer: React.FC<PropPostulacionViewer>  = (props) => {
	const [email, setEmail] = useState("");
	const {handler,postulation} = props;
	const emailHandler=(e: React.ChangeEvent<HTMLInputElement>)=>{
      const emailCapturado = e.target.value;
	  
		  setEmail(emailCapturado)
	  
	}
	const buttonHandler = ()=>{
    if(esEmailValido(email)){
		  handler(email,postulation.id)
	  }
	}
	return (
		<div className='postulationCard'>
 			<ul>
				<li>{postulation.title}</li>
				<li><input  type='email' value={email} onChange={emailHandler} placeholder='Ingrese su email'/></li>
				<li><button onClick={buttonHandler} >Submit</button></li>
			</ul>
 		</div>
	);
};

export default PostulationViewer;
