import React, { Component } from "react";
import DropdownMenu from "react-dd-menu";

export default class DDmenu extends Component {
  state = {
    isMenuOpen: false
  };

  toggle() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  close() {
    this.setState({ isMenuOpen: false });
  }

  click() {
    console.log("!!!");
  }

  render() {
    const menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close,
      toggle: (
        <button type="button" onClick={this.toggle}>
          Click me!
        </button>
      ),
      align: "right"
    };
    return (
      <DropdownMenu {...menuOptions}>
        <li>
          <a href="#">DD1</a>
        </li>
        <li>
          <button type="button" onClick={this.click}>
            DD2
          </button>
        </li>
      </DropdownMenu>
    );
  }
}
