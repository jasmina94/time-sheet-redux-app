import { useState, useMemo } from 'react';
import { Client } from '../../../model/model';
import countryList from 'react-select-country-list';
import { validateClient } from '../../../services/validation.service';
import { createClient } from '../../../state/actions/clients.actions';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';

export const ClientForm = (props: any) => {
    const dispatch = useAppDispatch();
    const countries = useMemo(() => countryList().getData(), []);
    const [client, setClient] = useState(useAppSelector(state => state.clientReducer.newItem.item) as Client);
    const [error, setError] = useState(useAppSelector(state => state.clientReducer.newItem.error));

    const handleInputChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setError('');
        setClient({ ...client, [name]: value });
    }

    const handleSave = (e: any) => {
        e.preventDefault();
        const result = validateClient(client);
        if (result.isValid) {
            dispatch(createClient(client, props.handleSuccessResponse));
        } else {
            setError(result.error);
        }
    }

    const renderCountryOptions = (): any[] => {
        let options: any[] = [];
        countries.forEach(item => {
            options.push(
                <option value={item.value} key={item.value}>{item.label}</option>
            );
        });

        return options;
    }

    return (
        <>
            <h2>Create new client</h2>
            <ul className='form'>
                <li>
                    <label>Client name:</label>
                    <input type='text' name='name' className='in-text' value={client.name} onChange={handleInputChange} />
                </li>
                <li>
                    <label>Address:</label>
                    <input type='text' name='address' className='in-text' value={client.address} onChange={handleInputChange} />
                </li>
                <li>
                    <label>City:</label>
                    <input type='text' name='city' className='in-text' value={client.city} onChange={handleInputChange} />
                </li>
                <li>
                    <label>Zip/Postal code:</label>
                    <input type='text' name='zip' className='in-text' value={client.zip} onChange={handleInputChange} />
                </li>
                <li>
                    <label>Country:</label>
                    <select name='country' onChange={handleInputChange} value={client.country}>
                        <option key='#'>Select country</option>
                        {renderCountryOptions()}
                    </select>
                </li>
                <li className='error-label'>{error}</li>
            </ul>
            <div className='buttons'>
                <div className='inner'>
                    <a href=' ' className='btn green' onClick={handleSave}>Save</a>
                </div>
            </div>
        </>
    );
}