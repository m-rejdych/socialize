import { useRef, useEffect } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
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
    visibility: 'hidden',
  },
  womanImg: {
    position: 'relative',
    bottom: 144,
    left: 142,
    zIndex: 1,
  },
  link: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  hidden: {
    visibility: 'hidden',
  },
}));

const Landing: React.FC = () => {
  const classes = useStyles();
  const manRef = useRef<HTMLImageElement | null>(null);
  const womanRef = useRef<HTMLImageElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const man = manRef.current;
    const woman = womanRef.current;
    const main = mainRef.current;

    const tl = gsap.timeline();
    tl.set([man, woman, main], {
      autoAlpha: 0,
      duration: 0.5,
      ease: 'power1.out',
    });

    tl.fromTo(man, { y: '-=200' }, { autoAlpha: 1, y: '+=200' })
      .fromTo(woman, { y: '+=200' }, { autoAlpha: 1, y: '-=200' })
      .fromTo(main, { x: '-=50' }, { autoAlpha: 1, x: '+=50' });
  }, []);

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
          <div className={classes.hidden} ref={mainRef}>
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
          </div>
          <Box display="flex" mb={-17}>
            <img
              ref={womanRef}
              className={classNames(classes.img, classes.womanImg)}
              src={Woman}
              alt="woman"
            />
            <img ref={manRef} className={classes.img} src={Man} alt="Man" />
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
