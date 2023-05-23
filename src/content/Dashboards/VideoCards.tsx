import VideoCard from '@/components/cards';
import {
  Container, Grid,
} from '@mui/material';

const VideoCards = () => {
    return(
        <>
        <Container>
        <h1>Remaining Videos to Be Custimised</h1>
        <Grid container >
          <Grid item xl={3} md={4} sm={12}>
            <VideoCard
            imageUrl='https://designshack.net/wp-content/uploads/Free-Business-Video-YouTube-Thumbnail-Template.jpg'
              title="Amazing Video"
              likes={100}
              comments={50}
              views={1000}
              buttonLink="/customiser-tool"
            />
          </Grid>
        </Grid>
      </Container>
        </>
    )
}

export default VideoCards;