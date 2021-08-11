import PropTypes from 'prop-types';
import '../../assets/css/Styles.css';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { NewItemForm } from '../forms/NewItemForm';
import { AlphabetPanel } from '../shared/AlphabetPanel';
import { SearchControl } from '../shared/SearchControl';
import { LoadingComponent } from '../shared/LoadingComponent';
import { ClientDetailsList } from './clients/ClientDetailsList';
import { fetchClients } from '../../state/actions/clients.actions';
import { Pagination, PaginationDefaultCongif } from '../shared/Pagination';

const ClientsTabContent = (props: any) => {
	const [currentPage, setCurrentPage] = useState(props.currentPage);
	const [dataPerPage, setDataPerPage] = useState(props.dataPerPage);

	const [searchTerm, setSearchTerm] = useState(props.searchTerm);
	const [searchLetter, setSearchLetter] = useState(props.searchLetter);
	
	const [toggleNewItem, setToggleNewItem] = useState(false);
	const [paginationOptions] = useState(PaginationDefaultCongif.perPageOptions);

	useEffect(() => {
		props.fetchClients(currentPage, dataPerPage, searchTerm, searchLetter);

		if (toggleNewItem)
			setToggleNewItem(!toggleNewItem);	

	}, [currentPage, dataPerPage, searchLetter, searchTerm]);

	const reset = () => {
		setCurrentPage(1);
		setDataPerPage(3);
	}

	const searchReset = () => {
		setSearchTerm('');
		reset();
	}

	const searchLetterReset = () => {
		setSearchLetter('');
		reset();
	}

	const searchByTerm = (searchTerm: string) => {
		setSearchTerm(searchTerm);
		setSearchLetter('');
		reset();
	}

	const searchByLetter = (letter: string) => {
		setSearchLetter(letter);
		reset();
	}

	const changeLimit = (dataPerPage: number) => {
		setDataPerPage(dataPerPage);
		setCurrentPage(PaginationDefaultCongif.page);
	}

	return (
		<section className='content'>
			<h2><i className='ico clients'></i>Clients</h2>
			<div className='grey-box-wrap reports'>
				<a href='#new-member' className='link new-member-popup' onClick={() => setToggleNewItem(!toggleNewItem)}>Create new client</a>
				<SearchControl name='search-client' search={searchByTerm} searchReset={searchReset} searchInProgress={() => setSearchLetter('')} />
			</div>

			{toggleNewItem && (<NewItemForm formType='client' handleToUpdate={() => console.log('update')} />)}

			<AlphabetPanel active={searchLetter} disabled='k' page={currentPage} perPage={dataPerPage}
				search={searchByLetter} searchReset={searchLetterReset} />

			{props.loading && <LoadingComponent />}
			
			{props.loaded &&
				<>
					<ClientDetailsList clients={props.clients} handleToUpdate={() => console.log('update')} />

					<Pagination activePage={currentPage} dataLength={props.total}
						perPage={dataPerPage} totalNumOfPages={props.numberOfPages}
						paginate={(pageNum: number) => setCurrentPage(pageNum)} 
						changeLimit={changeLimit}
						options={paginationOptions} />
				</>}
		</section>
	);
}

ClientsTabContent.propTypes = {
	fetchClients: PropTypes.func.isRequired,

	clients: PropTypes.array,
	loaded: PropTypes.bool,
	loading: PropTypes.bool,
	total: PropTypes.number,

	searchTerm: PropTypes.string,
	searchLetter: PropTypes.string,

	currentPage: PropTypes.number,
	dataPerPage: PropTypes.number,
	numberOfPages: PropTypes.number
}

const mapStateToProps = (state: any) => ({
	clients: state.clientReducer.dataState.data,
	loaded: state.clientReducer.dataState.loaded,
	loading: state.clientReducer.dataState.loading,
	total: state.clientReducer.dataState.total,

	searchTerm: state.clientReducer.searchState.term,
	searchLetter: state.clientReducer.searchState.letter,

	currentPage: state.clientReducer.pagingState.currentPage,
	dataPerPage: state.clientReducer.pagingState.dataPerPage,
	numberOfPages: state.clientReducer.pagingState.numberOfPages
});

export default connect(mapStateToProps, { fetchClients })(ClientsTabContent);