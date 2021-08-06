import { connect } from "react-redux";

const App = () => {
  return (
    <>
      <p>Hello</p>
    </>
  );
}

export default connect(null, {incrementCounter})(App);
