-- ================================================
-- TESTE DE WEBHOOK - Inserir Lead de Teste
-- ================================================
-- Copie e execute no Supabase SQL Editor para testar
-- o webhook com Zapier
-- ================================================

INSERT INTO leads (
    full_name,
    email,
    phone,
    company,
    message,
    form_type,
    plan,
    status
) VALUES (
    'João Silva - TESTE',
    'teste@example.com',
    '+55 11 98765-4321',
    'Empresa Teste Ltda',
    'Esta é uma mensagem de teste do webhook',
    'demo',
    NULL,
    'new'
);

-- ================================================
-- Após executar:
-- 1. Aguarde 5-10 segundos
-- 2. Verifique seu email: heliocwoi@gmail.com
-- 3. Você deve receber um email com os dados acima
-- ================================================
