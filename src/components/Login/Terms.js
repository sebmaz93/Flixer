import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Terms.css";
import osdeLogo from "../../assets/osdeLogo.png";

class Terms extends Component {

  constructor(props){
    super(props);
    this.state = {
      scrolled: false,
      accepted: false
    }
  }

  isScrolled = () => {
    let scrollableContent =  this.refs.scrollableContent;
    let sum = (scrollableContent.scrollTop + scrollableContent.offsetHeight)
    sum >= scrollableContent.scrollHeight ?
      this.setState({scrolled: true})
    : ''
  }

  acceptTerms = () => {
    this.setState({accepted: !this.state.accepted})
  }

  render() {
    return (
      <div>
        <div styleName="background overlay" />
        <div styleName="card">
          <div styleName="insideCard">
            <h3 styleName="title">Bases y condiciones</h3>
            <div styleName="content" ref='scrollableContent' onScroll={() => {this.isScrolled()}}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,  sed do
                eiusmod tempor incididunt ut labore et dolore  magnaaliqua. Lorem
                ipsum dolor sit amet, consectetur  adipiscing elit, sed do eiusmod
                tempor incididunt  ut labore et dolore magna aliqua.<br />
                <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                 sed do eiusmod tempor incididunt ut labore et dolore
                 magnaaliqua. Lorem ipsum dolor sit amet, consectetur  adipiscing
                elit, sed do eiusmod tempor incididunt  ut labore et dolore magna
                aliqua.<br />
                <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                 sed do eiusmod tempor incididunt ut labore et dolore
                 magnaaliqua. Lorem ipsum dolor sit amet, consectetur  adipiscing
                elit, sed do eiusmod tempor incididunt  ut labore et dolore magna
                aliqua.<br />
                <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                 sed do eiusmod tempor incididunt ut labore et dolore
                 magnaaliqua. Lorem ipsum dolor sit amet, consectetur  adipiscing
                elit, sed do eiusmod tempor incididunt  ut labore et dolore magna
                aliqua.
              </p>
            </div>
            <div styleName={this.state.scrolled ? 'accept-box' : ' accept-box disabled-check' }>
              <input styleName='accept-check' type='checkbox' id='accept' onChange={() => {this.acceptTerms()}}/>
              <label styleName='accept-label'>Aceptar</label>
            </div>
            <Link to='/dashboard' styleName={this.state.accepted ? 'accept' : ' accept disabled' } >
              Comenzar
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Terms;
