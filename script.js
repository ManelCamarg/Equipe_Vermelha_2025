// JavaScript para Animação de Rolagem e Carrossel Automático
document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DA ANIMAÇÃO DE ENTRADA ---
    const animatedElements = document.querySelectorAll('.animated');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Adiciona delay escalonado para cada elemento
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- EFEITO PARALLAX REMOVIDO ---
    // Removido para evitar movimento indesejado da tela

    // --- EFEITOS DE MOUSE PARA IMAGENS (REDUZIDO) ---
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.02)'; // Reduzido de 1.05 para 1.02
            img.style.filter = 'brightness(1.05)'; // Removido rotate e outros filtros
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
            img.style.filter = 'brightness(1)';
        });
    });

    // --- NAVEGAÇÃO SUAVE CORRIGIDA ---
    document.querySelectorAll('header nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcula a posição considerando o header fixo (70px de altura)
                const headerHeight = 70;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- EFEITO DE FOGO NA LOGO ---
    const logo = document.querySelector('.logo-titulo .img1');
    const header = document.querySelector('header');
    
    if (logo && header) {
        logo.addEventListener('click', () => {
            // Cria o efeito de fogo
            const fireEffect = document.createElement('div');
            fireEffect.className = 'fire-effect';
            header.appendChild(fireEffect);
            
            // Cria partículas de fogo
            const particlesContainer = document.createElement('div');
            particlesContainer.className = 'fire-particles';
            header.appendChild(particlesContainer);
            
            // Gera partículas de chamas cartoon para todo o header
            for (let i = 0; i < 40; i++) {
                const particle = document.createElement('div');
                particle.className = 'fire-particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = (Math.random() * 40 + 60) + '%'; // Partículas começam na parte inferior
                particle.style.animationDelay = Math.random() * 1.2 + 's';
                particle.style.animationDuration = (Math.random() * 0.8 + 2.2) + 's';
                particle.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
                particlesContainer.appendChild(particle);
            }
            
            // Remove os efeitos após a animação
            setTimeout(() => {
                if (fireEffect.parentNode) {
                    fireEffect.parentNode.removeChild(fireEffect);
                }
                if (particlesContainer.parentNode) {
                    particlesContainer.parentNode.removeChild(particlesContainer);
                }
            }, 2000);
        });
    }

    // --- CARROSSEL COMPLETAMENTE REESCRITO ---
    const carousel = document.querySelector('.carousel');
    const track = document.querySelector('.carousel-track');
    
    if (carousel && track) {
        const slides = document.querySelectorAll('.carousel-slide');
        const nextButton = document.querySelector('.carousel-button--right');
        const prevButton = document.querySelector('.carousel-button--left');
        const dots = document.querySelectorAll('.carousel-indicator');
        
        let currentSlide = 0;
        let autoplayInterval;

        // Função para mostrar slide específico
        function showSlide(index) {
            // Remove classe ativa de todos os slides e dots
            slides.forEach(slide => slide.classList.remove('current-slide'));
            dots.forEach(dot => dot.classList.remove('current-slide'));
            
            // Adiciona classe ativa ao slide e dot atual
            slides[index].classList.add('current-slide');
            dots[index].classList.add('current-slide');
            
            // Move o track
            track.style.transform = `translateX(-${index * 100}%)`;
            currentSlide = index;
        }

        // Função para próximo slide
        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }

        // Função para slide anterior
        function prevSlide() {
            const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
            showSlide(prev);
        }

        // Autoplay
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 4000);
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        // Event listeners
        nextButton.addEventListener('click', () => {
            stopAutoplay();
            nextSlide();
            startAutoplay();
        });

        prevButton.addEventListener('click', () => {
            stopAutoplay();
            prevSlide();
            startAutoplay();
        });

        // Dots navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoplay();
                showSlide(index);
                startAutoplay();
            });
        });

        // Pausar autoplay no hover
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        // Inicializar
        showSlide(0);
        startAutoplay();
    }

    // --- EFEITOS DE PARTÍCULAS FLUTUANTES (REDUZIDO) ---
    function createFloatingParticles() {
        const particleCount = 5; // Reduzido de 15 para 5
        const colors = ['#dc852e', '#f4a261', '#781716'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = Math.random() * 2 + 1 + 'px'; // Reduzido tamanho
            particle.style.height = particle.style.width;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '-1';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.opacity = Math.random() * 0.2 + 0.1; // Reduzido opacidade
            
            document.body.appendChild(particle);
            
            // Animação da partícula mais lenta e suave
            const animateParticle = () => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                const duration = Math.random() * 30 + 20; // Mais lento
                
                particle.style.transition = `all ${duration}s ease-in-out`; // Mudado para ease-in-out
                particle.style.transform = `translate(${x}px, ${y}px)`;
                
                setTimeout(() => {
                    animateParticle();
                }, duration * 1000);
            };
            
            setTimeout(animateParticle, Math.random() * 10000); // Delay maior
        }
    }
    
    createFloatingParticles();

    // --- EFEITOS DE CURSOR PERSONALIZADO (SIMPLIFICADO) ---
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.width = '15px';
    cursor.style.height = '15px';
    cursor.style.background = 'rgba(220, 133, 46, 0.3)';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transition = 'all 0.2s ease';
    cursor.style.opacity = '0.5';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 7.5 + 'px';
        cursor.style.top = e.clientY - 7.5 + 'px';
    });

    // --- EFEITO DE LOADING INICIAL ---
    const loadingScreen = document.createElement('div');
    loadingScreen.style.position = 'fixed';
    loadingScreen.style.top = '0';
    loadingScreen.style.left = '0';
    loadingScreen.style.width = '100%';
    loadingScreen.style.height = '100%';
    loadingScreen.style.background = 'linear-gradient(135deg, #781716, #dc852e)';
    loadingScreen.style.zIndex = '10000';
    loadingScreen.style.display = 'flex';
    loadingScreen.style.alignItems = 'center';
    loadingScreen.style.justifyContent = 'center';
    loadingScreen.style.flexDirection = 'column';
    
    const loadingText = document.createElement('h1');
    loadingText.textContent = 'EQUIPE VERMELHA';
    loadingText.style.color = 'white';
    loadingText.style.fontSize = '3rem';
    loadingText.style.animation = 'pulse 1s ease-in-out infinite';
    loadingScreen.appendChild(loadingText);
    
    document.body.appendChild(loadingScreen);
    
    // Remove a tela de loading após 2 segundos
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 1s ease';
        setTimeout(() => {
            document.body.removeChild(loadingScreen);
        }, 1000);
    }, 2000);

    // --- FUNCIONALIDADE DE ALTERNÂNCIA DE TEMA ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const body = document.body;
    
    // Verifica se há preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Define o tema inicial
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
        themeToggle.classList.add('dark');
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }
    
    // Carrega posição salva do botão
    const savedPosition = localStorage.getItem('themeButtonPosition');
    if (savedPosition) {
        const position = JSON.parse(savedPosition);
        themeToggle.style.top = position.top + 'px';
        themeToggle.style.right = 'auto';
        themeToggle.style.left = position.left + 'px';
        themeToggle.style.transform = 'none';
    }
    
    // Event listener para alternar tema
    themeToggle.addEventListener('click', (e) => {
        // Só alterna tema se não estiver arrastando
        if (!themeToggle.classList.contains('dragging')) {
            body.classList.toggle('dark-mode');
            themeToggle.classList.toggle('dark');
            
            if (body.classList.contains('dark-mode')) {
                themeIcon.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            }
        }
    });
    
    // --- FUNCIONALIDADE DE ARRASTAR O BOTÃO ---
    let isDragging = false;
    let startX, startY, initialX, initialY;
    
    themeToggle.addEventListener('mousedown', (e) => {
        isDragging = true;
        themeToggle.classList.add('dragging');
        
        startX = e.clientX;
        startY = e.clientY;
        
        const rect = themeToggle.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;
        
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        let newX = initialX + deltaX;
        let newY = initialY + deltaY;
        
        // Limita o botão dentro da viewport
        const buttonSize = 45;
        const maxX = window.innerWidth - buttonSize;
        const maxY = window.innerHeight - buttonSize;
        
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        
        themeToggle.style.left = newX + 'px';
        themeToggle.style.top = newY + 'px';
        themeToggle.style.right = 'auto';
        themeToggle.style.transform = 'none';
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            themeToggle.classList.remove('dragging');
            
            // Salva a posição
            const rect = themeToggle.getBoundingClientRect();
            const position = {
                left: rect.left,
                top: rect.top
            };
            localStorage.setItem('themeButtonPosition', JSON.stringify(position));
        }
    });
    
    // Previne o comportamento padrão de arrastar
    themeToggle.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
    
    // Escuta mudanças na preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                body.classList.add('dark-mode');
                themeToggle.classList.add('dark');
                themeIcon.textContent = '☀️';
            } else {
                body.classList.remove('dark-mode');
                themeToggle.classList.remove('dark');
                themeIcon.textContent = '🌙';
            }
        }
    });
});