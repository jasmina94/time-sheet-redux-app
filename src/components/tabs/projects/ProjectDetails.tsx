import { useState } from 'react';
import { Project, ProjectStatus } from '../../../model/model';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { validateProject } from '../../../services/validation.service';
import { deleteProject, fetchProjects, updateProject } from '../../../state/actions/projects.actions';

const ACTIVE_STATUS = ProjectStatus.ACTIVE.valueOf();
const INACTIVE_STATUS = ProjectStatus.INACTIVE.valueOf();
const ARCHIVE_STATUS = ProjectStatus.ARCHIVE.valueOf();

export const ProjectDetails = (props: any) => {
    const dispatch = useAppDispatch();

    const leadOptions = useAppSelector(state => state.projectReducer.leadOptions);
    const customerOptions = useAppSelector(state => state.projectReducer.customerOptions);
    const currentPage = useAppSelector(state => state.projectReducer.tabState.pagingState.currentPage);
    const dataPerPage = useAppSelector(state => state.projectReducer.tabState.pagingState.dataPerPage);

    const [showDetails, setShowDetails] = useState(false);
    const [error, setError] = useState('');
    const [details, setDetails] = useState({
        id: props.project.id,
        name: props.project.name,
        customerId: props.project.customer.id,
        customerName: props.project.customer.name,
        description: props.project.description,
        lead: props.project.lead.id,
        status: props.project.status,
    });

    const handleStatusChange = (e: any) => {
        setDetails({ ...details, status: parseInt(e.target.value) })
    }

    const successfulUpdateCallback = () => {
        setShowDetails(false);
        dispatch(fetchProjects(currentPage, dataPerPage, '', ''));
    }

    const save = (e: any) => {
        e.preventDefault();
        const project: Project = {
            id: details.id,
            name: details.name,
            status: details.status,
            customer: details.customerId,
            description: details.description,
            lead: details.lead            
        }
        const validationResult = validateProject(project);
        if (validationResult.isValid) {
            dispatch(updateProject(project, successfulUpdateCallback))
        } else {
            setError(validationResult.error);
        }
    }

    const remove = (e: any) => {
        e.preventDefault();
        dispatch(deleteProject(details.id));
    }

    return (
        <div className='item'>
            <div className='heading' onClick={() => setShowDetails(!showDetails)}>
                <span>{props.project.name}</span> <span><em>({details.customerName})</em></span>
                <i>+</i>
            </div>
            {showDetails && (
                <div className='details'>
                    <ul className='form'>
                        <li>
                            <label>Project name:</label>
                            <input type='text' name='name' className='in-text' value={details.name} onChange={(e) => { setDetails({ ...details, name: e.target.value }) }} />
                        </li>
                        <li>
                            <label>Lead:</label>
                            <select name='lead' value={details.lead} onChange={(e) => { setDetails({ ...details, lead: e.target.value }) }}>
                                {leadOptions.map((item: any) =>
                                    <option value={item.value} key={item.value}>{item.label}</option>
                                )}
                            </select>
                        </li>
                    </ul>
                    <ul className='form'>
                        <li>
                            <label>Description:</label>
                            <input type='text' name='description' className='in-text' value={details.description} onChange={(e) => { setDetails({ ...details, description: e.target.value }) }} />
                        </li>

                    </ul>
                    <ul className='form last'>
                        <li>
                            <label>Customer:</label>
                            <select name='customer' value={details.customerId} onChange={(e) => { setDetails({ ...details, customerId: e.target.value }) }}>
                                {customerOptions.map((item: any) =>
                                    <option value={item.value} key={item.value}>{item.label}</option>
                                )}
                            </select>
                        </li>
                        <li className='inline'>
                            <label style={{ width: '100%' }}>Status:</label>
                            <span className='radio' style={{ width: '33%' }}>
                                <label htmlFor='active'>Inactive:</label>
                                <input type='radio' value='0' name={details.id + '-name'}
                                    checked={details.status === INACTIVE_STATUS} onChange={handleStatusChange} />
                            </span>
                            <span className='radio' style={{ width: '33%' }}>
                                <label htmlFor='inactive'>Active:</label>
                                <input type='radio' value='1' name={details.id + '-name'}
                                    checked={details.status === ACTIVE_STATUS} onChange={handleStatusChange} />
                            </span>
                            <span className='radio' style={{ width: '33%' }}>
                                <label htmlFor='active'>Archive:</label>
                                <input type='radio' value='2' name={details.id + '-name'}
                                    checked={details.status === ARCHIVE_STATUS} onChange={handleStatusChange} />
                            </span>
                        </li>
                    </ul>
                    <label className='error-label'>{error}</label>
                    <div className='buttons'>
                        <div className='inner'>
                            <a href=' ' className='btn green' onClick={save}>Save</a>
                            <a href=' ' className='btn red' onClick={remove}>Delete</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}