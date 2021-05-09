import { useState, createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [maxReachedModal, setMaxReachedModal] = useState(false); //turns true when user adds 5th nominee
  const [inView, setInView] = useState("MoviesBox"); //screen that is currently in view on mobile layout
  const [inputFocused, setInputFocused] = useState(false);
  const [showMovies, setShowMovies] = useState(false);
  const [badgeShown, setBadgeShown] = useState(false);

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
