import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container, makeStyles, Box, Typography } from '@material-ui/core';

import { ReactComponent as DividerSmallSecond } from '../../../assets/Divider-small-2.svg';
import { ReactComponent as DividerSmallThird } from '../../../assets/Divider-small-3.svg';
import { ReactComponent as ChatSvg } from '../../../assets/Chat.svg';

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
      width: 135,
      backgroundColor: theme.palette.secondary.main,
      zIndex: -1,
    },
  },
}));

const ThirdSection: React.FC = () => {
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
      .fromTo(svg, { x: '-=100' }, { autoAlpha: 1, x: '+=100' });
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
          <ChatSvg ref={svgRef} />
          <div ref={textRef}>
            <Box pt={3}>
              <Typography variant="h3" className={classes.title}>
                Chat with your friends
              </Typography>
              <Typography variant="h5">So you are always in touch</Typography>
            </Box>
          </div>
        </Box>
      </Container>
      <Typography ref={watermarkRef} className={classes.watermark}>
        Chat
      </Typography>
      <Box clone position="absolute" left={0} top={-1} zIndex={-1}>
        <DividerSmallSecond />
      </Box>
      <Box clone position="absolute" right={0} bottom={-1} zIndex={-1}>
        <DividerSmallThird />
      </Box>
    </Box>
  );
};

export default ThirdSection;
