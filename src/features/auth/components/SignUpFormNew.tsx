import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from 'components/FormFields';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from 'react-router-dom';
import { SignupPayload } from '../authSlice';
import React from 'react';
import { useForm } from 'react-hook-form';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import { createTheme, styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';


import '../pages/signup.scss';

const useStyles = makeStyles((theme) => ({
  textLink: {
    textDecoration: 'none',
    fontWeight: 400,
    alignContent: 'center',
    fontSize: '0.875rem',
    lineHeight: '1.43',
    letterSpacing: '0.01071em',
    color: '#7D76CFFF',
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
  email: yup.string().required('Please enter email.'),
  username: yup
    .string()
    .min(2, 'The user name must be at least 2 characters.')
    .max(30, 'The user name may not be greater than 30 characters.')
    .required('Please enter user name.'),
  password: yup
    .string()
    .min(8, 'The password must be at least 8 characters.')
    .max(30, 'The password may not be greater than 30 characters.')
    .required('Please enter password.'),
  password_confirmation: yup
    .string()
    .min(8, 'The password_confirmation must be at least 8 characters.')
    .max(30, 'The password_confirmation may not be greater than 30 characters.')
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
  const messerrors = checkError(errors);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupPayload>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: SignupPayload) => {
    try {
      await onSubmit?.(formValues);
    } catch (error: any) {}
  };
  const theme = createTheme();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid className="signup_header" item xs={12}>
          <Box
            component="img"
            sx={{
              height: 35,
            }}
            src="./icon_logo_cong_doan.png"
          />
        </Grid>

        <Grid className="sigup_logo" item xs={2}>
          {/* <Box
            component="img"
            sx={{
              height: 60,
            }}
            src="./logo_mail.png"
          /> */}
        </Grid>
        <Grid className="container_textWelcome" item xs={4}>
          <Typography className="textWelcome" variant="h3">
            {t('welcome1')}
          </Typography>
          <Typography className="textWelcome" variant="h3">
            {t('welcome2')}
          </Typography>
          <Typography className="textWelcomeSub" variant="h6">
            {t('welcome3')}
          </Typography>
          <Box
            component="img"
            sx={{
              height: 60,
              mt: 2,
            }}
            src="./logo_mail.png"
          />
        </Grid>
        <Grid item xs={4}>
          <Box
            className="signup_box"
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '2px solid',
            }}
          >
            <Typography component="h1" variant="h5" className="title_box_signup">
              {t('Sign Up')}
            </Typography>
            <Box
              className="form_signup"
              component="form"
              onSubmit={handleSubmit(handleFormSubmit)}
              sx={{ mt: 1 }}
            >
              <InputField
                className="text_input"
                name="firstName"
                messageError={messerrors?.firstName}
                isError={messerrors?.firstName ? true : false}
                required
                control={control}
                label="First name"
              />
              <InputField
                className="text_input"
                name="lastName"
                messageError={messerrors?.lastName}
                isError={messerrors?.lastName ? true : false}
                required
                control={control}
                label="Last name"
              />
              <InputField
                className="text_input"
                name="email"
                messageError={messerrors?.email}
                isError={messerrors?.email ? true : false}
                required
                control={control}
                label="Email"
              />
              <InputField
                className="text_input"
                name="username"
                messageError={messerrors?.username}
                isError={messerrors?.username ? true : false}
                required
                control={control}
                label="User name"
              />
              <InputField
                className="text_input"
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
                className="text_input"
                name="password_confirmation"
                messageError={messerrors?.password_confirmation}
                isError={messerrors?.password_confirmation ? true : false}
                type="password"
                id="password_confirmation"
                autoComplete="password_confirmation"
                required
                control={control}
                label="Password confirmation"
              />

              <Box mt={3}>
                <LoadingButton
                  className="loading_button"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mb: 2 }}
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
        <Grid className="signup_logo" item xs={2}>
          <Box
            component="img"
            sx={{
              height: 60,
            }}
            src="./img_buld.png"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
