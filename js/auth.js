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

// Adiciona o botão de logout ao header
function addLogoutButton() {
    // Verifica se já existe um botão de login
    if (document.querySelector('.login-btn')) {
        return;
    }
    
    // Encontra o container do header
    const headerContainer = document.querySelector('.header-container');
    if (!headerContainer) return;
    
    // Cria o botão de logout
    const logoutBtn = document.createElement('a');
    logoutBtn.href = '#';
    logoutBtn.className = 'btn btn-sm';
    logoutBtn.id = 'logoutBtn';
    logoutBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        Sair
    `;
    
    // Adiciona o evento de clique
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        logout();
    });
    
    // Adiciona o botão ao header
    headerContainer.appendChild(logoutBtn);
}

// Verifica a autenticação quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    // Adiciona o botão de logout se o usuário estiver autenticado
    if (window.location.pathname.endsWith('login.html')) {
        // Se estiver na página de login, não adiciona o botão de logout
        return;
    }
    
    // Adiciona o botão de logout após um pequeno atraso para garantir que o header esteja carregado
    setTimeout(addLogoutButton, 100);
});
