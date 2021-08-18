import { useState, useMemo } from 'react';
import countryList from 'react-select-country-list';
import { useAppSelector, useAppDispatch } from '../../../state/hooks';
import { validateClient } from '../../../services/validation.service';
import { updateClient, deleteClient, fetchClients } from '../../../state/actions/clients.actions';

export const ClientDetails = (props: any) => {
    const dispatch = useAppDispatch();
    const countries = useMemo(() => countryList().getData(), []);
    const currentPage = useAppSelector(state => state.clientReducer.pagingState.currentPage);
    const dataPerPage = useAppSelector(state => state.clientReducer.pagingState.dataPerPage);

    const [showDetails, setShowDetails] = useState(false);
    const [error, setError] = useState('');
    const [details, setDetails] = useState({
        id: props.client.id,
        name: props.client.name,
        address: props.client.address,
        city: props.client.city,
        zip: props.client.zip,
        country: props.client.country,
    });

    const successfulUpdateCallback = () => {
        setShowDetails(false);
        dispatch(fetchClients(currentPage, dataPerPage, '', ''));
    }

    const save = (e: any) => {
        e.preventDefault();
        const client = {
            id: details.id,
            name: details.name,
            address: details.address,
            city: details.city,
            zip: details.zip,
            country: details.country
        }
        const validationResult = validateClient(client);
        if (validationResult.isValid) {
            dispatch(updateClient(client, successfulUpdateCallback));
        } else {
            setError(validationResult.error);
        }
    }

    const remove = (e: any) => {
        e.preventDefault();
        dispatch(deleteClient(details.id));
    }

    const renderCountryOptions = (): any[] => {
        let options: any[] = [];
        countries.forEach((item: any) => {
            options.push(
                <option key={item.value} value={item.value}>{item.label}</option>
            );
        });

        return options;
    }

    return (
        <div className='item'>
            <div className='heading' onClick={() => setShowDetails(!showDetails)}>
                <span>{props.client.name}</span>
                <i>+</i>
            </div>
            {showDetails && (
                <div className='details'>
                    <ul className='form'>
                        <li>
                            <label>Client name:</label>
                            <input type='text' name='name' className='in-text' value={details.name} onChange={(e) => { setDetails({ ...details, name: e.target.value }) }} />
                        </li>
                        <li>
                            <label>Zip/Postal code:</label>
                            <input type='text' name='zip' className='in-text' value={details.zip} onChange={(e) => { setDetails({ ...details, zip: e.target.value }) }} />
                        </li>
                    </ul>
                    <ul className='form'>
                        <li>
                            <label>Address:</label>
                            <input type='text' name='address' className='in-text' value={details.address} onChange={(e) => { setDetails({ ...details, address: e.target.value }) }} />
                        </li>
                        <li>
                            <label>Country:</label>
                            <select name='country' value={details.country} onChange={(e) => { setDetails({ ...details, country: e.target.value }) }}>
                                <option key='#'>Select country</option>
                                {renderCountryOptions()}
                            </select>
                        </li>
                    </ul>
                    <ul className='form last'>
                        <li>
                            <label>City:</label>
                            <input type='text' name='city' className='in-text' value={details.city} onChange={(e) => { setDetails({ ...details, city: e.target.value }) }} />
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
};