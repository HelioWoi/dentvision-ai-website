# 📧 Configuração de Notificações por Email - Zapier

## 🎯 Objetivo
Receber email automático toda vez que alguém preencher qualquer formulário no site (Demo, Trial ou Live Demo).

---

## 📋 PASSO 1: Criar Conta no Zapier

1. Acesse: https://zapier.com/sign-up
2. Crie conta gratuita (Free Plan: 100 tasks/mês)
3. Confirme seu email

---

## 📋 PASSO 2: Criar um Novo Zap

1. No dashboard do Zapier, clique em **"Create Zap"**
2. Nome do Zap: `Dent-Vision New Leads`

---

## 📋 PASSO 3: Configurar o Trigger (Webhook)

### 3.1 Escolher App & Event
1. **App:** Digite "Webhooks" e selecione **"Webhooks by Zapier"**
2. **Event:** Selecione **"Catch Hook"**
3. Clique em **"Continue"**

### 3.2 Obter a Webhook URL
1. Zapier vai mostrar uma **Custom Webhook URL**
2. **COPIE ESTA URL** - exemplo:
   ```
   https://hooks.zapier.com/hooks/catch/12345678/abcdefg/
   ```
3. **NÃO CLIQUE EM "Continue" AINDA!**
4. Deixe esta aba aberta

---

## 📋 PASSO 4: Configurar Webhook no Supabase

### 4.1 Acessar Database Webhooks
1. Abra nova aba: https://supabase.com/dashboard/project/zjdjjhtofouafygkctne
2. Clique em **Database** no menu lateral
3. Clique em **Webhooks** (ou **Database Webhooks**)
4. Clique em **"Create a new hook"** ou **"Enable Webhooks"**

### 4.2 Configurar o Webhook
Preencha os campos:

- **Name:** `new_lead_notification`
- **Schema:** `public`
- **Table:** `leads`
- **Events:** ✅ Marque apenas **INSERT**
- **Type:** `HTTP Request`
- **Method:** `POST`
- **URL:** Cole a URL do Zapier que você copiou
- **HTTP Headers:**
  ```json
  Content-Type: application/json
  ```
- **Timeout:** `5000`

### 4.3 Salvar
1. Clique em **"Create webhook"** ou **"Save"**
2. ✅ Webhook criado!

---

## 📋 PASSO 5: Testar o Webhook

### 5.1 Inserir Dados de Teste
1. No Supabase, vá em **Table Editor** → **leads**
2. Clique em **"Insert"** → **"Insert row"**
3. Preencha:
   - `full_name`: Test User
   - `email`: test@example.com
   - `form_type`: demo
   - `status`: new
4. Clique em **"Save"**

### 5.2 Verificar no Zapier
1. Volte para a aba do Zapier
2. Clique em **"Test trigger"**
3. ✅ Você deve ver os dados do lead de teste aparecerem!
4. Clique em **"Continue"**

---

## 📋 PASSO 6: Configurar a Action (Enviar Email)

### 6.1 Escolher App & Event
1. **App:** Digite "Gmail" (ou "Email by Zapier" para email genérico)
2. **Event:** Selecione **"Send Email"**
3. Clique em **"Continue"**

### 6.2 Conectar Conta
1. Clique em **"Sign in to Gmail"** (ou seu provedor)
2. Autorize o acesso
3. Selecione a conta que vai RECEBER os emails

### 6.3 Configurar o Email
Preencha os campos usando os dados do webhook:

**To:**
```
contact@dent-vision.ai
```
(ou seu email onde quer receber notificações)

**From Name:**
```
Dent-Vision Website
```

**Subject:**
```
🔔 Novo Lead: {{record__full_name}} - {{record__form_type}}
```

**Body (Plain Text):**
```
🎉 NOVO LEAD RECEBIDO!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 INFORMAÇÕES DO LEAD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Nome: {{record__full_name}}
📧 Email: {{record__email}}
📱 Telefone: {{record__phone}}
🏢 Empresa: {{record__company}}
💬 Mensagem: {{record__message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 DETALHES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Tipo de Formulário: {{record__form_type}}
💼 Plano (se trial): {{record__plan}}
🆔 Status: {{record__status}}
📅 Data: {{record__created_at}}
🌐 Origem: {{record__source}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔗 AÇÕES RÁPIDAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ver no Supabase:
https://supabase.com/dashboard/project/zjdjjhtofouafygkctne/editor/leads

Responder para:
{{record__email}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ Dent-Vision AI - Lead Management System
```

**Dica:** Clique nos campos para ver as opções disponíveis do webhook (record__full_name, record__email, etc.)

### 6.4 Testar
1. Clique em **"Test action"**
2. ✅ Você deve receber um email de teste!
3. Verifique sua caixa de entrada

---

## 📋 PASSO 7: Publicar o Zap

1. Clique em **"Publish"** no topo
2. ✅ Zap ativado!
3. Agora você receberá emails automáticos para cada novo lead

---

## 🎨 CUSTOMIZAÇÕES OPCIONAIS

### Filtrar por Tipo de Formulário
Se quiser receber emails diferentes para cada tipo de form:

1. Após o Trigger, adicione um **Filter**
2. Configure: `form_type` = `demo` (ou trial, live_demo)
3. Crie Zaps separados para cada tipo

### Adicionar mais destinatários
No campo **"To"**, adicione múltiplos emails separados por vírgula:
```
contact@dent-vision.ai, vendas@dent-vision.ai
```

### Enviar para Slack
Em vez de Email, use **Slack** como Action:
1. Action: Slack → Send Channel Message
2. Configure canal e mensagem

### Salvar em Google Sheets
Adicione outra Action:
1. Google Sheets → Create Spreadsheet Row
2. Configure planilha e campos

---

## 🧪 TESTAR NO SITE REAL

1. Acesse seu site: http://localhost:8080 (ou https://dent-vision.ai)
2. Preencha o formulário **"Request a Demo"**
3. Clique em **"Submit Request"**
4. ✅ Aguarde 5-10 segundos
5. ✅ Verifique seu email!

---

## 📊 MONITORAMENTO

### Ver histórico de Zaps executados:
1. Dashboard do Zapier
2. Clique no Zap **"Dent-Vision New Leads"**
3. Aba **"History"**
4. Veja todos os leads processados

### Estatísticas:
- Quantos leads chegaram hoje
- Quais Zaps falharam (se houver)
- Performance

---

## 🆓 LIMITES DO PLANO GRATUITO

**Zapier Free:**
- ✅ 100 tasks/mês
- ✅ Zaps single-step
- ✅ 15 minutos de atualização

**Suficiente para:**
- ~3 leads por dia
- 100 notificações por mês

**Se precisar mais:**
- Upgrade para Starter ($19.99/mês = 750 tasks)

---

## 🔧 TROUBLESHOOTING

### ❌ Webhook não dispara
**Solução:**
1. Verifique se o webhook está **enabled** no Supabase
2. Confira se a URL do Zapier está correta
3. Teste inserindo um lead manualmente no Supabase

### ❌ Email não chega
**Solução:**
1. Verifique a caixa de spam
2. Confirme que o Gmail está conectado no Zapier
3. Teste a action manualmente no Zapier

### ❌ Dados não aparecem no email
**Solução:**
1. Verifique os field mappings no Zapier
2. Use `record__` antes do nome do campo (ex: `record__email`)
3. Teste com um novo lead

### ❌ "Zap limit reached"
**Solução:**
1. Você atingiu 100 tasks/mês
2. Upgrade o plano ou aguarde próximo mês
3. Considere usar Edge Functions (sem limite)

---

## ✅ CHECKLIST FINAL

Antes de considerar completo:

- [ ] Zapier conectado e ativo
- [ ] Webhook configurado no Supabase
- [ ] Email de teste recebido com sucesso
- [ ] Formulário do site testado
- [ ] Email de notificação recebido do site
- [ ] Template do email está bonito e legível
- [ ] Todos os dados importantes aparecem no email

---

## 🎉 PRONTO!

Agora você tem um sistema completo de notificações por email!

**Fluxo completo:**
1. ✅ Visitante preenche formulário
2. ✅ Dados salvos no Supabase
3. ✅ Webhook dispara
4. ✅ Zapier recebe dados
5. ✅ Email enviado automaticamente
6. ✅ Você é notificado em segundos!

---

## 📞 Próximos Passos Recomendados

1. ✅ Testar com todos os 3 formulários (Demo, Trial, Live Demo)
2. ✅ Customizar template do email
3. ✅ Adicionar resposta automática ao lead (opcional)
4. ✅ Integrar com CRM (HubSpot, Pipedrive, etc) - opcional

---

**Dúvidas? Siga o guia passo a passo!** 🚀
