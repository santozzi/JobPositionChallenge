
import React from 'react';
import type { Apply } from '../PostulationContainer';
import "./css/styles.css";

type PropsApplied ={
  applyData: Apply,

}


const Applied: React.FC<PropsApplied> = ({applyData}) => {
	const {candidateId,jobId,repoUrl,uuid} = applyData;
	return (

		<div className='cardApply'>
 			{
				<ul>
					<li>{`candidateId: ${candidateId}`}</li>
					<li>{`jobId: ${jobId}`}</li>
					<li>{`repoUrl: ${repoUrl}`}</li>
					<li>{`uuid: ${uuid}`}</li>
				</ul>
			}
 		</div>
	
		
	);
};

export default Applied;
