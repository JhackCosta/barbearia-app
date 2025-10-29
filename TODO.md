# 📋 TODO - Barbearia App

## 🚨 Problemas Urgentes

### 1. ❌ Notificações não funcionam
- [ ] Debugar NotificationService
- [ ] Testar permissões de notificação no Android
- [ ] Verificar canal de notificações
- [ ] Testar notificação de lembrete 24h antes
- [ ] Adicionar logs para debug

**Possíveis causas:**
- Permissões não concedidas
- Canal não criado corretamente
- Serviço não inicializado

---

## 🍎 Suporte iOS

### 2. ⚠️ App precisa funcionar no iPhone
- [ ] Configurar projeto iOS
- [ ] Instalar Pods (`cd ios && pod install`)
- [ ] Testar build iOS
- [ ] Ajustar notificações para iOS (diferentes do Android)
- [ ] Testar WhatsApp no iOS
- [ ] Ajustar permissões no Info.plist

**Arquivos necessários:**
- `ios/Podfile` - já existe
- `ios/BarbeariaApp/Info.plist` - configurar permissões
- Ajustar `NotificationService.ts` para compatibilidade iOS

**Nota:** Precisa de Mac com Xcode instalado para build iOS

---

## 📊 Funcionalidades Novas

### 3. 🔍 Identificar clientes inativos (sem corte há 1 mês)

**Onde implementar:**
- [ ] Tela de Clientes - adicionar filtro "Inativos"
- [ ] Tela de Relatórios - seção "Clientes Inativos"

**Lógica:**
```typescript
// Verificar última visita de cada cliente
// Se última visita > 30 dias atrás = INATIVO
// Mostrar lista com:
// - Nome do cliente
// - Telefone
// - Dias desde último corte
// - Botão "Enviar WhatsApp de retorno"
```

**Localização sugerida:**
- Nova tab em `ListaClientesScreen.tsx`
- Nova seção em `RelatoriosScreen.tsx`

---

## 🎨 Design / Logo

### 4. 🖼️ Logo/Slogan completo no header

**Problema atual:**
- Logo aparece cortada no header
- Só mostra uma parte da imagem

**Solução:**
- [ ] Criar nova logo horizontal (banner) otimizada para header
- [ ] Redimensionar logo para caber no header sem cortar

**Medidas recomendadas para o slogan/logo:**
```
Largura: 300-400px (para não ficar muito grande)
Altura: 40-50px (altura padrão do header)
Formato: PNG com fundo transparente
Proporção: 8:1 ou 7:1 (largura:altura)

Exemplo de tamanhos ideais:
- 320x40px
- 350x50px
- 400x50px
```

**Arquivo a modificar:**
- `src/components/Logo.tsx` - ajustar tamanho 'small'
- `src/navigation/Navigation.tsx` - ajustar headerTitle

**Dicas para criar:**
- Use fundo transparente (PNG)
- Certifique-se que o texto seja legível
- Exporte em alta qualidade
- Teste em diferentes tamanhos de tela

---

### 5. 📱 Mudar ícone do app para o slogan

**Arquivos necessários:**
```
android/app/src/main/res/
├── mipmap-mdpi/ic_launcher.png (48x48)
├── mipmap-hdpi/ic_launcher.png (72x72)
├── mipmap-xhdpi/ic_launcher.png (96x96)
├── mipmap-xxhdpi/ic_launcher.png (144x144)
└── mipmap-xxxhdpi/ic_launcher.png (192x192)

ios/BarbeariaApp/Images.xcassets/AppIcon.appiconset/
├── Icon-20@2x.png (40x40)
├── Icon-20@3x.png (60x60)
├── Icon-29@2x.png (58x58)
├── Icon-29@3x.png (87x87)
├── Icon-40@2x.png (80x80)
├── Icon-40@3x.png (120x120)
├── Icon-60@2x.png (120x120)
├── Icon-60@3x.png (180x180)
└── Icon-1024.png (1024x1024)
```

**Tarefas:**
- [ ] Criar ícone quadrado com o slogan (1024x1024)
- [ ] Usar ferramenta para gerar todos os tamanhos: https://icon.kitchen/
- [ ] Substituir arquivos em `android/app/src/main/res/mipmap-*/`
- [ ] Substituir arquivos em `ios/BarbeariaApp/Images.xcassets/AppIcon.appiconset/`

**Dicas para o ícone:**
- Ícone deve ser QUADRADO
- Cantos arredondados são aplicados automaticamente
- Evite texto muito pequeno (pode ficar ilegível)
- Use cores contrastantes
- Teste como fica em diferentes fundos (claro/escuro)

---

## 🛠️ Ferramentas Úteis

### Para criar ícones:
- https://icon.kitchen/ (gera todos os tamanhos automaticamente)
- https://appicon.co/ (alternativa)

### Para redimensionar logo:
- GIMP (gratuito)
- Photoshop
- Canva (online)
- Figma (online)

---

## 📝 Ordem de Prioridade

1. **URGENTE** - Corrigir notificações (impacta uso diário)
2. **IMPORTANTE** - Clientes inativos (funcionalidade solicitada)
3. **DESIGN** - Logo completa no header (melhora UX)
4. **DESIGN** - Ícone do app (branding)
5. **FUTURO** - Suporte iOS (requer Mac)

---

## ✅ Próximos Passos Imediatos

1. Debugar notificações:
   ```bash
   # Verificar logs quando criar agendamento
   adb logcat | grep -i notification
   ```

2. Criar logo horizontal para header:
   - Tamanho: 350x50px
   - Formato: PNG transparente
   - Salvar em: `src/assets/images/logo-horizontal.png`

3. Implementar filtro de clientes inativos:
   - Arquivo: `src/screens/ListaClientesScreen.tsx`
   - Adicionar aba "Inativos (há 30+ dias)"

---

## 📚 Documentação para Consulta

- React Native Notifications: https://notifee.app/
- iOS Setup: https://reactnative.dev/docs/environment-setup (seção iOS)
- Icon Guidelines Android: https://developer.android.com/distribute/google-play/resources/icon-design-specifications
- Icon Guidelines iOS: https://developer.apple.com/design/human-interface-guidelines/app-icons

---

**Última atualização:** 28/10/2025
**Status:** Pendente implementação
