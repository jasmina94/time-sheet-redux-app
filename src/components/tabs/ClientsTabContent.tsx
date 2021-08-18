import '../../assets/css/Styles.css';
import { useState, useEffect } from 'react';
import { NewItemForm } from '../forms/NewItemForm';
import { AlphabetPanel } from '../shared/AlphabetPanel';
import { SearchControl } from '../shared/SearchControl';
import { LoadingComponent } from '../shared/LoadingComponent';
import { ClientDetailsList } from './clients/ClientDetailsList';
import { useAppDispatch, useAppSelector} from '../../state/hooks';
import { fetchClients } from '../../state/actions/clients.actions';
import { Pagination, PaginationDefaultCongif } from '../shared/Pagination';

export const ClientsTabContent = () => {
	const dispatch = useAppDispatch();

	const clients = useAppSelector(state => state.clientReducer.dataState.data);
	const loaded = useAppSelector(state => state.clientReducer.dataState.loaded);
	const loading = useAppSelector(state => state.clientReducer.dataState.loading);
	const totalData = useAppSelector(state => state.clientReducer.dataState.total);
	const totalNumOfPages = useAppSelector(state => state.clientReducer.pagingState.numberOfPages);

	const [currentPage, setCurrentPage] = useState(useAppSelector(state => state.clientReducer.pagingState.currentPage));
	const [dataPerPage, setDataPerPage] = useState(useAppSelector(state => state.clientReducer.pagingState.dataPerPage));

	const [searchTerm, setSearchTerm] = useState(useAppSelector(state => state.clientReducer.searchState.term));
	const [searchLetter, setSearchLetter] = useState(useAppSelector(state => state.clientReducer.searchState.letter));
	
	const [toggleNewItem, setToggleNewItem] = useState(false);
	const [paginationOptions] = useState(PaginationDefaultCongif.perPageOptions);

	useEffect(() => {
		dispatch(fetchClients(currentPage, dataPerPage, searchTerm, searchLetter));
	}, [currentPage, dataPerPage, searchLetter, searchTerm]);

	const reset = () => {
		setCurrentPage(PaginationDefaultCongif.page);
		setDataPerPage(PaginationDefaultCongif.limit);
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

	const handleClientUpdate = () => {
		setToggleNewItem(!toggleNewItem);
		dispatch(fetchClients(PaginationDefaultCongif.page, PaginationDefaultCongif.limit, '', ''));
	}

	return (
		<section className='content'>
			<h2><i className='ico clients'></i>Clients</h2>
			<div className='grey-box-wrap reports'>
				<a href='#new-member' className='link new-member-popup' onClick={() => setToggleNewItem(!toggleNewItem)}>Create new client</a>
				<SearchControl name='search-client' search={searchByTerm} searchReset={searchReset} searchInProgress={() => setSearchLetter('')} />
			</div>

			{toggleNewItem && (<NewItemForm formType='client' handleUpdate={handleClientUpdate}/>)}

			<AlphabetPanel active={searchLetter} disabled='k' page={currentPage} perPage={dataPerPage}
				search={searchByLetter} searchReset={searchLetterReset} />

			{loading && <LoadingComponent />}
			
			{loaded &&
				<>
					<ClientDetailsList clients={clients} />

					<Pagination activePage={currentPage} dataLength={totalData}
						perPage={dataPerPage} totalNumOfPages={totalNumOfPages}
						paginate={(pageNum: number) => setCurrentPage(pageNum)} 
						changeLimit={changeLimit}
						options={paginationOptions} />
				</>}
		</section>
	);
}