import {
  Paper,
  Avatar,
  makeStyles,
  Box,
  CircularProgress,
} from '@material-ui/core';

import Post from '../Post';
import PostInput from '../PostInput';
import { useFeedQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  marginRight: {
    marginRight: theme.spacing(2),
  },
}));

const Feed: React.FC = () => {
  const classes = useStyles();
  const { data: feedData, loading } = useFeedQuery();

  console.log('feed rerender');
  return (
    <Box>
      <Paper className={classes.paper}>
        <Avatar className={classes.marginRight} />
        <PostInput isFeed />
      </Paper>
      {loading ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress size={200} color="primary" />
        </Box>
      ) : (
        feedData?.feed.map((post) => <Post key={post.id} isFeed {...post} />) ||
        null
      )}
    </Box>
  );
};

export default Feed;
