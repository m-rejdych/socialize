import { useEffect } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';

import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Home from './pages/Home';
import { userVar } from './graphql/reactiveVariables/user';
import { useUserLazyQuery } from './generated/graphql';

const App = () => {
  const user = useReactiveVar(userVar);
  const [getUser, { data, loading }] = useUserLazyQuery();

  useEffect(() => {
    const expiresIn = localStorage.getItem('expiresIn');
    const token = localStorage.getItem('token');
    if (Number(expiresIn) - Date.now() < 0) localStorage.clear();
    else if (token) {
      getUser();
    }
  }, []);

  if (!user && data?.user) {
    userVar(data.user);
  }

  const routes = user ? (
    <>
      <Route path="/home" component={Home} />
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
      <Switch>
        {loading ? (
          <Box
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress size={300} color="primary" />
          </Box>
        ) : (
          routes
        )}
      </Switch>
    </Box>
  );
};

export default App;
