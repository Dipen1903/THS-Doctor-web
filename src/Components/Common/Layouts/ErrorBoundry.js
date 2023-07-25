import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Icon } from "../../../Utilities/Icons";
import animationData from "../../../Assets/json/errorpage.json";
import Lottie from "react-lottie";
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    console.log("erorr , error=", error);
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      renderer: "svg",
    };
    if (this.state.errorInfo) {
      // Error path
      return (
        <div className="error-container">
          <div className="main flex-column justify-content-center align-items-center">
            <Lottie options={defaultOptions} />
          </div>
          <h1>Something went wrong.</h1>
          <a href="/doctor/dashboard">
            <Button className="table_next_btn">Go to home</Button>
          </a>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
