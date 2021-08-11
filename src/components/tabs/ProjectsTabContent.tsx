import '../../assets/css/Styles.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { NewItemForm } from '../forms/NewItemForm';
import { AlphabetPanel } from '../shared/AlphabetPanel';
import { SearchControl } from '../shared/SearchControl';
import { LoadingComponent } from '../shared/LoadingComponent';
import { ProjectDetailsList } from './projects/ProjectDetailsList';
import { fetchProjects} from '../../state/actions/projects.actions';
import { Pagination, PaginationDefaultCongif } from '../shared/Pagination';

const ProjectsTabContent = (props: any) => {
	const [currentPage, setCurrentPage] = useState(props.currentPage);
	const [dataPerPage, setDataPerPage] = useState(props.dataPerPage);

	const [searchTerm, setSearchTerm] = useState(props.searchTerm);
	const [searchLetter, setSearchLetter] = useState(props.searchLetter);

	const [toggleNewItem, setToggleNewItem] = useState(false);
	const [paginationOptions] = useState(PaginationDefaultCongif.perPageOptions);

	useEffect(() => {
		props.fetchProjects(currentPage, dataPerPage, searchTerm, searchLetter);

		if (toggleNewItem)
			setToggleNewItem(!toggleNewItem);

	}, [currentPage, dataPerPage, searchTerm, searchLetter])

	console.log(props);

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
			<h2><i className='ico projects'></i>Projects</h2>
			<div className='grey-box-wrap reports'>
				<a href='#new-member' className='link new-member-popup' onClick={() => setToggleNewItem(!toggleNewItem)}>Create new project</a>
				<SearchControl name='search-project' search={searchByTerm} searchReset={searchReset} searchInProgress={() => setSearchLetter('')} />
			</div>

			{toggleNewItem && (<NewItemForm formType='project' handleToUpdate={() => console.log('update')} />)}

			<AlphabetPanel active={searchLetter} type='projects' page={currentPage} perPage={dataPerPage}
				search={searchByLetter} searchReset={searchLetterReset} />

			{props.loading && <LoadingComponent />}

			{props.loaded && 
				<>
					<ProjectDetailsList projects={props.projects} handleToUpdate={() => console.log('update')} />

					<Pagination activePage={currentPage} dataLength={props.total}
						perPage={dataPerPage} totalNumOfPages={props.numberOfPages}
						paginate={(pageNum: number) => setCurrentPage(pageNum)} 
						changeLimit={changeLimit}
						options={paginationOptions} />
				</>}
		</section>
	);
}

ProjectsTabContent.propTypes = {
	fetchProjects: PropTypes.func.isRequired,

	projects: PropTypes.array,
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
	projects: state.projectReducer.dataState.data,
	loaded: state.projectReducer.dataState.loaded,
	loading: state.projectReducer.dataState.loading,
	total: state.projectReducer.dataState.total,

	searchTerm: state.projectReducer.searchState.term,
	searchLetter: state.projectReducer.searchState.letter,

	currentPage: state.projectReducer.pagingState.currentPage,
	dataPerPage: state.projectReducer.pagingState.dataPerPage,
	numberOfPages: state.projectReducer.pagingState.numberOfPages
});

export default connect(mapStateToProps, { fetchProjects })(ProjectsTabContent);