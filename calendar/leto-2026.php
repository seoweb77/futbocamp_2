<?php
$season_name = "Лето 2026";
$page_title = "Календарь сборов - $season_name";
$breadcrumbs = [
    ['url' => '/', 'name' => 'Главная'],
    ['url' => 'index.php', 'name' => 'Календарь сборов'],
    ['url' => '', 'name' => $season_name]
];

$months = [
    [
        'name' => 'Июнь 2026',
        'dates' => [
            ['period' => '1-10 июня', 'status' => 'available', 'age' => '7-12 лет', 'places' => '12 мест'],
            ['period' => '18-28 июня', 'status' => 'available', 'age' => '10-15 лет', 'places' => '8 мест']
        ]
    ],
    [
        'name' => 'Июль 2026',
        'dates' => [
            ['period' => '1-10 июля', 'status' => 'waiting', 'age' => '7-12 лет', 'places' => '15 мест'],
            ['period' => '18-28 июля', 'status' => 'available', 'age' => '10-15 лет', 'places' => '10 мест']
        ]
    ],
    [
        'name' => 'Август 2026',
        'dates' => [
            ['period' => '1-10 августа', 'status' => 'available', 'age' => '7-15 лет', 'places' => '20 мест'],
            ['period' => '18-28 августа', 'status' => 'available', 'age' => '7-15 лет', 'places' => '18 мест']
        ]
    ]
];
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $page_title; ?> | Футбо-Кэмп</title>
    <link rel="stylesheet" href="/css/calendar.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="calendar-container">
        <!-- Хлебные крошки -->
        <nav class="breadcrumbs" aria-label="Хлебные крошки">
            <ol>
                <?php foreach ($breadcrumbs as $crumb): ?>
                    <li>
                        <?php if ($crumb['url']): ?>
                            <a href="<?php echo $crumb['url']; ?>"><?php echo $crumb['name']; ?></a>
                        <?php else: ?>
                            <span class="current"><?php echo $crumb['name']; ?></span>
                        <?php endif; ?>
                    </li>
                <?php endforeach; ?>
            </ol>
        </nav>

        <!-- Заголовок сезона -->
        <header class="season-header summer">
            <div class="season-title">
                <h1><i class="fas fa-seedling"></i> <?php echo $season_name; ?></h1>
                <p class="season-subtitle">Футбольные сборы в летний период</p>
            </div>
            <div class="season-highlights">
                <div class="highlight">
                    <i class="fas fa-calendar-check"></i>
                    <span>6 смен</span>
                </div>
                <div class="highlight">
                    <i class="fas fa-child"></i>
                    <span>Возраст 7-15 лет</span>
                </div>
                <div class="highlight">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>Сириус, Сочи</span>
                </div>
            </div>
        </header>

        <!-- Кнопка телефона (фиксированная) -->
        <div class="floating-phone">
            <a href="tel:+79939502905" class="phone-float">
                <i class="fas fa-phone-alt"></i>
                <span>Уточнить место</span>
            </a>
        </div>

        <!-- Месяцы -->
        <div class="months-accordion">
            <?php foreach ($months as $index => $month): ?>
            <div class="month-card">
                <button class="month-header" onclick="toggleMonth(<?php echo $index; ?>)">
                    <h3><i class="fas fa-calendar"></i> <?php echo $month['name']; ?></h3>
                    <span class="toggle-icon">
                        <i class="fas fa-chevron-down"></i>
                    </span>
                </button>
                
                <div class="month-content" id="month-<?php echo $index; ?>">
                    <div class="dates-grid">
                        <?php foreach ($month['dates'] as $date): ?>
                        <div class="date-card status-<?php echo $date['status']; ?>">
                            <div class="date-header">
                                <h4><?php echo $date['period']; ?></h4>
                                <span class="status-badge">
                                    <?php 
                                    switch($date['status']) {
                                        case 'available': echo '<i class="fas fa-check-circle"></i> Есть места'; break;
                                        case 'waiting': echo '<i class="fas fa-clock"></i> Ожидание'; break;
                                        case 'full': echo '<i class="fas fa-times-circle"></i> Заполнено'; break;
                                    }
                                    ?>
                                </span>
                            </div>
                            
                            <div class="date-details">
                                <div class="detail">
                                    <i class="fas fa-user-friends"></i>
                                    <span>Возраст: <?php echo $date['age']; ?></span>
                                </div>
                                <div class="detail">
                                    <i class="fas fa-bed"></i>
                                    <span>Места: <?php echo $date['places']; ?></span>
                                </div>
                                <div class="detail">
                                    <i class="fas fa-ruble-sign"></i>
                                    <span>от 90,000 ₽</span>
                                </div>
                            </div>
                            
                            <div class="date-actions">
                                <a href="#booking-form" class="btn-book" onclick="bookDate('<?php echo $month['name']; ?>', '<?php echo $date['period']; ?>')">
                                    <i class="fas fa-calendar-plus"></i> Забронировать
                                </a>
                                <button class="btn-info" onclick="showDateInfo('<?php echo $date['period']; ?>')">
                                    <i class="fas fa-info-circle"></i> Подробнее
                                </button>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>

        <!-- Форма бронирования -->
        <div class="booking-form" id="booking-form">
            <h3><i class="fas fa-edit"></i> Заявка на бронирование</h3>
            <form id="bookingForm">
                <div class="form-group">
                    <label for="selectedDate"><i class="fas fa-calendar-day"></i> Выбранная дата:</label>
                    <input type="text" id="selectedDate" readonly class="form-control">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="childName"><i class="fas fa-child"></i> Имя ребенка:</label>
                        <input type="text" id="childName" required class="form-control" placeholder="Введите имя">
                    </div>
                    
                    <div class="form-group">
                        <label for="childAge"><i class="fas fa-birthday-cake"></i> Возраст:</label>
                        <input type="number" id="childAge" required class="form-control" min="7" max="15" placeholder="Возраст">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="parentPhone"><i class="fas fa-phone-alt"></i> Телефон родителя:</label>
                    <input type="tel" id="parentPhone" required class="form-control" value="+7 993 950 29 05">
                </div>
                
                <div class="form-group">
                    <label for="parentEmail"><i class="fas fa-envelope"></i> Email:</label>
                    <input type="email" id="parentEmail" required class="form-control" placeholder="email@example.com">
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn-submit">
                        <i class="fas fa-paper-plane"></i> Отправить заявку
                    </button>
                    <a href="tel:+79939502905" class="btn-call">
                        <i class="fas fa-phone-alt"></i> Позвонить сейчас
                    </a>
                </div>
            </form>
        </div>

        <!-- Информация о лагере -->
        <div class="camp-info">
            <div class="info-card">
                <i class="fas fa-map-marker-alt fa-2x"></i>
                <h4>Место проведения</h4>
                <p>Город-отель "Бархатные сезоны" спортивный квартал "Сириус"<br>г. Сочи,  ул. Фигурная, 29</p>
            </div>
            
            <div class="info-card">
                <i class="fas fa-clock fa-2x"></i>
                <h4>Длительность смены</h4>
                <p>10 дней / 9 ночей<br>Заезд воскресенье, отъезд вторник</p>
            </div>
            
            <div class="info-card">
                <i class="fas fa-utensils fa-2x"></i>
                <h4>Питание</h4>
                <p>5-разовое сбалансированное<br>С учетом спортивных нагрузок</p>
            </div>
            
            <div class="info-card">
                <i class="fas fa-user-tie fa-2x"></i>
                <h4>Тренеры</h4>
                <p>Лицензированные специалисты<br>Опыт работы с детьми от 5 лет</p>
            </div>
        </div>
    </div>

    <script>
        // Аккордеон месяцев
        function toggleMonth(index) {
            const content = document.getElementById(`month-${index}`);
            const icon = content.previousElementSibling.querySelector('.toggle-icon i');
            
            if (content.style.display === 'block') {
                content.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                content.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                
                // Прокрутка к открытому месяцу
                content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        // Открыть первый месяц по умолчанию
        document.addEventListener('DOMContentLoaded', function() {
            toggleMonth(0);
        });

        // Бронирование даты
        function bookDate(month, period) {
            document.getElementById('selectedDate').value = `${month}, ${period}`;
            document.getElementById('booking-form').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }

        // Показать информацию о дате
        function showDateInfo(period) {
            alert(`Информация о смене ${period}:\n\n• 3 тренировки в день\n• Мастер-классы с профи\n• Медицинское сопровождение\n• Развлекательные мероприятия\n• Фото- и видеоотчеты`);
        }

        // Отправка формы
        document.getElementById('bookingForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                date: document.getElementById('selectedDate').value,
                name: document.getElementById('childName').value,
                age: document.getElementById('childAge').value,
                phone: document.getElementById('parentPhone').value,
                email: document.getElementById('parentEmail').value
            };
            
            // Здесь должна быть отправка на сервер
            alert(`Заявка отправлена!\n\nС вами свяжутся по телефону ${formData.phone} для подтверждения бронирования.`);
            this.reset();
            document.getElementById('selectedDate').value = '';
        });
    </script>
</body>
</html>