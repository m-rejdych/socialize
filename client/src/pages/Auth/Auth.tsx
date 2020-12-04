import {
  Card,
  CardHeader,
  Box,
  Typography,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useLocation, useHistory } from 'react-router-dom';

import AuthForm from '../../components/AuthForm';
import { ReactComponent as DividerSecond } from '../../assets/Divider-small-2.svg';
import { ReactComponent as DividerThird } from '../../assets/Divider-small-3.svg';

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
      position="relative"
    >
      <Card elevation={3} className={classes.card}>
        <CardHeader
          title={isLoggingIn ? 'Login' : 'Register'}
          action={
            <IconButton onClick={(): void => history.push('/')}>
              <ArrowBack />
            </IconButton>
          }
        />
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
      <Box clone position="absolute" top={-1} left={0} zIndex={-1}>
        <DividerSecond />
      </Box>
      <Box clone position="absolute" bottom={-1} right={0} zIndex={-1}>
        <DividerThird />
      </Box>
    </Box>
  );
};

export default Auth;
