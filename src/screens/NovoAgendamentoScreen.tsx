import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import {
  Button,
  Card,
  Title,
  SegmentedButtons,
  List,
  Surface,
  Text,
  Divider
} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList, Cliente, Agendamento, TipoServico, TIPOS_SERVICO } from '../types';
import { ClienteStorage, AgendamentoStorage } from '../storage';
import { NotificationService } from '../services/NotificationService';

type NovoAgendamentoNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NovoAgendamento'>;

interface Props {
  navigation: NovoAgendamentoNavigationProp;
}

const NovoAgendamentoScreen: React.FC<Props> = ({ navigation }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [data, setData] = useState(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  const [servico, setServico] = useState<TipoServico>('Corte e Barba');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      const clientesCarregados = await ClienteStorage.carregarClientes();
      const clientesOrdenados = clientesCarregados.sort((a, b) =>
        a.nome.localeCompare(b.nome)
      );
      setClientes(clientesOrdenados);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      Alert.alert('Erro', 'Não foi possível carregar os clientes.');
    }
  };

  const validarFormulario = () => {
    if (!clienteSelecionado) {
      Alert.alert('Erro', 'Selecione um cliente.');
      return false;
    }

    if (data <= new Date()) {
      Alert.alert('Erro', 'A data deve ser no futuro.');
      return false;
    }

    return true;
  };

  const salvarAgendamento = async () => {
    if (!validarFormulario()) return;

    setLoading(true);
    try {
      const novoAgendamento: Agendamento = {
        id: Date.now().toString(),
        clienteId: clienteSelecionado!.id,
        cliente: clienteSelecionado!,
        data,
        servico,
        criadoEm: new Date(),
        notificacaoEnviada: false,
        status: 'agendado',
      };

      await AgendamentoStorage.adicionarAgendamento(novoAgendamento);

      // Agendar notificação de lembrete
      NotificationService.agendarLembrete(novoAgendamento);

      Alert.alert(
        'Sucesso',
        'Agendamento criado com sucesso!\nLembrete será enviado 24h antes.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error);
      Alert.alert('Erro', 'Não foi possível salvar o agendamento.');
    } finally {
      setLoading(false);
    }
  };

  const servicoButtons = TIPOS_SERVICO.map(tipo => ({
    value: tipo,
    label: tipo,
  }));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Surface style={styles.surface}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Novo Agendamento</Title>

            {/* Seleção de Cliente */}
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Cliente
            </Text>
            {clientes.length === 0 ? (
              <Surface style={styles.noClientsContainer}>
                <Text variant="bodyMedium" style={styles.noClientsText}>
                  Nenhum cliente cadastrado
                </Text>
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate('NovoCliente')}
                  style={styles.noClientsButton}
                >
                  Cadastrar Cliente
                </Button>
              </Surface>
            ) : (
              <Surface style={styles.clienteSelector}>
                {clientes.map((cliente) => (
                  <List.Item
                    key={cliente.id}
                    title={cliente.nome}
                    description={cliente.telefone}
                    left={() => clienteSelecionado?.id === cliente.id ?
                      <Text style={styles.radioButton}>●</Text> :
                      <Text style={styles.radioButton}>○</Text>
                    }
                    onPress={() => setClienteSelecionado(cliente)}
                    style={[
                      styles.clienteItem,
                      clienteSelecionado?.id === cliente.id && styles.clienteSelecionado
                    ]}
                  />
                ))}
              </Surface>
            )}

            <Divider style={styles.divider} />

            {/* Seleção de Data e Hora */}
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Data e Hora
            </Text>
            <Button
              mode="outlined"
              onPress={() => setMostrarDatePicker(true)}
              style={styles.dateButton}
            >
              📅 {data.toLocaleDateString('pt-BR')} às {data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </Button>

            <DatePicker
              modal
              open={mostrarDatePicker}
              date={data}
              onConfirm={(selectedDate) => {
                setMostrarDatePicker(false);
                setData(selectedDate);
              }}
              onCancel={() => setMostrarDatePicker(false)}
              minimumDate={new Date()}
              locale="pt-BR"
              title="Selecionar Data e Hora"
              confirmText="Confirmar"
              cancelText="Cancelar"
            />

            <Divider style={styles.divider} />

            {/* Seleção de Serviço */}
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Tipo de Serviço
            </Text>
            <SegmentedButtons
              value={servico}
              onValueChange={(value) => setServico(value as TipoServico)}
              buttons={servicoButtons}
              style={styles.servicoButtons}
            />

            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                onPress={() => navigation.goBack()}
                style={styles.cancelButton}
                disabled={loading}
              >
                Cancelar
              </Button>

              <Button
                mode="contained"
                onPress={salvarAgendamento}
                style={styles.saveButton}
                loading={loading}
                disabled={loading || !clienteSelecionado || clientes.length === 0}
              >
                Agendar
              </Button>
            </View>
          </Card.Content>
        </Card>
      </Surface>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
  },
  surface: {
    flex: 1,
    borderRadius: 12,
  },
  card: {
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#2C3E50',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2C3E50',
  },
  divider: {
    marginVertical: 20,
  },
  clienteSelector: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  clienteItem: {
    borderRadius: 8,
    marginBottom: 2,
  },
  clienteSelecionado: {
    backgroundColor: '#E8F5E8',
  },
  noClientsContainer: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 8,
  },
  noClientsText: {
    color: '#7F8C8D',
    marginBottom: 12,
  },
  noClientsButton: {
    backgroundColor: '#6200EA',
  },
  dateButton: {
    marginBottom: 12,
    borderColor: '#6200EA',
  },
  servicoButtons: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderColor: '#95A5A6',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#6200EA',
  },
  radioButton: {
    fontSize: 24,
    color: '#6200EA',
    marginLeft: 16,
    marginRight: 8,
  },
});

export default NovoAgendamentoScreen;
