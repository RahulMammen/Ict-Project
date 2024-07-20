import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const ConferenceList = ({ conferences }) => {
  return (
    <Box display="flex" flexDirection="column" gap="16px">
      {conferences.map(conference => (
        <Paper key={conference._id} elevation={2} style={{ padding: '16px' }}>
          <Typography variant="h6">{conference.title}</Typography>
          <Typography variant="body1">{conference.description}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default ConferenceList;
