import React from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import styled from "styled-components";
import QADocumentation from "../components/QADocumentation";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const DocumentationContainer = styled.div`
  width: 1024px;
  margin-top: 64px;
`;

const DocumentationPage = () => {
  return (
    <PageContainer>
      <Menu />
      <Wrapper>
        <DocumentationContainer>
          <QADocumentation />
        </DocumentationContainer>
      </Wrapper>
      <Footer />
    </PageContainer>
  );
};

export default DocumentationPage;
