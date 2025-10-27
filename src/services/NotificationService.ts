import PushNotification, { Importance } from 'react-native-push-notification';
import { Agendamento } from '../types';

export class NotificationService {
  static init() {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },
      onRegistrationError: function(err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });    PushNotification.createChannel(
      {
        channelId: 'barbearia-channel',
        channelName: 'Barbearia Notificações',
        channelDescription: 'Notificações de agendamentos da barbearia',
        playSound: true,
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
      },
      (created) => console.log(`Canal criado: ${created}`)
    );
  }

  static agendarLembrete(agendamento: Agendamento) {
    // Calcular 24 horas antes do agendamento
    const dataLembrete = new Date(agendamento.data.getTime() - 24 * 60 * 60 * 1000);

    // Verificar se a data do lembrete é no futuro
    if (dataLembrete > new Date()) {
      PushNotification.localNotificationSchedule({
        id: agendamento.id,
        channelId: 'barbearia-channel',
        title: '📅 Lembrete de Agendamento',
        message: `${agendamento.cliente.nome} tem ${agendamento.servico} agendado para amanhã às ${agendamento.data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
        date: dataLembrete,
        playSound: true,
        soundName: 'default',
        vibrate: true,
        vibration: 300,
        userInfo: {
          agendamentoId: agendamento.id,
          tipo: 'lembrete_agendamento',
        },
      });

      console.log(`Lembrete agendado para: ${dataLembrete.toLocaleString('pt-BR')}`);
    }
  }

  static cancelarLembrete(agendamentoId: string) {
    PushNotification.cancelLocalNotification(agendamentoId);
    console.log(`Lembrete cancelado para agendamento: ${agendamentoId}`);
  }

  static listarNotificacoesAgendadas() {
    PushNotification.getScheduledLocalNotifications((notifications) => {
      console.log('Notificações agendadas:', notifications);
    });
  }

  static cancelarTodasNotificacoes() {
    PushNotification.cancelAllLocalNotifications();
    console.log('Todas as notificações foram canceladas');
  }
}
