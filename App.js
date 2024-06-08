import React, { useEffect, useMemo } from 'react';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import Navigation from './src/routes/Navigation';
import { AppProvider, useApp } from './src/context/AppContext'

const App = () => {
  
  return (
    <AppProvider>
      <PaperProvider theme={MD3LightTheme}>
        <Navigation />
      </PaperProvider>
    </AppProvider>
  );
}
export default App;
