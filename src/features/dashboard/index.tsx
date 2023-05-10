import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { ChatBubble, ChatRounded, PeopleAlt } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StatisticItem from './components/StatisticItem';
import StatisticFilter from './components/StatisticFilter';
import SlowApiList from './components/SlowApiList';
import BarChart from './components/charts/barChart';
import PieChart from './components/charts/pieChart';
import { useTranslation } from 'react-i18next';
import Widget from './components/Widget';
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
} from './dashboardSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(5),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function Dashboard() {
  const {t} = useTranslation()
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);

  const classes = useStyles();

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      nội dung các hoạt động
      {/* {loading && <LinearProgress className={classes.loading} />}
      <Box mt={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <StatisticFilter />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="male"
            value={statistics.maleCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChatRounded fontSize="large" color="primary" />}
            label="female"
            value={statistics.femaleCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChatBubble fontSize="large" color="primary" />}
            label="mark >= 8"
            value={statistics.highMarkCount}
          />
        </Grid>
      </Grid>
      <Box className={classes.root} mt={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={8}>
            <BarChart/>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <PieChart/>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.root} mt={5}>
        <Typography variant="h4">{t('Slow API stats')}</Typography>
        <Box mt={2}>
          <Grid container>
            <Grid item xs={12} md={12} lg={12}>
              <Widget title={t('List of APIs')}>
                <SlowApiList apiList={[]} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box> */}
    </Box>
  );
}
