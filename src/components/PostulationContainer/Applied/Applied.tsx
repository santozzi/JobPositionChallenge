
import React from 'react';
import type { Apply } from '../PostulationContainer';

type PropsApplied ={
  applyData: Apply,

}


const Applied: React.FC<PropsApplied> = ({applyData}) => {
	const {candidateId,jobId,repoUrl,uuid} = applyData;
	return (
		<div>
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
