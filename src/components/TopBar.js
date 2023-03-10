import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LogoutDropdown from "./LogoutDropdown";

const TopBar = () => {
  const [querys, setQuerys] = useState({});
  const [searchUsers, setSearcheUsers] = useState([]);

  const navigate = useNavigate();

  function handleForm(e) {
    if (querys.length >= 3) {
      setSearcheUsers([]);

      e.preventDefault();
    }

    setQuerys(e.target.value);
  }

  useEffect(() => {
    async function sendForm(e) {
      const body = { querys };

      try {
        const response = await axios.post(`https://linker-api-4331.onrender.com/search`, body);
        setSearcheUsers(response.data);
        console.log(response.data);
      } catch ({ response }) {
        alert(response.data.message);
      }
    }
    sendForm();
  }, [querys]);

  function goToUser(userObj) {
    navigate(`/user/${userObj.id}`);
    setSearcheUsers([]);
    setQuerys({ value: "" });
  }

  function ResutUsers() {
    return searchUsers.map((user) => {
      console.log("TO NO TOPPPPP =>", user);

      return (
        <UserFound onClick={() => goToUser(user)}>
          <UserFoundImg src={user.image} />
          <UserFoundName>{user.username}</UserFoundName>
        </UserFound>
      );
    });
  }

  return (
    <TopBarContainer>
      <TopBarTitle onClick={() => navigate("/timeline")}>linkr</TopBarTitle>
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
      <LogoutDropdown></LogoutDropdown>
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

  cursor: pointer;

  color: #ffffff;
`;

const Search = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 13;

  width: 60%;

  input {
    height: 45px;
    width: 100%;
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
  width: 100%;
  background: #e7e7e7;
  border-radius: 5px;
  position: absolute;
  z-index: 1;
  top: 0px;
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
  cursor: pointer;
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

export default TopBar;
