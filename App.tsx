import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import Navigation from './src/navigation/Navigation';
import { NotificationService } from './src/services/NotificationService';

function App(): React.JSX.Element {
  useEffect(() => {
    // Inicializar serviço de notificações
    NotificationService.init();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#6200EA"
      />
      <Navigation />
    </>
  );
}

export default App;
