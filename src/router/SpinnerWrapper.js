import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../components/Spinner/spinner";

class SpinnerWraper extends Component {
  componentDidMount() {
    // const comp = this.getWrappedInstance();
    if (this.ComponentRef && this.ComponentRef.initalizeData) {
      this.ComponentRef.initalizeData();
    }
  }
  render() {
    const { component: MyComponent, spinner, ...rest } = this.props;

    return spinner ? (
      <Spinner />
    ) : (
      <MyComponent
        {...rest}
        container="start"
        ref={r => {
          if (r && r.getWrappedInstance) {
            return (this.ComponentRef = r.getWrappedInstance());
          }
        }}
      />
    );
  }
}
const mapStateToProps = state => ({
  spinner: state.spinner
});
export default connect(mapStateToProps)(SpinnerWraper);
