import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { incrementCounter } from './state/actions/counterActions';

const App = (props: any) => {
  return (
    <>
      <p>App</p>
    </>
  );
}

App.propTypes = {
  incrementCounter: PropTypes.func.isRequired,
  counter: PropTypes.number
}

const mapStateToProps = (state: any) => ({
  clients: state.clientsReducer.currentPage,
  dataPerPage: state.clientsReducer.dataPerPage,
  numberOfPages: state.clientsReducer.numberOfPages,
  data: state.clientsReducer.data,
  dataLoaded: state.clientsReducer.dataLoaded,
  searchLetter: state.clientsReducer.searchLetter,
  searchTerm: state.clientsReducer.searchTerm
})

export default connect(mapStateToProps, {incrementCounter})(App);
