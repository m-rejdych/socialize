import { Box } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import Auth from './pages/Auth';

const App = () => {
  return (
    <Box minHeight="100vh">
      <Switch>
        <Route path="/register" component={Auth} />
        <Route path="/login" component={Auth} />
        <Route exact path="/" component={Landing} />
      </Switch>
    </Box>
  );
};

export default App;
