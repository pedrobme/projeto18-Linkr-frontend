import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

const TopBar = () => {
  const [querys, setQuerys] = useState({});
  const [searchUsers, setSearcheUsers] = useState([]);

  function handleForm(e) {
    if (querys.length >= 3) {
      setSearcheUsers([]);

      e.preventDefault();
    }
    // console.log(e.target.name, e.target.value )
    setQuerys(e.target.value);
  }

  useEffect(() => {
    async function sendForm(e) {
      const body = { querys };

      try {
        const response = await axios.post(`http://localhost:4000/search`, body);
        setSearcheUsers(response.data);
      } catch ({ response }) {
        alert(response.data.message);
      }
    }
    sendForm();
  }, [querys]);
  function ResutUsers() {
    return searchUsers.map((user) => {
      console.log("TO NO TOPPPPP =>", user);
      return (
        <Link to={`/user/${user.id}`}>
          <UserFound>
            <UserFoundImg src={user.image} />
            <UserFoundName>{user.username}</UserFoundName>
          </UserFound>
        </Link>
      );
    });
  }

  return (
    <TopBarContainer>
      <TopBarTitle>linkr</TopBarTitle>
      <Search>
        <DebounceInput
          minLength={3}
          debounceTimeout={300}
          placeholder="Search for people"
          id="forName"
          onChange={handleForm}
          type="text"
          name="search"
          value={querys.value}
          required
        />

        <Result>
          <Value querysValue={querys}>
            <ResutUsers />
          </Value>
        </Result>
      </Search>
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

const Search = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 13;

  input {
    margin-top: 13px;
    height: 45px;
    width: 563px;
    left: 437px;
    top: 13px;
    border: none;
    border-radius: 8px;
    z-index: 2;

    ::placeholder {
      font-family: Lato;
      font-size: 19px;
      font-weight: 400;
      line-height: 23px;
      letter-spacing: 0em;
      text-align: left;
    }
  }
`;
const Result = styled.div`
  min-height: 20px;
  width: 567px;
  background: #e7e7e7;
  border-radius: 5px;
  position: absolute;
  z-index: 1;
  top: 12px;
`;
const Value = styled.div`
  margin-top: 25px;
  padding-top: 30px;
  margin-bottom: -10px;
  padding-bottom: 5px;
  padding-left: 3px;
  display: ${({ querysValue }) =>
    querysValue.length < 3 ? "none" : "inherit"};
`;
const UserFound = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 12px;
`;
const UserFoundName = styled.h1`
  padding-left: 15px;
  font-family: Lato;
  font-size: 19px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
`;
const UserFoundImg = styled.img`
  height: 39px;
  width: 39px;
  left: 454px;
  top: 72px;
  border-radius: 304px;
`;

const TopBarUserController = styled.div`
  background-color: yellow;

  width: 100px;
  height: 72px;
`;

export default TopBar;
