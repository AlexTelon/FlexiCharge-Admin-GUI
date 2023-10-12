import React from 'react';
import { Redirect, Route, type RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, ...rest }) => {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

  return (
    <Route {...rest} render={({ location }) => {
      return isAuthenticated
        ? children
        : <Redirect to={{ pathname: '/login', state: { from: location } }} />;
    }} />
  );
};