import React, { createContext, useState, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  displayName: string;
}

interface UserSchema extends User {
  addUser: Function;
  setUserNull: Function;
}

export const UserContext = createContext<UserSchema>({
  id: '',
  email: '',
  displayName: '',
  addUser: () => {},
  setUserNull: () => {},
});

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({
    id: '',
    email: '',
    displayName: '',
  });
  const { id, email, displayName } = user;
  const addUser = useCallback((userInfo: User) => {
    const {
      id: uid,
      email: userEmail,
      displayName: UserdisplayName,
    } = userInfo;
    setUser({
      id: uid,
      email: userEmail,
      displayName: UserdisplayName,
    });
  }, [])

  const setUserNull = useCallback(() => {
    setUser({
      id: '',
      email: '',
      displayName: '',
    })
  }, [])
  return (
    <UserContext.Provider
      value={{
        id,
        email,
        displayName,
        addUser,
        setUserNull,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
