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
  counter: state.counterReducer.counter
})

export default connect(mapStateToProps, {incrementCounter})(App);
