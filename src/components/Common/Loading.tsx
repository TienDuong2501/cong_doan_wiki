import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import React from 'react';

export interface  LoadingProps {
    loading?: boolean | string
}

export function Loading({ loading }: LoadingProps) {
  return (
    <Box sx={{ width: '100%' }}>
      { loading && <LinearProgress /> }
    </Box>
  );
}
