import { Button, Card, CardContent, Typography } from '@mui/material';

interface VideoCardProps {
  imageUrl: string;
  title: string;
  likes: number;
  comments: number;
  views: number;
  buttonLink: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ imageUrl,title, likes, comments, views, buttonLink }) => {
  return (
    <Card>
            <img
        src={imageUrl}
        alt="Video Thumbnail"
        width={300}
        height={200}
      />
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Likes: {likes}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Comments: {comments}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Views: {views}
        </Typography>
      </CardContent>
      <Button href={buttonLink} variant="contained">Custimised</Button>
    </Card>
  );
};

export default VideoCard;
