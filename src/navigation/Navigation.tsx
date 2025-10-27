import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

import { RootStackParamList } from '../types';
import DashboardScreen from '../screens/DashboardScreen';
import NovoClienteScreen from '../screens/NovoClienteScreen';
import ListaClientesScreen from '../screens/ListaClientesScreen';
import NovoAgendamentoScreen from '../screens/NovoAgendamentoScreen';
import HistoricoScreen from '../screens/HistoricoScreen';
import RelatoriosScreen from '../screens/RelatoriosScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6200EA',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ title: '🏠 Barbearia' }}
          />
          <Stack.Screen
            name="NovoCliente"
            component={NovoClienteScreen}
            options={{ title: '👤 Novo Cliente' }}
          />
          <Stack.Screen
            name="ListaClientes"
            component={ListaClientesScreen}
            options={{ title: '📋 Clientes' }}
          />
          <Stack.Screen
            name="NovoAgendamento"
            component={NovoAgendamentoScreen}
            options={{title: '📅 Novo Agendamento'}}
          />
          <Stack.Screen
            name="Historico"
            component={HistoricoScreen}
            options={{title: '📜 Histórico'}}
          />
          <Stack.Screen
            name="Relatorios"
            component={RelatoriosScreen}
            options={{title: '📊 Relatórios'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Navigation;
