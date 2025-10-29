import {Linking, Alert} from 'react-native';
import {Cliente, Agendamento} from '../types';

export class WhatsAppService {
  /**
   * Envia mensagem de confirmação de agendamento
   */
  static async enviarConfirmacaoAgendamento(
    cliente: Cliente,
    agendamento: Agendamento,
  ): Promise<void> {
    const telefone = this.formatarTelefone(cliente.telefone);
    const dataFormatada = agendamento.data.toLocaleDateString('pt-BR');
    const horaFormatada = agendamento.data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const mensagem =
      `Olá ${cliente.nome}! ✂️\n\n` +
      `Seu agendamento foi confirmado:\n` +
      `📅 Data: ${dataFormatada}\n` +
      `⏰ Horário: ${horaFormatada}\n` +
      `💈 Serviço: ${agendamento.servico}\n` +
      `💰 Valor: R$ ${agendamento.valorPago?.toFixed(2)}\n\n` +
      `Nos vemos em breve! 😊`;

    await this.abrirWhatsApp(telefone, mensagem);
  }

  /**
   * Envia lembrete 24h antes do agendamento
   */
  static async enviarLembrete24h(
    cliente: Cliente,
    agendamento: Agendamento,
  ): Promise<void> {
    const telefone = this.formatarTelefone(cliente.telefone);
    const horaFormatada = agendamento.data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const mensagem =
      `Olá ${cliente.nome}! 🔔\n\n` +
      `Lembrete: Amanhã você tem agendamento às ${horaFormatada}!\n` +
      `💈 ${agendamento.servico}\n\n` +
      `Qualquer imprevisto, avise com antecedência! 😊`;

    await this.abrirWhatsApp(telefone, mensagem);
  }

  /**
   * Envia aviso de cancelamento
   */
  static async enviarAvisoCancelamento(
    cliente: Cliente,
    agendamento: Agendamento,
  ): Promise<void> {
    const telefone = this.formatarTelefone(cliente.telefone);
    const dataFormatada = agendamento.data.toLocaleDateString('pt-BR');
    const horaFormatada = agendamento.data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const mensagem =
      `Olá ${cliente.nome},\n\n` +
      `Seu agendamento foi cancelado:\n` +
      `📅 ${dataFormatada} às ${horaFormatada}\n` +
      `💈 ${agendamento.servico}\n\n` +
      `Para reagendar, entre em contato! 📞`;

    await this.abrirWhatsApp(telefone, mensagem);
  }

  /**
   * Envia mensagem de agradecimento após conclusão
   */
  static async enviarAgradecimento(
    cliente: Cliente,
    agendamento: Agendamento,
  ): Promise<void> {
    const telefone = this.formatarTelefone(cliente.telefone);

    const mensagem =
      `Olá ${cliente.nome}! 😊\n\n` +
      `Obrigado por escolher nossos serviços!\n` +
      `Esperamos que tenha gostado do seu ${agendamento.servico.toLowerCase()}! ✨\n\n` +
      `Até a próxima! 💈`;

    await this.abrirWhatsApp(telefone, mensagem);
  }

  /**
   * Formata o telefone removendo caracteres especiais
   */
  private static formatarTelefone(telefone: string): string {
    return telefone.replace(/\D/g, '');
  }

  /**
   * Abre o WhatsApp com a mensagem pré-pronta
   */
  private static async abrirWhatsApp(
    telefone: string,
    mensagem: string,
  ): Promise<void> {
    try {
      // Remove todos os caracteres não numéricos
      const telefoneLimpo = telefone.replace(/\D/g, '');

      // Adiciona código do país (55 para Brasil) se não tiver
      const telefoneCompleto = telefoneLimpo.startsWith('55')
        ? telefoneLimpo
        : `55${telefoneLimpo}`;

      // URL da API do WhatsApp (mais compatível)
      const url = `https://wa.me/${telefoneCompleto}?text=${encodeURIComponent(mensagem)}`;

      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir WhatsApp:', error);
      Alert.alert(
        '❌ Erro ao abrir WhatsApp',
        `Não foi possível abrir o WhatsApp.\n\nTelefone: ${telefone}\n\nVerifique se o WhatsApp está instalado.`,
      );
    }
  }
}
