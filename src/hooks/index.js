import React from 'react';
import { AuthProvider } from './Auth';
import { ServiceProvider } from './Service';




const AppProvider = ({ children }) => (
  <AuthProvider>
    <ServiceProvider>
      {children}
    </ServiceProvider>
  </AuthProvider>
);

export default AppProvider;