import { connect } from 'react-redux';
import { incrementCounter } from './state/actions/counterActions';

const App = () => {
  return (
    <>
      <p>Hello</p>
    </>
  );
}

export default connect(null, {incrementCounter})(App);
