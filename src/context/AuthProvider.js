import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Config';
import Loading from '../components/Loading';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const isLogIn = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, photoURL, email, uid } = user;
        setUser({
          displayName: displayName === null ? 'User-Name' : displayName,
          photoURL: photoURL === null ? 'https://picsum.photos/200' : photoURL,
          email,
          uid,
        });
      }

      setIsLoading(false);
    });
    return () => {
      isLogIn();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
