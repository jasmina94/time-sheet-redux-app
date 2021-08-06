import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { incrementCounter } from './state/actions/counterActions';

const App = (props: any) => {
  const [result, setResult] = useState(props.counter);

  useEffect(() => {
    console.log('App rendered!');
  }, []);

  const handleIncrement = () => {
    console.log('Button clicked!');
    props.incrementCounter();
    setResult(props.counter);
  }

  return (
    <>
      <p>Hello</p>
      <p>Current counter: {props.counter}</p>
      <button onClick={handleIncrement}>Increment counter</button>
    </>
  );
}

App.propTypes = {
  incrementCounter: PropTypes.func.isRequired,
  counter: PropTypes.object
}

const mapStateToProps = (state: any) => ({
  counter: state.counterReducer.counter
})

export default connect(mapStateToProps, {incrementCounter})(App);
