import * as csstips from "csstips";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";
import { style } from "typestyle";

import { UserState } from "../reducers/user";
import { PageRoutingProps } from "../utils/routing";

export interface NavbarProps {
  hideNavbar: true | undefined;
  hideLogin: true | undefined;
  logoutSubmit: () => void;
  routing: PageRoutingProps<any>;
  user: UserState;
}

class Navbar extends React.Component<NavbarProps> {
  logout = () => {
    this.props.logoutSubmit();
  };

  public render() {
    return (
      <Container className={this.props.hideNavbar && style(csstips.invisible)}>
        <Menu secondary>
          <Menu.Item>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Menu position="right" className={this.props.hideLogin && style(csstips.invisible)}>
            <Menu.Item>
              {this.props.user ? (
                <a onClick={this.logout}>Log Out</a>
              ) : (
                <Link to="/login">Log In</Link>
              )}
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>
    );
  }
}

export default Navbar;
