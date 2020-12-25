import {
  Box,
  Container,
  Avatar,
  makeStyles,
  CircularProgress,
  Typography,
  Grid,
  Paper,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';

import { useProfileQuery } from '../../generated/graphql';
import Post from '../../components/Post';
import PostInput from '../../components/PostInput';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 200,
    height: 200,
    marginBottom: theme.spacing(2),
  },
  fontBold: {
    fontWeight: 600,
  },
  marginBottom: {
    marginBottom: theme.spacing(1),
  },
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

const Profile: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useProfileQuery({ variables: { id } });

  if (data?.profile) {
    const {
      user: { fullName, email },
      posts,
    } = data.profile;

    const fields = [
      {
        label: 'Email',
        value: email,
      },
      {
        label: 'Phone number',
        value: 23424234,
      },
      {
        label: 'Country',
        value: 'Poland',
      },
      {
        label: 'City',
        value: 'Cracow',
      },
      {
        label: 'Relationship',
        value: 'Single',
      },
    ];

    const sortedPosts = posts
      ? [...posts].sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
      : [];

    return (
      <Container maxWidth="md">
        <Box minHeight="100vh" py={3}>
          <Box mb={5} display="flex" flexDirection="column" alignItems="center">
            <Avatar className={classes.avatar} />
            <Typography variant="h4" className={classes.fontBold}>
              {fullName}
            </Typography>
          </Box>
          <Grid container spacing={3} justify="center">
            <Grid item xs={5}>
              {fields.map(({ label, value }) => (
                <Box key={label} mb={2}>
                  <Typography className={classes.fontBold}>{label}</Typography>
                  <Typography>{value}</Typography>
                </Box>
              ))}
            </Grid>
            <Grid item xs={7}>
              <Paper className={classes.paper}>
                <Avatar className={classes.marginRight} />
                <PostInput isProfile />
              </Paper>
              {sortedPosts.map((post) => (
                <Post key={post.id} isProfile {...post} />
              ))}
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }

  return loading ? (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress color="primary" size={300} />
    </Box>
  ) : null;
};

export default Profile;
