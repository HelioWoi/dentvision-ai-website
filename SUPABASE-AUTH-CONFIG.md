# 🔐 CONFIGURAÇÃO CRÍTICA - Magic Links

## ⚠️ PROBLEMA IDENTIFICADO

O erro que você está vendo:
```
http://127.0.0.1:49766/#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired
```

Indica que o **Supabase não está configurado** para aceitar o redirect URL `https://partner.dent-vision.ai/`

---

## ✅ SOLUÇÃO (Execute AGORA)

### Passo 1: Acesse o Dashboard
1. Abra: https://supabase.com/dashboard/project/zjdjjhtofouafygkctne
2. Faça login se necessário

### Passo 2: Vá para Authentication
1. No menu lateral esquerdo, clique em **Authentication** (ícone 🔐)
2. No submenu que aparece, clique em **URL Configuration**

### Passo 3: Adicione o Redirect URL
1. Encontre a seção **"Redirect URLs"** (pode estar como "Additional Redirect URLs")
2. No campo de texto, adicione exatamente: `https://partner.dent-vision.ai/`
3. Clique no botão **"Add URL"** ou **"+"**
4. Clique em **"Save"** ou **"Update"** no final da página

### Passo 4: Verificar
✅ A URL `https://partner.dent-vision.ai/` deve aparecer na lista de URLs permitidas

---

## 🧪 TESTAR

1. Volte ao site: https://dent-vision.ai
2. Clique em **"Start Free Trial"**
3. Preencha o formulário com seu email
4. Clique em **"Start Free Trial"**
5. Você verá o modal: "Welcome to your 14-day free trial 🎉 / Check your email"
6. Verifique seu email
7. Clique no magic link
8. ✅ Você deve ser redirecionado para: `https://partner.dent-vision.ai/`

---

## 📝 EXPLICAÇÃO

O Supabase precisa saber quais URLs são **permitidas** para redirect por segurança.

**Sem esta configuração:**
- Magic links tentam redirecionar para localhost (127.0.0.1)
- Isso causa erro "access_denied" ou "otp_expired"
- Usuários não conseguem acessar o trial

**Com a configuração:**
- Magic links redirecionam para `https://partner.dent-vision.ai/`
- Usuários são autenticados automaticamente
- Acesso ao dashboard do trial funciona perfeitamente

---

## ❓ FAQ

### P: Por que localhost aparece no erro?
**R:** Porque você está testando localmente. O Supabase tenta redirecionar para onde o formulário foi submetido, mas só funciona se a URL estiver na lista permitida.

### P: Preciso adicionar outros URLs?
**R:** Não. Apenas `https://partner.dent-vision.ai/` é necessário para produção.

### P: E se eu testar localmente?
**R:** Para testar localmente, você pode adicionar temporariamente:
- `http://localhost:8080`
- `http://127.0.0.1:8080`

Mas lembre-se de remover depois para segurança.

### P: Quanto tempo leva para a configuração fazer efeito?
**R:** Imediato! Assim que você salvar, já funciona.

---

## 🚨 IMPORTANTE

Esta é uma configuração **OBRIGATÓRIA** para que os magic links funcionem em produção.

Sem ela:
- ❌ Usuários não conseguem fazer trial
- ❌ Magic links expiram imediatamente
- ❌ Erros de "access_denied"

Com ela:
- ✅ Magic links funcionam perfeitamente
- ✅ Usuários são autenticados automaticamente
- ✅ Acesso ao trial sem problemas

---

## 📞 Se Ainda Não Funcionar

1. Limpe o cache do navegador
2. Tente com um email diferente
3. Verifique a caixa de spam
4. Confirme que salvou a configuração no Supabase
5. Aguarde 1-2 minutos e teste novamente

---

**Execute estes passos AGORA e teste novamente!** 🚀
