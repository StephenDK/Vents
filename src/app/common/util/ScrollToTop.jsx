import { Component } from "react";
import { withRouter } from "react-router-dom";

// This component runs a lifeCycle method and is the props location
// does not equal the previous prop location it scroll page to top
class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }
    // What ever component we pass into this component will be returned
    render() {
        return this.props.children
    }
}

export default withRouter(ScrollToTop);

// Check index.js for how its used