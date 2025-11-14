// Verifica se o usuário está autenticado
function checkAuth() {
    // Se estiver na página de login, não precisa verificar
    if (window.location.pathname.endsWith('login.html')) {
        return;
    }
    
    // Verifica se o cookie de autenticação existe
    const cookies = document.cookie.split(';');
    let isAuthenticated = false;
    
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('authenticated=')) {
            isAuthenticated = cookie.substring('authenticated='.length, cookie.length) === 'true';
            break;
        }
    }
    
    // Se não estiver autenticado, redireciona para a página de login
    if (!isAuthenticated) {
        window.location.href = 'login.html';
    }
}

// Função para fazer logout
function logout() {
    // Remove o cookie de autenticação
    document.cookie = 'authenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Redireciona para a página de login
    window.location.href = 'login.html';
}

// Função addLogoutButton removida - botão de logout não é mais necessário

// Verifica a autenticação quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
});
