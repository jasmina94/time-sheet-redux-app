import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { incrementCounter } from './state/actions/counterActions';

const App = (props: any) => {
  return (
    <>
      <p>Hello</p>
      <p>Current counter: {props.counter}</p>
      <button onClick={() => props.incrementCounter()}>Increment counter</button>
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
