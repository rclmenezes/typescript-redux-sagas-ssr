import * as csstips from "csstips";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Message } from "semantic-ui-react";
import { style } from "typestyle";

import { PageRoutingProps } from "../utils/routing";

interface HomeProps {
  routing: PageRoutingProps<{}>;
}

class Home extends React.Component<HomeProps> {
  render() {
    return (
      <Container text>
        <Header as="h1" textAlign="center">
          Home
        </Header>

        <Message className={style(csstips.horizontallyCenterChildren)}>
          <Link to="/apply">Loan Application</Link>
        </Message>
      </Container>
    );
  }
}

export default Home;
