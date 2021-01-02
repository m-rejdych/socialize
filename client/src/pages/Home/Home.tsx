import { useState } from 'react';
import { Grid, Box, CircularProgress } from '@material-ui/core';

import Feed from '../../components/Feed';
import Dashboard from '../../components/Dashboard';
import Messages from '../../components/Messages';
import Search from '../../components/Search';
import { useUserQuery } from '../../generated/graphql';

const Home: React.FC = () => {
  const [homeActive, setHomeActive] = useState(true);
  const [messagesActive, setMessagesActive] = useState(false);
  const [articlesActive, setArticlesActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const { loading } = useUserQuery();

  const renderContent = (): JSX.Element | null => {
    if (homeActive) return <Feed />;
    if (messagesActive) return <Messages />;
    if (searchActive) return <Search />;
    return null;
  };

  return (
    <Box minHeight="100vh" p={3}>
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
        <Grid container spacing={3} justify="center">
          <Grid item xs={2}>
            <Dashboard
              homeActive={homeActive}
              messagesActive={messagesActive}
              articlesActive={articlesActive}
              searchActive={searchActive}
              setHomeActive={setHomeActive}
              setMessagesActive={setMessagesActive}
              setArticlesActive={setArticlesActive}
              setSearchActive={setSearchActive}
            />
          </Grid>
          <Grid item xs={6}>
            {renderContent()}
          </Grid>
          <Grid item xs={2} />
        </Grid>
      )}
    </Box>
  );
};

export default Home;
