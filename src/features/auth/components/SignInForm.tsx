import { yupResolver } from '@hookform/resolvers/yup';
import { InputField, CheckboxField } from 'components/FormFields';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { Link } from 'react-router-dom';
import { LoginPayload } from '../authSlice';
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
import { makeStyles} from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { Loading } from '../../../components/Common'

const useStyles = makeStyles((theme) => ({
  textLink: {
    textDecoration: 'none',
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: '1.43',
    letterSpacing: '0.01071em',
    color: '#1976d2'
  },
}));

export interface SignIpFormProps {
  onSubmit?: (formValues: LoginPayload) => void;
}

// all the error responses
function checkError(error : any) {
  switch (error?.status) {
    case 422:
      return error.data.data.errors
  
    default:
      return null
  }
}

const schema = yup.object().shape({
  username: yup
    .string()
    .min(2, "The user name must be at least 2 characters")
    .max(30, "The user name may not be greater than 30 characters.")
    .required('Please enter name.'),
  password: yup
    .string()
    .min(8, "The password must be at least 8 characters.")
    .max(128, "The password may not be greater than 128 characters.")
    .required('Please enter password.'),
  login_type: yup
    .boolean(),
});

export default function SignInForm({ onSubmit }: SignIpFormProps) {
  const { t } = useTranslation()
  const errors = useAppSelector((state) => state.auth.errors);
  const loading = useAppSelector((state) => state.auth.loading);
  const messerrors = checkError(errors)
  const classes = useStyles();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginPayload>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: LoginPayload) => {
    if (loading) return;
    if (formValues.login_type || formValues.login_type == undefined) {
      formValues.login_type = process.env.REACT_APP_LOGIN_TYPE
    }
    await onSubmit?.(formValues);
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
            <Loading loading={loading}/>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t('Sign In')}
            </Typography>
            <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 1 }}>
                <InputField name="username" required control={control} messageError={messerrors?.username && t(messerrors.username)} isError={messerrors?.username ? true : false} label="User name" />
                <InputField name="password" type="password" id="password" autoComplete="password" messageError={messerrors?.password && t(messerrors.password)} isError={messerrors?.password ? true : false} required control={control} label="Password" />
                <CheckboxField
                  control={control}
                  label={t('Login with SSO')}
                  name="login_type"
                  labelPlacement="end"/>

                <Box mt={3}>
                <LoadingButton
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
              >
                  { t('Sign In') }
              </LoadingButton>
            </Box>
                <Grid container>
                    <Grid item xs>
                      <Link to="/forgot-password" className={classes.textLink}>
                        {t('Forgot password?')}
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link to="/signup" className={classes.textLink}>
                        {t("Don't have an account? Sign Up")}
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
