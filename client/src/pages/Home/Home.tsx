import { Grid, Box, CircularProgress } from '@material-ui/core';

import Feed from '../../components/Feed';
import { useUserQuery } from '../../generated/graphql';

const Home: React.FC = () => {
  const { loading } = useUserQuery();

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
        <Grid container>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Feed />
          </Grid>
          <Grid item xs={3} />
        </Grid>
      )}
    </Box>
  );
};

export default Home;
