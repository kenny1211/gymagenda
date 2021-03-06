import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  Collapse,
  NavLink,
  NavbarToggler
} from "reactstrap";
// connect helper from react redux connects us to redux store which gives us access to pieces of state we need
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  // based on auth we render login, nothing, or logout
  renderHeaderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <NavItem>
            <NavLink href="/auth/google">Login With Google</NavLink>
          </NavItem>
        );
      default:
        return (
          <>
            <NavItem>
              <NavLink>Welcome, {this.props.auth.name}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/api/logout">Logout</NavLink>
            </NavItem>
          </>
        );
    }
  }

  render() {
    console.log(this.props);
    return (
      <Navbar color="light" light expand="md">
        <h4>
          <Link
            style={{ color: "black" }}
            to={this.props.auth ? "/workouts" : "/"}
          >
            Gymagenda
          </Link>
        </h4>

        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {this.renderHeaderContent()}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

// what is returned from this function will be props to header
// we destructure auth from state and return it
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Header);
