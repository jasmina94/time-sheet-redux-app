import { Project } from '../../../model/model';
import { ProjectDetails } from './ProjectDetails';

export const ProjectDetailsList = (props: any) => {
    return (
        <div className='accordion-wrap projects'>
            {props.projects.map((item: Project) =>
                <ProjectDetails key={item.id} project={item} handleToUpdate={props.handleToUpdate}/>
            )}
        </div>
    )
}