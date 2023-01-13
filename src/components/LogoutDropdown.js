import axios from "axios";
import { useContext } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserInfoContext } from "../userInfo";

const LogoutDropdown = () => {
  const { setLogoutVisibility, logoutVisibility, userInfo } =
    useContext(UserInfoContext);
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const closeDropdown = () => {
    setLogoutVisibility(false);
  };

  async function signOutUser() {
    try {
      const response = await axios.delete("http://localhost:5001/signout", {
        data: { token: authToken },
      });

      closeDropdown();
      localStorage.removeItem("authToken");

      navigate("/");
    } catch (err) {
      console.log("signOutUser error: ", err);
    }
  }

  const ref = useDetectClickOutside({ onTriggered: closeDropdown });
  return (
    <TopBarUserController ref={ref}>
      <IoIosArrowDown
        onClick={() => setLogoutVisibility(!logoutVisibility)}
        className="arrowIcon"
      ></IoIosArrowDown>
      <img
        src={userInfo.image}
        onClick={() => setLogoutVisibility(!logoutVisibility)}
      />
      <LogoutDiv logoutVisibility={logoutVisibility} onClick={signOutUser}>
        Logout
      </LogoutDiv>
    </TopBarUserController>
  );
};

const LogoutDiv = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  bottom: -80px;
  right: 0;

  width: 200px;
  height: 80px;

  background-color: #171717;
  border-radius: 0px 0px 20px 20px;

  color: #ffffff;

  font-weight: 700;
  font-size: 17px;

  display: ${(props) => (props.logoutVisibility ? "flex" : "none")};
`;

const TopBarUserController = styled.div`
  height: 72px;
  width: 90px;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  img {
    height: 50px;
    width: 50px;
    border-radius: 26.5px;
  }

  .arrowIcon {
    font-size: 30px;
    height: 50px;
    color: #ffffff;
  }
`;

export default LogoutDropdown;
