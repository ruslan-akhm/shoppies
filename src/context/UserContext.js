import { useState, createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [maxReachedModal, setMaxReachedModal] = useState(false); //turns true when user adds 5th nominee
  const [inView, setInView] = useState("MoviesBox"); //screen that is in view on mobile layout

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
