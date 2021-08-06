import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchClientsAction } from './state/actions/clientsActions';

const App = (props: any) => {
  return (
    <>
      <p>App</p>
    </>
  );
}

App.propTypes = {
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

export default connect(mapStateToProps, {incrementCounter})(App);
