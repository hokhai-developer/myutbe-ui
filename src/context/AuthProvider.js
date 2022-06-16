import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Config';
import Loading from '../components/Loading';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const customUser = (data) => {
    if (user && !user.displayName && !user.photoURL) {
      setUser({
        ...user,
        displayName: data.displayName,
        photoURL: data.photoURL,
      });
    }
  };
  useEffect(() => {
    const islognIn = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase && auth.currentUser) {
        const currentUser = auth.currentUser;
        const { email, uid, displayName, photoURL } = currentUser;

        setUser({ email, uid, displayName, photoURL });
      }
      setIsLoading(false);
    });

    return () => {
      islognIn();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user: user, setUser: customUser }}>
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
