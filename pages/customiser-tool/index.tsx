import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SidebarLayout from '@/layouts/SidebarLayout';
import Head from 'next/head';

function CustomiserTool() {

  const [image, setImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'cs5qpigs');

      const response = await fetch(`https://api.cloudinary.com/v1_1/dooggwrub/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setImage(data.secure_url);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const offsetX = event.clientX - event.currentTarget.getBoundingClientRect().left;
    const offsetY = event.clientY - event.currentTarget.getBoundingClientRect().top;
    setPosition({ x: offsetX, y: offsetY });
  };

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.currentTarget.blur();
    }
  };

  const handleTextDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const editedImageUrl = await generateEditedImage();
    setEditedImage(editedImageUrl);
  };

  const handleEndSubmit = async () => {
    if (editedImage) {
      try {
        const formData = new FormData();
        formData.append('file', editedImage);
        formData.append('upload_preset', 'cs5qpigs');

        const response = await fetch(`https://api.cloudinary.com/v1_1/dooggwrub/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        const uploadedImageUrl = data.secure_url;
        console.log('Uploaded Image URL:', uploadedImageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const generateEditedImage = async (): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        reject('Canvas context is not supported');
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        context.drawImage(img, 0, 0);

        context.font = '30px Arial';
        context.fillStyle = 'white';
        context.fillText(text, position.x, position.y);

        try {
          const editedImageUrl = canvas.toDataURL();
          resolve(editedImageUrl);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = image || '';
    });
  };

  useEffect(() => {
    const handleKeyDownGlobal = (event: KeyboardEvent) => {
      const step = 10;
      if (event.key === 'ArrowUp') {
        setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y - step }));
      } else if (event.key === 'ArrowDown') {
        setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y + step }));
      } else if (event.key === 'ArrowLeft') {
        setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x - step }));
      } else if (event.key === 'ArrowRight') {
        setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x + step }));
      }
    };

    window.addEventListener('keydown', handleKeyDownGlobal);
    return () => {
      window.removeEventListener('keydown', handleKeyDownGlobal);
    };
  }, []);

  return (
    <>
    
    <Head>
        <title>YTcustumiser - Custumiser</title>
      </Head>
    <Container maxWidth="md">
      <Box mt={4}>
        <Paper>
          <Box p={2}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Box display="flex" justifyContent="center">
                  <Box
                    width={isMobile ? '100%' : 'auto'}
                    height={isMobile ? 'auto' : '500px'}
                    border="1px solid black"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    {image && (
                      <img
                        crossOrigin="anonymous"
                        src={image}
                        alt="Uploaded"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    )}
                    {text && (
                      <div
                        style={{
                          position: 'absolute',
                          left: position.x,
                          top: position.y,
                          pointerEvents: 'none',
                        }}
                        draggable
                        onDragStart={handleTextDragStart}
                      >
                        <textarea
                          ref={textareaRef}
                          value={text}
                          onChange={handleTextAreaChange}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <form onSubmit={handleFormSubmit}>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Input type="file" onChange={handleImageUpload} />
                    <Input
                      type="text"
                      placeholder="Enter Text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                  </Box>
                </form>
                {editedImage && (
                  <Box mt={2}>
                    <Typography variant="h6">Edited Image:</Typography>
                    <Box display="flex" justifyContent="center" alignItems="center">
                      <img src={editedImage} alt="Edited" style={{ maxWidth: '100%' }} />
                    </Box>
                    <Box display="flex" justifyContent="center" mt={2}>
                      <Button variant="contained" onClick={handleEndSubmit}>
                        End Submit
                      </Button>
                    </Box>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
    
    </>
  );
};

CustomiserTool.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default CustomiserTool;
