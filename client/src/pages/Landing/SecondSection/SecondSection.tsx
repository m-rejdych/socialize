import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container, makeStyles, Box, Typography } from '@material-ui/core';

import { ReactComponent as DividerBigSecond } from '../../../assets/Divider-big-2.svg';
import { ReactComponent as DividerSmallFirst } from '../../../assets/Divider-small-1.svg';
import { ReactComponent as ProfileSvg } from '../../../assets/Profile.svg';

gsap.registerPlugin(ScrollTrigger);

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    position: 'relative',
  },
  watermark: {
    fontSize: 350,
    fontWeight: 500,
    letterSpacing: '15%',
    color: 'rgba(245, 0, 87, 0.05)',
    zIndex: -2,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  title: {
    paddingBottom: theme.spacing(1),
    fontWeight: 500,
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: theme.spacing(-1.5),
      top: theme.spacing(-1),
      height: '100%',
      width: 180,
      backgroundColor: theme.palette.secondary.main,
      zIndex: -1,
    },
  },
}));

const SecondSection: React.FC = () => {
  const classes = useStyles();
  const watermarkRef = useRef<HTMLSpanElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const watermark = watermarkRef.current;
    const text = textRef.current;
    const svg = svgRef.current;
    const container = containerRef.current as HTMLDivElement;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
      },
    });
    tl.set([watermark, text, svg], { autoAlpha: 0, ease: 'power1.out' });

    tl.fromTo(watermark, { x: '-=100' }, { autoAlpha: 1, x: '+=100' })
      .fromTo(text, { y: '+=100' }, { autoAlpha: 1, y: '-=100' })
      .fromTo(svg, { x: '+=100' }, { autoAlpha: 1, x: '-=100' });
  }, []);

  return (
    <Box position="relative" height="100vh" zIndex={-1}>
      <Container ref={containerRef} className={classes.container}>
        <Box
          position="absolute"
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          width="100%"
          left={0}
          bottom={120}
        >
          <div ref={textRef}>
            <Box pt={3}>
              <Typography variant="h3" className={classes.title}>
                Create unique profile
              </Typography>
              <Typography variant="h5">
                That you're gonna be proud of
              </Typography>
            </Box>
          </div>
          <ProfileSvg ref={svgRef} />
        </Box>
      </Container>
      <Box clone position="absolute" top={-1} right={0} zIndex={-1}>
        <DividerBigSecond />
      </Box>
      <Typography ref={watermarkRef} className={classes.watermark}>
        Profile
      </Typography>
      <Box clone position="absolute" left={0} bottom={-1} zIndex={-1}>
        <DividerSmallFirst />
      </Box>
    </Box>
  );
};

export default SecondSection;
