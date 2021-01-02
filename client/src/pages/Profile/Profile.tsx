import { useState } from 'react';
import {
  Box,
  Container,
  Avatar,
  makeStyles,
  CircularProgress,
  Typography,
  Grid,
  Paper,
  Divider,
  Button,
} from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';

import { useProfileQuery } from '../../generated/graphql';
import { userVar } from 'src/graphql/reactiveVariables/user';
import Post from '../../components/Post';
import PostInput from '../../components/PostInput';
import EditProfileDialog from '../../components/EditProfileDialog';

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
  cursorPointer: {
    cursor: 'pointer',
  },
}));

const Profile: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = useReactiveVar(userVar);
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useProfileQuery({ variables: { id } });

  if (data?.profile) {
    const {
      id: profileId,
      user: { firstName, fullName, email },
      posts,
      acceptedFriends,
      phoneNumber,
      country,
      city,
      relationship,
    } = data.profile;

    const isMe = user?.profile.id === profileId;

    const fields = [
      {
        label: 'Email',
        value: email,
      },
      {
        label: 'Phone number',
        value: phoneNumber,
      },
      {
        label: 'Country',
        value: country,
      },
      {
        label: 'City',
        value: city,
      },
      {
        label: 'Relationship',
        value: relationship,
      },
    ];

    const sortedPosts =
      posts && posts.length > 0
        ? [...posts].sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        : null;

    const goToProfile = (id: string): void => {
      history.push(`/profile/${id}`);
    };

    const toggleDialog = (): void => {
      setOpen((prev) => !prev);
    };

    const renderActions = (): JSX.Element => {
      if (user?.profile.acceptedFriends.some(({ id }) => id === profileId)) {
        return (
          <Button variant="contained" color="primary">
            Friend
          </Button>
        );
      }

      if (
        user?.profile.allFriends.some(({ id }) => id === profileId) &&
        !user?.profile.acceptedFriends.some(({ id }) => id === profileId)
      ) {
        return (
          <Button variant="contained" color="primary">
            Invited
          </Button>
        );
      }

      return (
        <Button variant="contained" color="primary">
          Invite
        </Button>
      );
    };

    return (
      <Container maxWidth="md">
        <Box minHeight="100vh" py={3}>
          <Box mb={2} display="flex" flexDirection="column" alignItems="center">
            <Avatar className={classes.avatar} />
            <Typography variant="h4" className={classes.fontBold}>
              {fullName}
            </Typography>
          </Box>
          {user?.profile.id === profileId || (
            <Box display="flex" justifyContent="center" pb={3}>
              {renderActions()}
            </Box>
          )}
          <Grid container spacing={3} justify="center">
            <Grid item xs={5}>
              <Box display="flex" justifyContent="space-between">
                <Typography
                  variant="h5"
                  gutterBottom
                  className={classes.fontBold}
                >
                  Info
                </Typography>
                {isMe && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={toggleDialog}
                  >
                    Edit info
                  </Button>
                )}
              </Box>
              <Box mb={4}>
                {fields.map(({ label, value }) => (
                  <Box key={label} mb={2}>
                    <Typography className={classes.fontBold}>
                      {label}
                    </Typography>
                    <Typography color={value ? 'textPrimary' : 'textSecondary'}>
                      {value || 'Unknown'}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Divider />
              {acceptedFriends ? (
                <Box mt={4}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={classes.fontBold}
                  >
                    Friends
                  </Typography>
                  <Box display="flex">
                    {acceptedFriends.map(({ id, user: { fullName } }) => (
                      <Box
                        key={id}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mr={2}
                        className={classes.cursorPointer}
                        onClick={(): void => goToProfile(id)}
                      >
                        <Avatar className={classes.marginBottom} />
                        <Typography className={classes.fontBold}>
                          {fullName}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ) : null}
            </Grid>
            <Grid item xs={7}>
              {user?.profile.id === id && (
                <Paper className={classes.paper}>
                  <Avatar className={classes.marginRight} />
                  <PostInput isProfile />
                </Paper>
              )}
              {sortedPosts?.map((post) => (
                <Post key={post.id} isProfile {...post} />
              )) || (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height={300}
                >
                  <Typography color="textSecondary" variant="h4">
                    {`${firstName} has no posts`}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
        <EditProfileDialog
          id={id}
          open={open}
          handleClose={toggleDialog}
          phoneNumber={phoneNumber}
          country={country}
          city={city}
          relationship={relationship}
        />
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
