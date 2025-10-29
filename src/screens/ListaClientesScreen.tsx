import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  FAB,
  Searchbar,
  Text,
  Surface,
  IconButton,
  Divider
} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList, Cliente } from '../types';
import { ClienteStorage } from '../storage';

type ListaClientesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ListaClientes'>;

interface Props {
  navigation: ListaClientesNavigationProp;
}

const ListaClientesScreen: React.FC<Props> = ({ navigation }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesFiltrados, setClientesFiltrados] = useState<Cliente[]>([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);

  const carregarClientes = async () => {
    try {
      setLoading(true);
      const clientesCarregados = await ClienteStorage.carregarClientes();

      // Ordenar por nome
      const clientesOrdenados = clientesCarregados.sort((a, b) =>
        a.nome.localeCompare(b.nome)
      );

      setClientes(clientesOrdenados);
      setClientesFiltrados(clientesOrdenados);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      Alert.alert('Erro', 'Não foi possível carregar os clientes.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarClientes();
    }, [])
  );

  const filtrarClientes = (textoBusca: string) => {
    setBusca(textoBusca);

    if (textoBusca.trim() === '') {
      setClientesFiltrados(clientes);
    } else {
      const clientesFiltrados = clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(textoBusca.toLowerCase()) ||
        cliente.telefone.includes(textoBusca.replace(/\D/g, ''))
      );
      setClientesFiltrados(clientesFiltrados);
    }
  };

  const removerCliente = async (cliente: Cliente) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja remover ${cliente.nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              await ClienteStorage.removerCliente(cliente.id);
              carregarClientes();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível remover o cliente.');
            }
          }
        }
      ]
    );
  };

  const renderCliente = ({ item }: { item: Cliente }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <View style={styles.clienteInfo}>
            <Title style={styles.clienteNome}>{item.nome}</Title>
            <Paragraph style={styles.telefone}>📞 {item.telefone}</Paragraph>
            <Paragraph style={styles.dataCadastro}>
              Cadastrado em: {item.criadoEm.toLocaleDateString('pt-BR')}
            </Paragraph>
          </View>

          <View style={styles.cardActions}>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('EditarCliente', {clienteId: item.id})}
              style={styles.editButton}
            >
              ✏️
            </Button>
            <Button
              mode="text"
              textColor="#E74C3C"
              onPress={() => removerCliente(item)}
            >
              🗑️
            </Button>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Surface style={styles.searchContainer} elevation={2}>
        <Searchbar
          placeholder="🔍 Buscar por nome ou telefone..."
          onChangeText={filtrarClientes}
          value={busca}
          style={styles.searchbar}
          icon={() => null}
        />
      </Surface>

      {clientesFiltrados.length === 0 && !loading ? (
        <Surface style={styles.emptyState}>
          <Text variant="headlineSmall" style={styles.emptyTitle}>
            {busca ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}
          </Text>
          <Text variant="bodyLarge" style={styles.emptySubtitle}>
            {busca
              ? 'Tente buscar com outros termos'
              : 'Comece cadastrando seu primeiro cliente!'
            }
          </Text>
        </Surface>
      ) : (
        <>
          <View style={styles.resultadosHeader}>
            <Text variant="bodyMedium" style={styles.totalClientes}>
              {clientesFiltrados.length} cliente(s) {busca && 'encontrado(s)'}
            </Text>
          </View>

          <FlatList
            data={clientesFiltrados}
            keyExtractor={(item) => item.id}
            renderItem={renderCliente}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}

      <FAB
        style={styles.fab}
        onPress={() => navigation.navigate('NovoCliente')}
        label="Novo Cliente"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  searchbar: {
    elevation: 0,
    backgroundColor: '#F8F9FA',
  },
  resultadosHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  totalClientes: {
    color: '#7F8C8D',
    fontStyle: 'italic',
  },
  list: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    marginBottom: 12,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  editButton: {
    borderColor: '#6200EA',
  },
  clienteInfo: {
    flex: 1,
  },
  clienteNome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  telefone: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 4,
  },
  dataCadastro: {
    fontSize: 12,
    color: '#95A5A6',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200EA',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    padding: 40,
    borderRadius: 12,
  },
  emptyTitle: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#7F8C8D',
  },
  emptySubtitle: {
    textAlign: 'center',
    color: '#95A5A6',
  },
});

export default ListaClientesScreen;
