import { Api } from 'models';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import api_avatar_default from '../../../assets/images_default_icons/api_avatar_default.png'
import Chip from '@mui/material/Chip';
import { Link } from 'react-router-dom';

export interface ApiListProps {
  apiList: Api[];
  // onEdit?: (student: Api) => void;
  onRemove?: (student: Api) => void;
}
export default function ApiListData({
  apiList,
  // onEdit,
  onRemove,
}: ApiListProps) {
  return (
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        {apiList?.map((apiItem: Api, index: number) => (
          <Grid xs={2} sm={4} md={4} key={index}>
            <Link to={`/open-api/apis/show/${apiItem._id}`} style={{ textDecoration: 'none' }}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="img"
                  image={api_avatar_default}
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {apiItem?.name}
                  </Typography>
                  <Typography>
                  {apiItem?.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Chip label={apiItem?.lifecycleState} color="primary" />
                  <Chip label={apiItem?.version} color="primary" />
                </CardActions>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
  );
}
