import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useState, useMemo } from 'react';
import countryList from 'react-select-country-list';
import { updateClient, deleteClient } from '../../../state/actions/clients.actions';

const ClientDetails = (props: any) => {
    const  countries = useMemo(() => countryList().getData(), []);

    const [progress, setProgress] = useState(props.actionInProgess);
    const [error, setError] = useState(props.error);

    const [showDetails, setShowDetails] = useState(false);

    const [state, setState] = useState({
        id: props.client.id,
        name: props.client.name,
        address: props.client.address,
        city: props.client.city,
        zip: props.client.zip,
        country: props.client.country,
    });

    const toggleDetails = (e: any) => {
        e.preventDefault();
        setShowDetails(!showDetails);
    }

    const saveClient = (e: any) => {
        e.preventDefault();
        const client = {
            id: state.id,
            name: state.name,
            address: state.address,
            city: state.city,
            zip: state.zip, 
            country: state.country
        }
        props.updateClient(client);
    }

    const deleteClient = (e: any) => {
        e.preventDefault();
        props.deleteClient(state.id);
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
            <div className='heading' onClick={toggleDetails}>
                <span>{props.client.name}</span>
                <i>+</i>
            </div>
            {showDetails && (
                <div className='details'>
                    <ul className='form'>
                        <li>
                            <label>Client name:</label>
                            <input type='text' name='name' className='in-text' value={state.name} onChange={(e) => {setState({...state, name: e.target.value})}}/>
                        </li>
                        <li>
                            <label>Zip/Postal code:</label>
                            <input type='text' name='zip' className='in-text' value={state.zip} onChange={(e) => {setState({...state, zip: e.target.value})}}/>
                        </li>
                    </ul>
                    <ul className='form'>
                        <li>
                            <label>Address:</label>
                            <input type='text' name='address' className='in-text' value={state.address} onChange={(e) => {setState({...state, address: e.target.value})}}/>
                        </li>
                        <li>
                            <label>Country:</label>
                            <select name='country' value={state.country} onChange={(e) => {setState({...state, country: e.target.value})}}>
                                <option key='#'>Select country</option>
                                {renderCountryOptions()}
                            </select>
                        </li>
                    </ul>
                    <ul className='form last'>
                        <li>
                            <label>City:</label>
                            <input type='text' name='city' className='in-text' value={state.city} onChange={(e) => {setState({...state, city: e.target.value})}}/>
                        </li>
                    </ul>
                    
                    <label className='error-label'>{error}</label>

                    <div className='buttons'>
                        {props.actionInProgress && <p>...</p>}
                        <div className='inner'>
                            <a href=' ' className='btn green' onClick={saveClient}>Save</a>
                            <a href=' ' className='btn red' onClick={deleteClient}>Delete</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

ClientDetails.propTypes = {
    updateClient: PropTypes.func.isRequired,
    deleteClient: PropTypes.func.isRequired,

    client: PropTypes.object.isRequired,
    actionInProgress: PropTypes.bool
}

const mapStateToProps = (state: any) => ({
    actionInProgress: state.clientReducer.actionInProgress
});

export default connect(mapStateToProps, {updateClient, deleteClient})(ClientDetails);