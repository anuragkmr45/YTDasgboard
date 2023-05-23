import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled
} from '@mui/material';

import List from "@/components/List"

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

function Hero() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={8} mx="auto">
          <LabelWrapper color="success">Version 1.0.0</LabelWrapper>
          <TypographyH1 sx={{ mb: 2 }} variant="h1">
            Real Time Automation Youtube Thumbnail Customiser
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
            Introducing the <b>Real Time Automation YouTube Thumbnail Customiser</b>, a cutting-edge tool crafted by <a href="http://progeeks.in/">ProGeeks</a>. This innovative solution revolutionizes the way YouTubers create captivating thumbnails for their videos. With real-time automation at its core, this tool empowers content creators to dynamically customize their thumbnails effortlessly.
          </TypographyH2>
          {/* <Button
            component={Link}
            href="/dashboards/tasks"
            size="large"
            variant="text"
          >
            Browse Our Services
          </Button> */}
          <Button
            sx={{ ml: 2 }}
            component="a"
            target="_blank"
            rel="noopener"
            href="https://progeeks.in/"
            size="large"
            variant="contained"
          >
            Browse Our Services
          </Button>
          <Box my={2}>
            <h1>Pricing 1</h1>
          <Grid container spacing={3} mt={5}>
            <Grid item md={4}>
                <h1>Price 1</h1>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Package name</b>
                </Box>
                <List />
              </Typography>
            </Grid>            
            <Grid item md={4}>
                <h1>Price 1</h1>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Package name</b>
                </Box>
                <List />
              </Typography>
            </Grid>            
            <Grid item md={4}>
                <h1>Price 1</h1>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Package name</b>
                </Box>
                <List />
              </Typography>
            </Grid>            
          </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
