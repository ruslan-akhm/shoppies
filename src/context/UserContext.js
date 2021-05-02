import { useState, createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [maxReachedModal, setMaxReachedModal] = useState(false);

  return (
    <UserContext.Provider
      value={{
        maxReachedModal,
        setMaxReachedModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
