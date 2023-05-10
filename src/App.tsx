import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import SignInPage from 'features/auth/pages/SignInPage';
import SignUpPage from 'features/auth/pages/SignUpPage';
import { DashboardLayout } from 'components/Layout';
import { NotFound, PrivateRoute } from 'components/Common';

function App() {
  return (
    <div>
      <Switch>
        {/* <Route path="/signin">
          <SignInPage />
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route> */}

        <Route path="/cong-doan">
          <DashboardLayout />
        </Route>
        {/* <PrivateRoute path="/open-api">
        </PrivateRoute> */}
        <Route>
          <DashboardLayout />
          {/* <NotFound /> */}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
