import '../../assets/css/Styles.css';
import { ClientForm } from '../tabs/clients/ClientForm';
import { ProjectForm } from '../tabs/projects/ProjectForm';

export const NewItemForm = (props: any) => {
	const renderFormContent = () => {
		switch (props.formType) {
			case 'client':
				return <ClientForm handleSuccessResponse={props.handleUpdate}/>
			case 'project':
				return <ProjectForm handleSuccessResponse={props.handleUpdate}/>
			default:
				return <ClientForm handleSuccessResponse={props.handleUpdate}/>
		}
	}
	return (
		<div className='new-member-wrap'>
			<div id='new-member' className='new-member-inner'>
				{renderFormContent()}
			</div>
		</div>
	)
};