// ================================================
// DENT-VISION AI - SUPABASE CONFIGURATION
// ================================================

const SUPABASE_CONFIG = {
    url: 'https://zjdjjhtofouafygkctne.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZGpqaHRvZm91YWZ5Z2tjdG5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMDAzOTEsImV4cCI6MjA3ODc3NjM5MX0.wP4aTabMK_Ok6WyfwoVcuPO1Zzu9LHvdTcMFSQvAOWM'
};

// Inicializar cliente Supabase
const supabase = window.supabase.createClient(
    SUPABASE_CONFIG.url,
    SUPABASE_CONFIG.anonKey
);

// ================================================
// FUNÇÕES DE LEAD MANAGEMENT
// ================================================

/**
 * Criar novo lead no banco de dados
 * @param {Object} leadData - Dados do lead
 * @returns {Promise<Object>} - Resultado da operação
 */
async function createLead(leadData) {
    try {
        // Validar dados obrigatórios
        if (!leadData.full_name || !leadData.email || !leadData.form_type) {
            throw new Error('Campos obrigatórios faltando: full_name, email, form_type');
        }

        // Adicionar metadados
        const enrichedData = {
            ...leadData,
            user_agent: navigator.userAgent,
            source: 'website',
            created_at: new Date().toISOString()
        };

        // Inserir no Supabase
        const { data, error } = await supabase
            .from('leads')
            .insert([enrichedData])
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        console.log('✅ Lead created successfully:', data);
        return { success: true, data };

    } catch (error) {
        console.error('❌ Error creating lead:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Obter estatísticas de leads (requer autenticação)
 * @returns {Promise<Object>} - Dashboard stats
 */
async function getLeadsStats() {
    try {
        const { data, error } = await supabase
            .from('leads_dashboard')
            .select('*')
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching stats:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Buscar leads recentes (requer autenticação)
 * @param {number} limit - Número de leads para retornar
 * @returns {Promise<Array>} - Lista de leads
 */
async function getRecentLeads(limit = 10) {
    try {
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching leads:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Atualizar status do lead (requer autenticação)
 * @param {string} leadId - ID do lead
 * @param {string} status - Novo status
 * @returns {Promise<Object>} - Resultado da operação
 */
async function updateLeadStatus(leadId, status) {
    try {
        const validStatuses = ['new', 'contacted', 'qualified', 'converted', 'closed'];
        
        if (!validStatuses.includes(status)) {
            throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
        }

        const { data, error } = await supabase
            .from('leads')
            .update({ status })
            .eq('id', leadId)
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error updating lead:', error);
        return { success: false, error: error.message };
    }
}

// ================================================
// HELPERS
// ================================================

/**
 * Validar formato de email
 * @param {string} email
 * @returns {boolean}
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Sanitizar dados do formulário
 * @param {FormData} formData
 * @returns {Object}
 */
function sanitizeFormData(formData) {
    const data = {};
    for (let [key, value] of formData.entries()) {
        // Ignorar campos honey pot
        if (key === '_honey' || key.startsWith('_')) continue;
        
        // Limpar e adicionar
        data[key] = typeof value === 'string' ? value.trim() : value;
    }
    return data;
}

// Exportar funções globalmente
window.SupabaseLeads = {
    createLead,
    getLeadsStats,
    getRecentLeads,
    updateLeadStatus,
    validateEmail,
    sanitizeFormData
};

console.log('✅ Supabase configuration loaded');
