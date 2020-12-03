import {
  CardContent,
  CardActions,
  Button,
  makeStyles,
} from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';

import InputElement from '../InputElement';

const useStyles = makeStyles((theme) => ({
  cardContent: {
    width: 500,
  },
}));

const AuthForm: React.FC = () => {
  const classes = useStyles();
  const { pathname } = useLocation();

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

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={() => {}}
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
              disabled={!isValid || !dirty}
              color="secondary"
              variant="contained"
            >
              {isLoggingIn ? 'LOGIN' : 'REGISTER'}
            </Button>
          </CardActions>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
