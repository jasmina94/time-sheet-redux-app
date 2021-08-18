import '../../assets/css/Styles.css';
import { useState, useEffect } from 'react';
import { NewItemForm } from '../forms/NewItemForm';
import { AlphabetPanel } from '../shared/AlphabetPanel';
import { SearchControl } from '../shared/SearchControl';
import { LoadingComponent } from '../shared/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { ProjectDetailsList } from './projects/ProjectDetailsList';
import { fetchCustomers, fetchLeads, fetchProjects} from '../../state/actions/projects.actions';
import { Pagination, PaginationDefaultCongif } from '../shared/Pagination';

export const ProjectsTabContent = () => {
	const dispatch = useAppDispatch();

	const projects = useAppSelector(state => state.projectReducer.tabState.dataState.data);
	const loaded = useAppSelector(state => state.projectReducer.tabState.dataState.loaded);
	const loading = useAppSelector(state => state.projectReducer.tabState.dataState.loading);
	const totalData = useAppSelector(state => state.projectReducer.tabState.dataState.total);
	const totalNumOfPages = useAppSelector(state => state.projectReducer.tabState.pagingState.numberOfPages);
	
	const [currentPage, setCurrentPage] = useState(useAppSelector(state => state.projectReducer.tabState.pagingState.currentPage));
	const [dataPerPage, setDataPerPage] = useState(useAppSelector(state => state.projectReducer.tabState.pagingState.dataPerPage));

	const [searchTerm, setSearchTerm] = useState(useAppSelector(state => state.projectReducer.tabState.searchState.term));
	const [searchLetter, setSearchLetter] = useState(useAppSelector(state=> state.projectReducer.tabState.searchState.letter));

	const [toggleNewItem, setToggleNewItem] = useState(false);
	const [paginationOptions] = useState(PaginationDefaultCongif.perPageOptions);

	useEffect(() => {
		dispatch(fetchLeads());
		dispatch(fetchCustomers());
	}, [])

	useEffect(() => {
		dispatch(fetchProjects(currentPage, dataPerPage, searchTerm, searchLetter));

		if (toggleNewItem)
			setToggleNewItem(!toggleNewItem);

	}, [currentPage, dataPerPage, searchTerm, searchLetter])

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

	const handleProjectUpdate = () => {
		setToggleNewItem(!toggleNewItem);
		dispatch(fetchProjects(PaginationDefaultCongif.page, PaginationDefaultCongif.limit, '', ''));
	}

	return (
		<section className='content'>
			<h2><i className='ico projects'></i>Projects</h2>
			<div className='grey-box-wrap reports'>
				<a href='#new-member' className='link new-member-popup' onClick={() => setToggleNewItem(!toggleNewItem)}>Create new project</a>
				<SearchControl name='search-project' search={searchByTerm} searchReset={searchReset} searchInProgress={() => setSearchLetter('')} />
			</div>

			{toggleNewItem && (<NewItemForm formType='project' handleToUpdate={handleProjectUpdate} />)}

			<AlphabetPanel active={searchLetter} type='projects' page={currentPage} perPage={dataPerPage}
				search={searchByLetter} searchReset={searchLetterReset} />

			{loading && <LoadingComponent />}

			{loaded && 
				<>
					<ProjectDetailsList projects={projects} />

					<Pagination activePage={currentPage} dataLength={totalData}
						perPage={dataPerPage} totalNumOfPages={totalNumOfPages}
						paginate={(pageNum: number) => setCurrentPage(pageNum)} 
						changeLimit={changeLimit}
						options={paginationOptions} />
				</>}
		</section>
	);
}