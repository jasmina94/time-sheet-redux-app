import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchClients } from './state/actions/clientsActions';
import { Client } from './model/model';

const List = ({ clients: [] }) => {

}

const App = (props: any) => {

  useEffect(() => {
    console.log('App - mounted');
    props.fetchClients();
    return () => console.log('App umnounting...');

  }, []);

  return (
    <>
      {props.dataLoaded &&
        props.data.map((client: Client) => {
          <p>{client.name}</p>
        })
      }

      {!props.dataLoaded &&
        <p>Data not loaded.</p>
      }

    </>
  );
}

App.propTypes = {
  fetchClients: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  dataPerPage: PropTypes.number,
  numberOfPages: PropTypes.number,
  data: PropTypes.array,
  dataLoaded: PropTypes.bool,
  searchLetter: PropTypes.string,
  searchTerm: PropTypes.string
}

const mapStateToProps = (state: any) => ({
  data: state.clientsReducer.data,
  dataLoaded: state.clientsReducer.dataLoaded,
  currentPage: state.clientsReducer.currentPage,
  dataPerPage: state.clientsReducer.dataPerPage,
  numberOfPages: state.clientsReducer.numberOfPages,
  searchLetter: state.clientsReducer.searchLetter,
  searchTerm: state.clientsReducer.searchTerm
})

export default connect(mapStateToProps, { fetchClients })(App);
