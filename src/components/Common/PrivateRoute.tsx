import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';


export function PrivateRoute (props: RouteProps) {

  // check if user is logged in
  // If yes, show route
  // Otherwise, redirect to login page
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if(!isLoggedIn) return <Redirect to="/signin" />;


  return <Route {...props}/>;
}
