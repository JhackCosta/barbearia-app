# Barbearia App 💈

Aplicativo mobile para gerenciamento de barbearia desenvolvido em React Native.

## Funcionalidades ✨

- 📋 **Cadastro de Clientes**: Gerencie seus clientes com nome e telefone
- 📅 **Agendamentos**: Crie agendamentos com data, hora e tipo de serviço
- 🔔 **Notificações**: Lembretes automáticos 24h antes do agendamento
- ✅ **Conclusão de Atendimentos**: Marque atendimentos como concluídos
- 📊 **Histórico**: Visualize todos os atendimentos realizados
- 💰 **Relatórios**: Acompanhe receitas e estatísticas mensais/trimestrais/anuais

## Tipos de Serviço

- Corte e Barba - R$ 50,00
- Só Corte - R$ 30,00
- Só Barba - R$ 25,00

## Tecnologias 🛠️

- React Native 0.82.1
- TypeScript
- React Navigation
- React Native Paper (Material Design)
- AsyncStorage
- React Native Push Notification

## Pré-requisitos

- Node.js 20+
- JDK 21
- Android SDK
- Dispositivo Android ou Emulador

## Instalação

\`\`\`bash
# Instalar dependências
npm install

# Gerar bundle JavaScript
npm run bundle

# Instalar no dispositivo Android
npm run install
\`\`\`

## Scripts Disponíveis

- \`npm run bundle\` - Gera o bundle JavaScript para Android
- \`npm run install\` - Instala o APK debug no dispositivo
- \`npm run build\` - Gera APK de produção (release)
- \`npm run lint\` - Executa o ESLint
- \`npm test\` - Executa os testes

## Estrutura do Projeto

\`\`\`
src/
├── components/       # Componentes reutilizáveis
├── navigation/       # Configuração de navegação
├── screens/         # Telas do app
│   ├── DashboardScreen.tsx
│   ├── NovoClienteScreen.tsx
│   ├── ListaClientesScreen.tsx
│   ├── NovoAgendamentoScreen.tsx
│   ├── HistoricoScreen.tsx
│   └── RelatoriosScreen.tsx
├── services/        # Serviços (notificações)
├── storage/         # Persistência de dados
└── types/          # Tipos TypeScript
\`\`\`

## Desenvolvimento

O app foi desenvolvido para Android e utiliza:
- **AsyncStorage** para armazenamento local
- **Notificações locais** (não requer Firebase para funcionar)
- **Material Design** via React Native Paper
- **TypeScript** para type safety

## Autor

Desenvolvido para gerenciamento de barbearias.
