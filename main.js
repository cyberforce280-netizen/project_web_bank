document.addEventListener('DOMContentLoaded', () => {
    
    // 1. تأثير عداد الأرقام (Counter Animation)
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target.toLocaleString() + (target === 30 ? '' : '+');
                }
            };
            updateCount();
        });
    }

    // تشغيل العداد عند التمرير إليه
    const statsSection = document.querySelector('.stats-bar');
    let observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting){
            animateCounters();
            observer.unobserve(statsSection);
        }
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);

    // 2. تغيير شفافية الهيدر عند التمرير
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = "10px 0";
            header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
        } else {
            header.style.padding = "15px 0";
            header.style.boxShadow = "none";
        }
    });

    // 3. التحكم في القائمة للجوال (Hamburger Menu)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
    }
});

// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // 1. التحقق من التفضيل المحفوظ في localStorage عند تحميل الصفحة
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // 2. منطق التبديل عند الضغط على الزر
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            
            if (body.classList.contains('light-mode')) {
                // وضع النهار
                if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                // وضع الليل (الافتراضي)
                if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    
    // إغلاق قائمة الموبايل عند تغيير الثيم أو الضغط (اختياري)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});