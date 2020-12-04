import {
  CardContent,
  CardActions,
  Button,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';

import InputElement from '../InputElement';
import {
  useRegisterMutation,
  useLoginMutation,
  RegisterInput,
  LoginInput,
} from '../../generated/graphql';
import { userVar } from '../../graphql/reactiveVariables/user';

const useStyles = makeStyles((theme) => ({
  cardContent: {
    width: 500,
  },
  buttonMinWidth: {
    minWidth: 97,
  },
}));

const AuthForm: React.FC = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const [login, { loading: loginLoading }] = useLoginMutation();
  const [register, { loading: registerLoading }] = useRegisterMutation();

  const isLoggingIn = pathname === '/login';

  const initialValues = isLoggingIn
    ? {
        email: '',
        password: '',
      }
    : {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      };

  const fields = [
    {
      name: 'email',
      type: 'email',
      label: 'Email address',
      validate: (value: string): string | undefined => {
        let errorMessage;

        if (
          !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value,
          )
        ) {
          errorMessage = 'Enter a valid email!';
        }

        return errorMessage;
      },
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      validate: (value: string): string | undefined => {
        let errorMessage;

        if (!/^(?=.*\d).{4,8}$/.test(value)) {
          errorMessage =
            'Password must be 4 to 8 characters long and contain at least one digit!';
        }

        return errorMessage;
      },
    },
    {
      name: 'firstName',
      type: 'text',
      label: 'First name',
      hidden: isLoggingIn,
      validate: (value: string): string | undefined => {
        let errorMessage;

        if (!value.trim().length) {
          errorMessage = 'First name can not be empty!';
        }

        return errorMessage;
      },
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last name',
      hidden: isLoggingIn,
      validate: (value: string): string | undefined => {
        let errorMessage;

        if (!value.trim().length) {
          errorMessage = 'Last name can not be empty!';
        }

        return errorMessage;
      },
    },
  ];

  const handleSubmit = async (
    values: LoginInput | RegisterInput,
  ): Promise<void> => {
    if (isLoggingIn) {
      const response = await login({
        variables: { data: values as LoginInput },
      });
      if (response.data) {
        const { user, token } = response.data.login;
        localStorage.setItem('token', token);
        localStorage.setItem('expiresIn', (Date.now() + 3600000).toString());
        userVar(user);
        console.log(user, token);
      }
    } else {
      const response = await register({
        variables: { data: values as RegisterInput },
      });
      if (response.data) {
        const { user, token } = response.data.register;
        localStorage.setItem('token', token);
        localStorage.setItem('expiresIn', (Date.now() + 3600000).toString());
        userVar(user);
        console.log(user, token);
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty }) => (
        <Form>
          <CardContent className={classes.cardContent}>
            {fields
              .filter(({ hidden }) => !hidden)
              .map((field) => (
                <InputElement key={field.name} {...field} />
              ))}
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              disabled={!isValid || !dirty}
              color="secondary"
              variant="contained"
              className={classes.buttonMinWidth}
            >
              {registerLoading || loginLoading ? (
                <CircularProgress size={24} color="primary" />
              ) : isLoggingIn ? (
                'LOGIN'
              ) : (
                'REGISTER'
              )}
            </Button>
          </CardActions>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
