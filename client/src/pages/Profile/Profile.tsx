import {
  Box,
  Container,
  Avatar,
  makeStyles,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';

import { useProfileQuery } from '../../generated/graphql';

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
}));

const Profile: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useProfileQuery({ variables: { id } });

  if (data?.profile) {
    const {
      user: { fullName, email },
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

    return (
      <Container maxWidth="sm">
        <Box minHeight="100vh" py={3}>
          <Box mb={5} display="flex" flexDirection="column" alignItems="center">
            <Avatar className={classes.avatar} />
            <Typography variant="h4" className={classes.fontBold}>
              {fullName}
            </Typography>
          </Box>
          {fields.map(({ label, value }) => (
            <Box mb={2}>
              <Typography className={classes.fontBold}>{label}</Typography>
              <Typography>{value}</Typography>
            </Box>
          ))}
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
