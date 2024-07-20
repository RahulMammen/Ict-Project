import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, TextField, Paper } from '@mui/material';
import ConferenceList from './Components/ConferenceList';

const App = () => {
  const [conferences, setConferences] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/api/conferences')
      .then(response => setConferences(response.data))
      .catch(error => console.error(error));
  }, []);

  const addConference = () => {
    const newConference = { title, description };
    axios.post('http://localhost:4000/api/conferences', newConference)
      .then(response => setConferences([...conferences, response.data]))
      .catch(error => console.error(error));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Conference Management</Typography>
      <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
        <Box display="flex" flexDirection="column" gap="16px">
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={addConference}>Add Conference</Button>
        </Box>
      </Paper>
      <ConferenceList conferences={conferences} />
    </Container>
  );
};

export default App;
