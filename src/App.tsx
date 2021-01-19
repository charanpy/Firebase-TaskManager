import React, { useEffect, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { auth } from './firebase/firebase';
import { UserContext } from './Provider/User';

const App: React.FC = () => {
  const { addUser, id: uid1, email: username, setUserNull } = useContext(
    UserContext,
  );

  useEffect(() => {
    const authState = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const { displayName, email, uid: id } = userAuth;
        addUser({ id, email, displayName });
      }
    });
    return () => {
      authState();
      setUserNull();
    };
  }, [addUser, setUserNull]);

  return (
    <div className='App'>
      <Switch>
        <Route
          path='/login'
          render={() => (uid1 && username ? <Redirect to='/' /> : <Login />)}
        />
        <Route
          path='/register'
          render={() => (uid1 && username ? <Redirect to='/' /> : <Register />)}
        />

        <Route
          exact
          path='/'
          render={() =>
            uid1 && username ? <Home /> : <Redirect to='/login' />}
        />
      </Switch>
    </div>
  );
};

export default App;
