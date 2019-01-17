import React from "react";
import { Container, Header } from "semantic-ui-react";

interface BaseAuthPageProps {
  title: string;
}

const BaseAuthPage: React.SFC<BaseAuthPageProps> = ({ title, children }) => (
  <Container text>
    <Header as="h1" textAlign="center">
      {title}
    </Header>
    {children}
  </Container>
);

export default BaseAuthPage;
