import { useEffect, useState } from 'react';
import { AppState } from './model/model';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { incrementCounter } from './state/actions/counterActions';

const App = (props: any) => {
  const [result, setResult] = useState(props.counter);

  useEffect(() => {
    console.log('App rendered!');
  }, []);

  const handleIncrement = () => {
    
  }

  return (
    <>
      <p>Hello</p>
      <p>Current counter: {result}</p>
      <button onClick={() => }>Increment counter</button>
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
