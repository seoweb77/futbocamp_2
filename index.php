<?php
$page_title = "Календарь сборов Футбо-Кэмп";
$breadcrumbs = [
    ['url' => '/', 'name' => 'Главная'],
    ['url' => '', 'name' => 'Календарь сборов']
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
    <style>
        :root {
            --primary: #2c3e50;
            --secondary: #3498db;
            --accent: #e74c3c;
            --light: #ecf0f1;
            --dark: #2c3e50;
            --success: #27ae60;
            --warning: #f39c12;
        }
    </style>
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

        <!-- Заголовок -->
        <header class="calendar-header">
            <h1><i class="fas fa-calendar-alt"></i> Календарь сборов Футбо-Кэмп</h1>
            <p class="subtitle">Выберите сезон для просмотра доступных дат сборов</p>
        </header>

        <!-- Сезоны -->
        <div class="seasons-grid">
            <a href="весна-2026.php" class="season-card spring">
                <div class="season-icon">
                    <i class="fas fa-seedling"></i>
                </div>
                <h3>Весна 2026</h3>
                <p class="season-dates">Март - Май 2026</p>
                <div class="season-stats">
                    <span><i class="fas fa-calendar-day"></i> 3 смены</span>
                    <span><i class="fas fa-child"></i> 7-15 лет</span>
                </div>
                <div class="season-status available">
                    <i class="fas fa-check-circle"></i> Есть места
                </div>
            </a>

            <a href="лето-2026.php" class="season-card summer">
                <div class="season-icon">
                    <i class="fas fa-sun"></i>
                </div>
                <h3>Лето 2026</h3>
                <p class="season-dates">Июнь - Август 2026</p>
                <div class="season-stats">
                    <span><i class="fas fa-calendar-day"></i> 4 смены</span>
                    <span><i class="fas fa-child"></i> 7-15 лет</span>
                </div>
                <div class="season-status available">
                    <i class="fas fa-check-circle"></i> Есть места
                </div>
            </a>

            <a href="осень-2026.php" class="season-card autumn">
                <div class="season-icon">
                    <i class="fas fa-leaf"></i>
                </div>
                <h3>Осень 2026</h3>
                <p class="season-dates">Сентябрь - Ноябрь 2026</p>
                <div class="season-stats">
                    <span><i class="fas fa-calendar-day"></i> 3 смены</span>
                    <span><i class="fas fa-child"></i> 7-15 лет</span>
                </div>
                <div class="season-status waiting">
                    <i class="fas fa-clock"></i> Бронирование открывается
                </div>
            </a>

            <a href="зима-2026.php" class="season-card winter">
                <div class="season-icon">
                    <i class="fas fa-snowflake"></i>
                </div>
                <h3>Зима 2026</h3>
                <p class="season-dates">Декабрь 2026 - Февраль 2027</p>
                <div class="season-stats">
                    <span><i class="fas fa-calendar-day"></i> 2 смены</span>
                    <span><i class="fas fa-child"></i> 7-15 лет</span>
                </div>
                <div class="season-status planning">
                    <i class="fas fa-calendar-plus"></i> В планировании
                </div>
            </a>
        </div>

        <!-- Информационный блок -->
        <div class="info-box">
            <div class="info-icon">
                <i class="fas fa-info-circle"></i>
            </div>
            <div class="info-content">
                <h3>Как забронировать место?</h3>
                <p>Выберите сезон → выберите месяц → выберите подходящие даты смены → свяжитесь с нами для подтверждения бронирования</p>
            </div>
            <div class="info-phone">
                <a href="tel:+79939502905" class="phone-btn">
                    <i class="fas fa-phone-alt"></i> 8 993 950 29 05
                </a>
            </div>
        </div>
    </div>

    <script>
        // Анимация карточек сезонов
        document.querySelectorAll('.season-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Подсветка текущего сезона
        const currentMonth = new Date().getMonth();
        let currentSeason = '';
        
        if (currentMonth >= 2 && currentMonth <= 4) currentSeason = 'spring';
        else if (currentMonth >= 5 && currentMonth <= 7) currentSeason = 'summer';
        else if (currentMonth >= 8 && currentMonth <= 10) currentSeason = 'autumn';
        else currentSeason = 'winter';
        
        document.querySelector(`.season-card.${currentSeason}`).classList.add('current-season');
    </script>
</body>
</html>