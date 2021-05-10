import { useState, createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [maxReachedModal, setMaxReachedModal] = useState(false); //turns true when user adds 5th nominee
  const [inView, setInView] = useState("MoviesBox"); //screen that is currently in view on mobile layout
  const [inputFocused, setInputFocused] = useState(false); //"search movie" text input focus
  const [showMovies, setShowMovies] = useState(false); //open movies box on search
  const [badgeShown, setBadgeShown] = useState(false); //badge over nominees logo @ bottom bar on mobile view

  return (
    <UserContext.Provider
      value={{
        maxReachedModal,
        setMaxReachedModal,
        inView,
        setInView,
        inputFocused,
        setInputFocused,
        showMovies,
        setShowMovies,
        badgeShown,
        setBadgeShown,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
