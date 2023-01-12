import React, { createContext, useState } from "react";
const UserInfoContext = createContext();

function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [logoutVisibility, setLogoutVisibility] = useState(false);
  console.log("userInfo: ", userInfo);

  return (
    <UserInfoContext.Provider
      value={{ userInfo, setUserInfo, logoutVisibility, setLogoutVisibility }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}
export { UserInfoContext, UserInfoProvider };
