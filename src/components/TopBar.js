import styled from "styled-components";

const TopBar = () => {
  return (
    <TopBarContainer>
      <TopBarTitle>linkr</TopBarTitle>
      <TopBarUserController></TopBarUserController>
    </TopBarContainer>
  );
};

// Styled Components

const TopBarContainer = styled.div`
  width: 100vw;
  height: 72px;

  background-color: #151515;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;

  z-index: 10;

  padding-inline: 20px;
`;

const TopBarTitle = styled.h1`
  font-weight: 700;
  font-size: 49px;

  color: #ffffff;
`;

const TopBarUserController = styled.div`
  background-color: yellow;

  width: 100px;
  height: 72px;
`;

export default TopBar;
