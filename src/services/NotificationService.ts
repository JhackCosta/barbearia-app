import PushNotification, { Importance } from 'react-native-push-notification';
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import { Agendamento } from '../types';

export class NotificationService {
  private static channelCreated = false;

  static async init() {
    // Solicitar permissões no Android 13+
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permissão Necessária',
            'Para receber lembretes de agendamentos, é necessário permitir notificações.',
          );
          return;
        }
      } catch (err) {
        console.error('Erro ao solicitar permissão:', err);
      }
    }

    PushNotification.configure({
      onRegister: function (token) {
        // Token registrado
      },
      onNotification: function (notification) {
        // Notificação recebida
      },
      onAction: function (notification) {
        // Ação executada
      },
      onRegistrationError: function(err) {
        console.error('Erro no registro:', err.message);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });

    this.createNotificationChannel();
  }

  private static createNotificationChannel() {
    if (this.channelCreated) {
      return;
    }

    PushNotification.createChannel(
      {
        channelId: 'barbearia-channel',
        channelName: 'Barbearia Notificações',
        channelDescription: 'Notificações de agendamentos da barbearia',
        playSound: true,
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
      },
      (created) => {
        this.channelCreated = created;
      }
    );
  }

  static agendarLembrete(agendamento: Agendamento) {
    // Calcular 24 horas antes do agendamento
    const dataLembrete = new Date(agendamento.data.getTime() - 24 * 60 * 60 * 1000);
    const agora = new Date();

    // Verificar se a data do lembrete é no futuro
    if (dataLembrete <= agora) {
      return;
    }

    PushNotification.localNotificationSchedule({
      id: agendamento.id,
      channelId: 'barbearia-channel',
      title: '� Lembrete de Agendamento',
      message: `${agendamento.cliente.nome} tem ${agendamento.servico} agendado para amanhã às ${agendamento.data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
      date: dataLembrete,
      playSound: true,
      soundName: 'default',
      smallIcon: 'ic_notification',
      largeIcon: 'ic_launcher',
      vibrate: true,
      vibration: 300,
      userInfo: {
        agendamentoId: agendamento.id,
        tipo: 'lembrete_agendamento',
      },
    });
  }

  static cancelarLembrete(agendamentoId: string) {
    PushNotification.cancelLocalNotification(agendamentoId);
  }

  static cancelarTodasNotificacoes() {
    PushNotification.cancelAllLocalNotifications();
  }
}
