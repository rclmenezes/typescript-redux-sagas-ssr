import * as csstips from "csstips";
import * as React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Message } from "semantic-ui-react";
import { style } from "typestyle";

import { PageRoutingProps } from "../../utils/routing";
import Status from "./Status";

interface Http404Props {
  routing: PageRoutingProps<{}>;
}

const Http404: React.SFC<Http404Props> = () => (
  <Status code={404}>
    <Container text>
      <Header as="h1" textAlign="center">
        You look lost.
      </Header>
      <Message className={style(csstips.horizontallyCenterChildren)}>
        <Link to="/">Go here.</Link>
      </Message>
    </Container>
  </Status>
);

export default Http404;
