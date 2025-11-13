// Footer Interactivity
document.addEventListener('DOMContentLoaded', function() {
    const footerSections = document.querySelectorAll('.footer-section');
    
    // Função para verificar se é mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Função para inicializar o menu mobile
    function initMobileMenu() {
        if (isMobile()) {
            // Adiciona a classe 'mobile' ao footer para estilização específica
            document.querySelector('footer').classList.add('mobile');
            
            // Adiciona evento de clique nos títulos das seções
            footerSections.forEach(section => {
                const title = section.querySelector('h4');
                if (title) {
                    // Remove event listeners antigos para evitar duplicação
                    const newTitle = title.cloneNode(true);
                    title.parentNode.replaceChild(newTitle, title);
                    
                    newTitle.addEventListener('click', function(e) {
                        if (isMobile()) {
                            // Fecha outras seções abertas
                            footerSections.forEach(s => {
                                if (s !== section) {
                                    s.classList.remove('active');
                                }
                            });
                            
                            // Alterna a seção clicada
                            section.classList.toggle('active');
                        }
                    });
                }
            });
        } else {
            // Remove a classe 'mobile' e 'active' em telas maiores
            const footer = document.querySelector('footer');
            if (footer) {
                footer.classList.remove('mobile');
            }
            footerSections.forEach(section => {
                section.classList.remove('active');
            });
        }
    }
    
    // Executa na inicialização
    initMobileMenu();
    
    // Reexecuta quando a janela for redimensionada
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            initMobileMenu();
        }, 250);
    });

    // Smooth scrolling para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
