// Мобильное меню
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navList = document.querySelector('.nav-list');

mobileMenuBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
    mobileMenuBtn.innerHTML = navList.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Плавная прокрутка для всех якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Загрузка Google Maps через iframe (без API ключа)
function loadGoogleMaps() {
    const mapContainer = document.getElementById('map');
    const fallback = document.querySelector('.map-fallback');
    
    if (!mapContainer) return;
    
    // Координаты Спортивного квартала "Сарапул" в Сочи
    const lat = 43.5855;
    const lng = 39.7231;
    const address = "Сочи, ул. Фигурная, 20";
    
    // Создаем iframe с Google Maps Embed API
    const iframe = document.createElement('iframe');
    
    // Вариант 1: Embed с маркером (рекомендуется)
    iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.478676340757!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDM1JzA3LjgiTiAzOcKwNDMnMjMuMiJF!5e0!3m2!1sru!2sru!4v${Date.now()}!5m2!1sru!2sru`;
    
    // Альтернативный вариант с поиском по адресу
    // iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.478676340757!2d39.7231!3d43.5855!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDM1JzA3LjgiTiAzOcKwNDMnMjMuMiJF!5e0!3m2!1sru!2sru!4v1690000000000`;
    
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.border = '0';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.title = 'Карта расположения Футбо-Кэмп в Сочи';
    
    // Добавляем обработчики событий
    iframe.onload = () => {
        console.log('Google Maps iframe загружен');
        if (fallback) {
            fallback.style.display = 'none';
        }
    };
    
    iframe.onerror = () => {
        console.error('Ошибка загрузки Google Maps');
        showAlternativeMap();
    };
    
    // Очищаем контейнер и добавляем iframe
    mapContainer.innerHTML = '';
    mapContainer.appendChild(iframe);
}

// Альтернативный вариант, если iframe не работает
function showAlternativeMap() {
    const mapContainer = document.getElementById('map');
    
    if (!mapContainer) return;
    
    // Статическое изображение карты через Google Maps Static API
    // Примечание: Для этого нужен API ключ, но есть бесплатный лимит
    // Можно использовать без ключа для тестирования
    
    const lat = 43.5855;
    const lng = 39.7231;
    
    // Вариант с изображением (может потребоваться API ключ для production)
    const img = document.createElement('img');
    img.src = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=600x400&scale=2&markers=color:green%7Clabel:A%7C${lat},${lng}&language=ru&region=RU`;
    img.alt = 'Карта расположения Спортивного квартала Сарапул в Сочи';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '12px';
    
    // Обработчик ошибок для изображения
    img.onerror = () => {
        // Если и изображение не загрузилось, показываем ссылки
        mapContainer.innerHTML = `
            <div class="map-fallback" style="display: flex; flex-direction: column; gap: 20px; padding: 30px; text-align: center;">
                <i class="fas fa-map-marked-alt" style="font-size: 3rem; color: var(--primary-green);"></i>
                <div>
                    <h4 style="color: var(--primary-green); margin-bottom: 10px;">Спортивный квартал "Сарапул"</h4>
                    <p><strong>ул. Фигурная, 20</strong></p>
                    <p>Сочи, Краснодарский край</p>
                </div>
                
                <div style="margin-top: 20px;">
                    <p style="margin-bottom: 15px; font-weight: 600;">Построить маршрут:</p>
                    <div style="display: flex; flex-direction: column; gap: 10px; align-items: center;">
                        <a href="https://www.google.com/maps/dir//Сочи,+ул.+Фигурная,+20/@${lat},${lng},15z" 
                           target="_blank" 
                           class="btn btn-primary" 
                           style="display: inline-flex; align-items: center; gap: 10px; padding: 12px 25px;">
                            <i class="fab fa-google"></i>
                            Построить маршрут в Google Maps
                        </a>
                        <a href="https://yandex.ru/maps/11162/sochi/?ll=${lng}%2C${lat}&mode=routes&rtext=~${lat}%2C${lng}&rtt=auto&z=15" 
                           target="_blank" 
                           class="btn" 
                           style="background: #FFCC00; color: #000; display: inline-flex; align-items: center; gap: 10px; padding: 12px 25px;">
                            <i class="fab fa-yandex"></i>
                            Построить маршрут в Яндекс.Картах
                        </a>
                    </div>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: rgba(0,168,89,0.1); border-radius: 10px;">
                    <p style="margin-bottom: 10px;"><strong>Координаты для навигатора:</strong></p>
                    <p>43.5855° N, 39.7231° E</p>
                    <p style="font-size: 0.9rem; margin-top: 10px; color: #666;">Скопируйте координаты в ваше навигационное приложение</p>
                </div>
            </div>
        `;
    };
    
    mapContainer.appendChild(img);
}

// Анимация при скролле
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Наблюдаем за элементами для анимации
document.querySelectorAll('.stat-item, .field-card, .day-card, .coach-card').forEach(el => {
    observer.observe(el);
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Загружаем Google Maps через iframe...');
    loadGoogleMaps();
});
// Добавим этот код в конец файла script.js

// Управление кнопками прокрутки
const scrollDownBtn = document.querySelector('.scroll-down');
const scrollUpBtn = document.querySelector('.scroll-up');

function updateScrollButtons() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Всегда показываем обе кнопки, но регулируем их прозрачность в зависимости от позиции
    if (scrollDownBtn && scrollUpBtn) {
        // Кнопка "вниз" - скрываем, если мы внизу страницы
        if (scrollPosition + windowHeight >= documentHeight - 50) {
            scrollDownBtn.classList.add('hidden');
        } else {
            scrollDownBtn.classList.remove('hidden');
        }
        
        // Кнопка "вверх" - скрываем, если мы вверху страницы
        if (scrollPosition < 50) {
            scrollUpBtn.classList.add('hidden');
        } else {
            scrollUpBtn.classList.remove('hidden');
        }
    }
}
// Плавная прокрутка для кнопок навигации
document.querySelectorAll('.scroll-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === '#footer-bottom') {
            // Прокрутка в самый низ страницы
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        } else if (targetId === '#main') {
            // Прокрутка в самый верх страницы
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});
// Обновляем кнопки при скролле
window.addEventListener('scroll', updateScrollButtons);

// Инициализируем кнопки при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('Загружаем Google Maps через iframe...');
    loadGoogleMaps();
    
    // Инициализируем кнопки навигации
    updateScrollButtons();
});
// Модальное окно тренера
const coachModal = document.getElementById('coachModal');
const openCoachModalBtn = document.getElementById('openCoachModal');
const coachDetailsBtn = document.querySelector('.coach-details-btn');
const closeCoachModalBtn = document.getElementById('closeCoachModal');
const closeModalBtn = document.getElementById('closeModalBtn');

// Функция открытия модального окна
function openCoachModal() {
    coachModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
}

// Функция закрытия модального окна
function closeCoachModal() {
    coachModal.classList.remove('active');
    document.body.style.overflow = ''; // Восстанавливаем скролл
}

// Открытие модального окна при клике на имя тренера
if (openCoachModalBtn) {
    openCoachModalBtn.addEventListener('click', openCoachModal);
    openCoachModalBtn.style.cursor = 'pointer';
    openCoachModalBtn.title = 'Подробная информация о тренере';
}

// Открытие модального окна при клике на кнопку
if (coachDetailsBtn) {
    coachDetailsBtn.addEventListener('click', openCoachModal);
}

// Закрытие модального окна
if (closeCoachModalBtn) {
    closeCoachModalBtn.addEventListener('click', closeCoachModal);
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeCoachModal);
}

// Закрытие модального окна при клике на оверлей
coachModal.addEventListener('click', function(e) {
    if (e.target === coachModal) {
        closeCoachModal();
    }
});

// Закрытие модального окна при нажатии ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && coachModal.classList.contains('active')) {
        closeCoachModal();
    }
});

// Предотвращаем закрытие при клике внутри модального окна
const modalContent = document.querySelector('.modal-content');
if (modalContent) {
    modalContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}
// Обработка формы регистрации
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('campRegistrationForm');
    const successMessage = document.getElementById('successMessage');
    const notification = document.getElementById('notification');
    const submitBtn = form?.querySelector('.btn-submit');
    const phoneInput = document.getElementById('parentPhone');
    const commentsTextarea = document.getElementById('comments');
    
    // Маска для телефона
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.startsWith('7') || value.startsWith('8')) {
                value = value.substring(1);
            }
            
            let formatted = '+7 (';
            if (value.length > 0) formatted += value.substring(0, 3);
            if (value.length > 3) formatted += ') ' + value.substring(3, 6);
            if (value.length > 6) formatted += '-' + value.substring(6, 8);
            if (value.length > 8) formatted += '-' + value.substring(8, 10);
            
            e.target.value = formatted;
        });
    }
    
    // Ограничение символов в комментарии
    if (commentsTextarea) {
        commentsTextarea.addEventListener('input', function() {
            if (this.value.length > 500) {
                this.value = this.value.substring(0, 500);
                showError(this, 'Максимум 500 символов');
            }
        });
    }
    
    // Валидация возраста
    const ageInput = document.getElementById('childAge');
    if (ageInput) {
        ageInput.addEventListener('change', function() {
            const age = parseInt(this.value);
            if (age < 8 || age > 16) {
                showError(this, 'Возраст должен быть от 8 до 16 лет');
            } else {
                clearError(this);
            }
        });
    }
    
    // Валидация имени
    const nameInput = document.getElementById('childName');
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            if (!this.value.match(/^[А-Яа-яЁёA-Za-z\s]{2,50}$/)) {
                showError(this, 'Имя должно содержать только буквы (2-50 символов)');
            } else {
                clearError(this);
            }
        });
    }
    
    // Функция показа ошибки
    function showError(element, message) {
        element.classList.add('error');
        let errorDiv = element.nextElementSibling;
        
        if (!errorDiv || !errorDiv.classList.contains('error-message')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = '#dc3545';
            errorDiv.style.fontSize = '0.85rem';
            errorDiv.style.marginTop = '5px';
            element.parentNode.insertBefore(errorDiv, element.nextSibling);
        }
        
        errorDiv.textContent = message;
    }
    
    // Функция очистки ошибки
    function clearError(element) {
        element.classList.remove('error');
        const errorDiv = element.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.remove();
        }
    }
    
    // Показ уведомления
    function showNotification() {
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
    
    // Обработка отправки формы
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Проверяем валидность
            if (!this.checkValidity()) {
                // Показываем стандартные сообщения браузера
                this.reportValidity();
                return;
            }
            
            // Показываем индикатор загрузки
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Отправка...';
            }
            
            try {
                // Имитация отправки на сервер (2 секунды)
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Очищаем форму
                this.reset();
                
                // Скрываем форму и показываем сообщение об успехе
                this.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Показываем уведомление
                showNotification();
                
                // Прокручиваем к сообщению об успехе
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Скрываем сообщение об успехе через 8 секунд и показываем форму
                setTimeout(() => {
                    successMessage.style.display = 'none';
                    this.style.display = 'block';
                }, 8000);
                
            } catch (error) {
                console.error('Ошибка отправки формы:', error);
                alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
            } finally {
                // Восстанавливаем кнопку
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Отправить заявку';
                }
            }
            
            // Здесь можно добавить реальную отправку на сервер:
            /*
            const formData = new FormData(this);
            
            // Добавляем мета-данные
            formData.append('timestamp', new Date().toISOString());
            formData.append('source', 'futbo-camp.ru');
            
            try {
                const response = await fetch('/api/submit-application', {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    // Успешная отправка
                    this.reset();
                    successMessage.style.display = 'block';
                    showNotification();
                    
                    // Скрываем успешное сообщение через 8 секунд
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 8000);
                } else {
                    throw new Error('Ошибка сервера');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Ошибка отправки. Попробуйте еще раз.');
            }
            */
        });
    }
    
    // Добавляем обработчик для скрытия сообщения об успехе при клике
    successMessage?.addEventListener('click', function() {
        this.style.display = 'none';
        form.style.display = 'block';
    });
});