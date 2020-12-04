import { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';

import Landing from './pages/Landing';
import Auth from './pages/Auth';
import { userVar } from './graphql/reactiveVariables/user';

const App = () => {
  const user = useReactiveVar(userVar);

  useEffect(() => {
    const expiresIn = localStorage.getItem('expiresIn');
    const token = localStorage.getItem('token');
    if (Number(expiresIn) - Date.now() < 0) localStorage.clear();
    else if (token) {
    }
  }, []);
  console.log(user);

  const routes = user ? (
    <>
      <Route path="/home" />
      <Redirect to="/home" />
    </>
  ) : (
    <>
      <Route path="/register" component={Auth} />
      <Route path="/login" component={Auth} />
      <Route exact path="/" component={Landing} />
      <Redirect to="/" />
    </>
  );

  return (
    <Box minHeight="100vh">
      <Switch>{routes}</Switch>
    </Box>
  );
};

export default App;
