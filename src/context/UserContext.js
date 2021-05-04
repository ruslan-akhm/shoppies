import { useState, createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [maxReachedModal, setMaxReachedModal] = useState(false);
  const [inView, setInView] = useState("MoviesBox");

  return (
    <UserContext.Provider
      value={{
        maxReachedModal,
        setMaxReachedModal,
        inView,
        setInView,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
