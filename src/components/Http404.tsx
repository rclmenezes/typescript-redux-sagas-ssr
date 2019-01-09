import * as React from "react";
import { Link } from "react-router-dom";
// import { Container, Header, Message } from "semantic-ui-react";
// import { style } from "typestyle";

// import { headerStyle } from "../styles";
import Status from "./Status";

const Http404: React.SFC = () => (
  <Status code={404}>
    <h1>You look lost.</h1>
    <Link to="/">Go here.</Link>
    {/*<Container textAlign="center">
      <Header className={style(headerStyle)}>You look lost.</Header>
      <Message compact>
        <Link to="/">Go here.</Link>
      </Message>
    </Container>*/}
  </Status>
);

export default Http404;
