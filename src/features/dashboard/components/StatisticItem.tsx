import * as React from 'react';
import { Box, Paper, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

export interface StatisticItemProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
}

export default function StatisticItem({ icon, label, value }: StatisticItemProps) {
  const {t} = useTranslation()
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Typography variant="h6" gutterBottom>
            {t('Total APIs')}
        </Typography>
        <Typography variant="h4" gutterBottom>
          {value}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}
