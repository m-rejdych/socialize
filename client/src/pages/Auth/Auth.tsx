import { Card, CardHeader, Box } from '@material-ui/core';

const Auth: React.FC = () => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card elevation={3}>
        <CardHeader title="Register" />
      </Card>
    </Box>
  );
};

export default Auth;
