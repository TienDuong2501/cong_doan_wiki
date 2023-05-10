import React from 'react';
import { Box } from '@mui/material';
import { SignupPayload } from '../authSlice';
import SignUpForm from '../components/SignUpForm';
import { useEffect } from 'react';
import { useAppDispatch } from 'app/hooks';
import { authActions } from '../authSlice';
import SignUpFormNew from '../components/SignUpFormNew';



export default function SignUpPage() {
  const dispatch = useAppDispatch();
  const handleSignUpFormSubmit = (formValues: SignupPayload) => {
    // dispatch action sigup to AuthSlice and slice
    dispatch(
      authActions.signup(formValues)
    );
  };
  useEffect(() => {
    dispatch(
      authActions.resetErrors()
    );
  })

  return (
    <Box>
      <Box mt={2}>
        {/* <SignUpForm onSubmit={handleSignUpFormSubmit} /> */}
        <SignUpFormNew onSubmit={handleSignUpFormSubmit}/>
      </Box>
    </Box>
  );
}
