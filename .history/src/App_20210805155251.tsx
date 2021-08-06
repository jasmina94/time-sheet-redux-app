import { useState } from 'react';
import { AppState } from './model/model';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { incrementCounter } from './state/actions/counterActions';

const App = () => {
  const [result, setResult] = useState();

  return (
    <>
      <p>Hello</p>
    </>
  );
}

App.propTypes = {
  incrementCounter: PropTypes.func.isRequired,
  counter: PropTypes.object
}

const mapStateToProps = (state: AppState) => ({
  counter: state.counterState.counter
})

export default connect(null, {incrementCounter})(App);
