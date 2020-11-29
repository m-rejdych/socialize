import classNames from 'classnames';
import {
  Box,
  Typography,
  makeStyles,
  Button,
  Container,
} from '@material-ui/core';
import { ReactComponent as DotsSvg } from '../../../assets/Dots.svg';

import { ReactComponent as DividerBigFirst } from '../../../assets/Divider-big-1.svg';

import Woman from '../../../assets/Woman.jpg';

import Man from '../../../assets/Man.jpg';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    position: 'relative',
  },
  marginRight: {
    marginRight: theme.spacing(3),
  },
  marginTopBig: {
    marginTop: theme.spacing(7),
  },
  fontMedium: {
    fontWeight: 500,
  },
  title: {
    fontSize: 96,
    fontWeight: 600,
  },
  transformYCenter: {
    transform: 'translateY(-50%)',
  },
  img: {
    width: 370,
    height: 550,
  },
  womanImg: {
    position: 'relative',
    bottom: 144,
    left: 142,
  },
  link: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const Landing: React.FC = () => {
  const classes = useStyles();

  return (
    <Box height="100vh" position="relative">
      <Container className={classes.container}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pt={8}
        >
          <DotsSvg />
          <Box display="flex">
            <Typography
              className={classNames(classes.marginRight, classes.link)}
              variant="h5"
            >
              Register
            </Typography>
            <Typography variant="h5" className={classes.link}>
              Login
            </Typography>
          </Box>
        </Box>
        <Box
          position="absolute"
          top="50%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          className={classes.transformYCenter}
        >
          <Box>
            <Typography className={classes.title}>SOCIALIZE</Typography>
            <Typography variant="h4">One place</Typography>
            <Typography variant="h4">for you and your friends</Typography>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={classes.marginTopBig}
            >
              REGISTER
            </Button>
          </Box>
          <Box display="flex" mb={-17}>
            <img
              className={classNames(classes.img, classes.womanImg)}
              src={Woman}
              alt="woman"
            />
            <img className={classes.img} src={Man} alt="Man" />
          </Box>
        </Box>
      </Container>
      <Box clone position="absolute" right={0} bottom={0} zIndex={-1}>
        <DividerBigFirst />
      </Box>
    </Box>
  );
};

export default Landing;
