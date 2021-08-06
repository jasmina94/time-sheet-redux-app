import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchClient } from './state/actions/clientsActions';

const App = (props: any) => {
  return (
    <>
      <p>App</p>
    </>
  );
}

App.propTypes = {
  fetchClients: PropTypes.func.isRequired
  currentPage: PropTypes.number,
  dataPerPage: PropTypes.number,
  numberOfPages: PropTypes.number,
  clients: PropTypes.array,
  dataLoaded: PropTypes.bool,
  searchLetter: PropTypes.string,
  searchTerm: PropTypes.string
}

const mapStateToProps = (state: any) => ({
  currentPage: state.clientsReducer.currentPage,
  dataPerPage: state.clientsReducer.dataPerPage,
  numberOfPages: state.clientsReducer.numberOfPages,
  clients: state.clientsReducer.data,
  dataLoaded: state.clientsReducer.dataLoaded,
  searchLetter: state.clientsReducer.searchLetter,
  searchTerm: state.clientsReducer.searchTerm
})

export default connect(mapStateToProps, {fetchClient})(App);
