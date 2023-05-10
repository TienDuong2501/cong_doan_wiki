import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { Alert } from '@mui/lab';
import { InputField, RadioGroupField, SelectField } from 'components/FormFields';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { Link } from 'react-router-dom';
import { SignupPayload } from '../authSlice';
import React from 'react';
import { useForm } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Loading } from '../../../components/Common';
import '../pages/signup.scss';

import '../pages/signup.scss';

const useStyles = makeStyles((theme) => ({
  textLink: {
    textDecoration: 'none',
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: '1.43',
    letterSpacing: '0.01071em',
    color: '#1976d2',
  },
}));

export interface SignUpFormProps {
  onSubmit?: (formValues: SignupPayload) => void;
}

const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'The first name must be at least 2 characters.')
    .max(30, 'The first name may not be greater than 30 characters.')
    .required('Please enter first name.'),
  lastName: yup
    .string()
    .min(2, 'The last name must be at least 2 characters.')
    .max(30, 'The last name may not be greater than 30 characters.')
    .required('Please enter last name.'),
  email: yup
    .string()
    .min(6, 'The email must be at least 6 characters.')
    .max(100, 'The email may not be greater than 100 characters.')
    .required('Please enter email.'),
  username: yup
    .string()
    .min(2, 'The user name must be at least 2 characters.')
    .max(30, 'The user name may not be greater than 30 characters.')
    .required('Please enter user name.'),
  password: yup
    .string()
    .min(8, 'The password must be at least 8 characters.')
    .max(128, 'The password may not be greater than 128 characters.')
    .required('Please enter password.'),
  password_confirmation: yup
    .string()
    .min(8, 'The password_confirmation must be at least 8 characters.')
    .max(128, 'The password_confirmation may not be greater than 128 characters.')
    .required('Please enter password_confirmation.'),
});

// all the error responses
function checkError(error: any) {
  switch (error?.status) {
    case 422:
      return error?.data?.data?.errors;
    default:
      return null;
  }
}

export default function SignUpForm({ onSubmit }: SignUpFormProps) {
  const { t } = useTranslation();
  const classes = useStyles();
  const errors = useAppSelector((state) => state.auth.errors);
  const loading = useAppSelector((state) => state.auth.loading);
  const messerrors = checkError(errors);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupPayload>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: SignupPayload) => {
    if (loading) return;
    try {
      await onSubmit?.(formValues);
    } catch (error: any) {}
  };
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t('Sign Up')}
            </Typography>
            <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 1 }}>
              <InputField
                name="firstName"
                messageError={messerrors?.firstName}
                isError={messerrors?.firstName ? true : false}
                required
                control={control}
                label="First name"
              />
              <InputField
                name="lastName"
                messageError={messerrors?.lastName}
                isError={messerrors?.lastName ? true : false}
                required
                control={control}
                label="Last name"
              />
              <InputField
                name="email"
                messageError={messerrors?.email}
                isError={messerrors?.email ? true : false}
                required
                control={control}
                label="Email"
              />
              <InputField
                name="username"
                messageError={messerrors?.username}
                isError={messerrors?.username ? true : false}
                required
                control={control}
                label="User name"
              />
              <InputField
                name="password"
                messageError={messerrors?.password}
                isError={messerrors?.password ? true : false}
                type="password"
                id="password"
                autoComplete="password"
                required
                control={control}
                label="Password"
              />
              <InputField
                name="password_confirmation"
                messageError={messerrors?.password}
                isError={messerrors?.password ? true : false}
                type="password"
                id="password_confirmation"
                autoComplete="password_confirmation"
                required
                control={control}
                label="Password confirmation"
              />

              <Box mt={3}>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  loadingPosition="start"
                >
                  {t('Sign Up')}
                </LoadingButton>
              </Box>
              <Grid container>
                <Grid item>
                  <Link to="/signin" className={classes.textLink}>
                    {t('Already have an account')}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
