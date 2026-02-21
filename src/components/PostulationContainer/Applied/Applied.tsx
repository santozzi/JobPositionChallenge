
import React from 'react';

import "./css/styles.css";

type PropsApplied ={
  applyData: boolean,

}


const Applied: React.FC<PropsApplied> = ({applyData}) => {
	
	return (

		<div className='cardApply'>
 			{
				(applyData)
				   ?<p>Postulación exitosa!!!!</p>
				   :<p>Error en la postulación</p>
			}
 		</div>
	
		
	);
};

export default Applied;
