document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileBtn = document.getElementById('mobileMenu');
    const nav = document.getElementById('navLinks');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => nav.classList.toggle('active'));
    }

    // Плавный скролл по якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                if (nav && nav.classList.contains('active')) nav.classList.remove('active');
            }
        });
    });

    // Форма обратной связи
    const form = document.getElementById('callbackForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами.');
            form.reset();
        });
    }

    // Демо-скачивание методичек
    document.querySelectorAll('.btn-download').forEach(btn => {
        btn.addEventListener('click', () => alert('Демонстрационная версия материалов. Полный файл можно запросить в учебной части.'));
    });

    // Кнопка "наверх"
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    if (backToTop) {
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Анимация при скролле (fade-up)
    const fadeElements = document.querySelectorAll('.fade-up');
    const observerFade = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerFade.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeElements.forEach(el => observerFade.observe(el));

    // АНИМАЦИЯ ЦИФР СТАТИСТИКИ
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    const observerStats = new IntersectionObserver((entries) => {
        if (animated) return;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.innerText, 10);
                    if (isNaN(target)) return;
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.innerText = target;
                            clearInterval(timer);
                        } else {
                            stat.innerText = Math.floor(current);
                        }
                    }, 20);
                });
                observerStats.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    const statsSection = document.querySelector('.stats');
    if (statsSection) observerStats.observe(statsSection);

    // Таймер обратного отсчёта до 1 августа 2026
    function updateCountdown() {
        const targetDate = new Date(2026, 7, 1, 23, 59, 59);
        const now = new Date();
        const diff = targetDate - now;
        let days = 0, hours = 0, minutes = 0, seconds = 0;
        if (diff > 0) {
            days = Math.floor(diff / (1000 * 60 * 60 * 24));
            hours = Math.floor((diff % (86400000)) / (1000 * 60 * 60));
            minutes = Math.floor((diff % (3600000)) / (1000 * 60));
            seconds = Math.floor((diff % (60000)) / 1000);
        }
        const timerSpan = document.getElementById('headerTimer');
        if (timerSpan) {
            timerSpan.innerHTML = `<span>${days}</span>д <span>${hours}</span>ч <span>${minutes}</span>м <span>${seconds}</span>с`;
        }
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 3D tilt для карточек (кроме .no-tilt)
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.card:not(.no-tilt), .teacher-card, .parent-card, .methodic-card, .partner-logo'), {
            max: 8,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }

    // Шторка (выезжающая панель)
    const curtain = document.getElementById('curtain');
    const openBtn = document.getElementById('openCurtainBtn');
    const closeBtn = document.getElementById('closeCurtain');
    if (openBtn) {
        openBtn.addEventListener('click', () => curtain.classList.add('open'));
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', () => curtain.classList.remove('open'));
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && curtain && curtain.classList.contains('open')) {
            curtain.classList.remove('open');
        }
    });
});
