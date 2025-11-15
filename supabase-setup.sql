-- ================================================
-- DENT-VISION AI - SUPABASE DATABASE SETUP
-- ================================================
-- Execute este SQL no Supabase Dashboard:
-- Dashboard → SQL Editor → New Query → Cole e Execute
-- ================================================

-- 1. Criar tabela de leads
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Dados do Lead
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    message TEXT,
    
    -- Tipo de formulário
    form_type TEXT NOT NULL CHECK (form_type IN ('demo', 'trial', 'live_demo')),
    
    -- Plano escolhido (para trial)
    plan TEXT CHECK (plan IN ('starter', 'pro', 'enterprise')),
    
    -- Status do lead
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
    
    -- Metadados
    source TEXT DEFAULT 'website',
    user_agent TEXT,
    ip_address INET,
    
    -- Índices para busca rápida
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- 2. Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_form_type ON leads(form_type);

-- 3. Ativar Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 4. Política: Permitir INSERT público (para formulários do site)
CREATE POLICY "Anyone can insert leads"
    ON leads
    FOR INSERT
    WITH CHECK (true);

-- 5. Política: Apenas usuários autenticados podem ver leads
CREATE POLICY "Authenticated users can view leads"
    ON leads
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- 6. Política: Apenas usuários autenticados podem atualizar leads
CREATE POLICY "Authenticated users can update leads"
    ON leads
    FOR UPDATE
    USING (auth.role() = 'authenticated');

-- ================================================
-- VIEWS ÚTEIS PARA ANÁLISE
-- ================================================

-- View: Leads por status
CREATE OR REPLACE VIEW leads_by_status AS
SELECT 
    status,
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as last_7_days,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as last_30_days
FROM leads
GROUP BY status
ORDER BY total DESC;

-- View: Leads por tipo de formulário
CREATE OR REPLACE VIEW leads_by_form_type AS
SELECT 
    form_type,
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as last_7_days,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as last_30_days
FROM leads
GROUP BY form_type
ORDER BY total DESC;

-- View: Leads por plano (trial)
CREATE OR REPLACE VIEW leads_by_plan AS
SELECT 
    COALESCE(plan, 'not_specified') as plan,
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as last_7_days,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as last_30_days
FROM leads
WHERE form_type = 'trial'
GROUP BY plan
ORDER BY total DESC;

-- View: Dashboard resumo
CREATE OR REPLACE VIEW leads_dashboard AS
SELECT 
    COUNT(*) as total_leads,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as today,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as this_week,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as this_month,
    COUNT(*) FILTER (WHERE status = 'new') as new_leads,
    COUNT(*) FILTER (WHERE status = 'contacted') as contacted,
    COUNT(*) FILTER (WHERE status = 'qualified') as qualified,
    COUNT(*) FILTER (WHERE status = 'converted') as converted
FROM leads;

-- ================================================
-- FUNÇÃO PARA NOTIFICAÇÃO (OPCIONAL)
-- ================================================
-- Esta função pode ser usada para enviar notificações
-- quando um novo lead é criado

CREATE OR REPLACE FUNCTION notify_new_lead()
RETURNS TRIGGER AS $$
BEGIN
    -- Aqui você pode adicionar lógica para enviar email/notificação
    -- Por enquanto, apenas registra no log
    RAISE NOTICE 'New lead created: % (%) - Form: %', NEW.full_name, NEW.email, NEW.form_type;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para chamar a função
CREATE TRIGGER on_lead_created
    AFTER INSERT ON leads
    FOR EACH ROW
    EXECUTE FUNCTION notify_new_lead();

-- ================================================
-- SETUP COMPLETO! ✅
-- ================================================
-- Próximos passos:
-- 1. Execute este SQL no Supabase SQL Editor
-- 2. Verifique se a tabela foi criada em Table Editor
-- 3. Configure o site para enviar dados
-- ================================================
