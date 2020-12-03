import {
  Card,
  CardHeader,
  Box,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';

import AuthForm from '../../components/AuthForm';

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
    overflow: 'visible',
  },
  link: {
    position: 'absolute',
    top: `calc(100% + ${theme.spacing(1)}px)`,
    left: theme.spacing(2),
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const Auth: React.FC = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();

  const isLoggingIn = pathname === '/login';

  const switchLoginMode = (): void => {
    history.push(isLoggingIn ? '/register' : '/login');
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card elevation={3} className={classes.card}>
        <CardHeader title={isLoggingIn ? 'Login' : 'Register'} />
        <AuthForm />
        <Typography
          className={classes.link}
          variant="caption"
          onClick={switchLoginMode}
        >
          {isLoggingIn
            ? "Don't have an account? Register!"
            : 'Already have an account? Login!'}
        </Typography>
      </Card>
    </Box>
  );
};

export default Auth;
