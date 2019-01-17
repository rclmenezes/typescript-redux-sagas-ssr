import * as csstips from "csstips";
import * as React from "react";
import { Container, Header, Message } from "semantic-ui-react";
import { style } from "typestyle";

import { PageRoutingProps } from "../../utils/routing";
import Status from "./Status";

interface Http500Props {
  routing: PageRoutingProps<{}>;
}

const Http500: React.SFC<Http500Props> = () => (
  <Status code={500}>
    <Container text>
      <Header as="h1" textAlign="center">
        Something went very wrong
      </Header>
      <Message className={style(csstips.horizontallyCenterChildren)}>
        <a href="/">Go home.</a>
      </Message>
    </Container>
  </Status>
);

export default Http500;
