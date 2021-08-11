import '../../assets/css/Styles.css';
import { ClientForm } from '../tabs/clients/ClientForm';


export const NewItemForm = (props: any) => {
	const renderFormContent = () => {
		switch (props.formType) {
			case 'client':
				return <ClientForm handleToUpdate={props.handleToUpdate}/>
			// case 'project':
			// 	return <ProjectForm handleToUpdate={props.handleToUpdate}/>
			default:
				return <ClientForm handleToUpdate={props.handleToUpdate}/>
		}
	}
	return (
		<div className="new-member-wrap">
			<div id="new-member" className="new-member-inner">
				{renderFormContent()}
			</div>
		</div>
	)
};