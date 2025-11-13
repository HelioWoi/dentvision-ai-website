// Footer Interactivity
document.addEventListener('DOMContentLoaded', function() {
    const footerSections = document.querySelectorAll('.footer-section');
    
    // Função para verificar se é mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Aplica estilos ao footer
    function applyFooterStyles() {
        const footer = document.querySelector('footer');
        const footerBottom = document.querySelector('.footer-bottom');
        const footerDisclaimer = document.querySelector('.footer-disclaimer');
        const disclaimerText = document.querySelector('.footer-disclaimer p');
        
        if (footerBottom) {
            footerBottom.style.padding = '0 20px';
            footerBottom.style.textAlign = 'left';
            footerBottom.style.maxWidth = '1200px';
            footerBottom.style.margin = '0 auto';
            footerBottom.style.width = '100%';
        }
        
        if (footerDisclaimer) {
            footerDisclaimer.style.marginBottom = '15px';
            footerDisclaimer.style.textAlign = 'left';
        }
        
        if (disclaimerText) {
            disclaimerText.style.fontSize = '0.75rem';
            disclaimerText.style.lineHeight = '1.6';
            disclaimerText.style.color = 'var(--muted)';
            disclaimerText.style.opacity = '0.8';
            disclaimerText.style.margin = '0 0 15px 0';
            disclaimerText.style.textAlign = 'left';
            disclaimerText.style.padding = '0';
        }
    }
    
    // Função para inicializar o menu mobile
    function initMobileMenu() {
        applyFooterStyles(); // Aplica os estilos do footer
        
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
