// Установка Service Worker
self.addEventListener('install', (event) => {
    // Ждем, пока процесс установки не завершится
    event.waitUntil(
        // Открываем новый кэш с именем 'my-cache'
        caches.open('my-cache')
        .then((cache) => {
            // Добавляем в кэш ресурсы, которые нужно закэшировать
            return cache.addAll([
                '/index.html',    // Главная страница
                '/style.css',    // Файл стилей CSS
                '/script.js',     // JavaScript файл
                '/offline.html'   // Страница для оффлайн режима
            ]);
        })
    );
});

// Обработка запросов
self.addEventListener('fetch', (event) => {
    event.respondWith(
        // Ищем в кэше соответствующий запросу ресурс
        caches.match(event.request)
        .then((response) => {
            // Если ресурс найден в кэше, возвращаем его
            // Если нет, делаем сетевой запрос для получения ресурса
            return response || fetch(event.request);
        })
        .catch(() => {
            // Если произошла ошибка при поиске в кэше или сетевом запросе,
            // возвращаем специальную страницу для оффлайн режима
            return caches.match('/offline.html');
        })
    );
});

// уведомления
self.addEventListener('push', (event) => {
    // Устанавливаем заголовок уведомления
    const title = 'Уведомление';

    // Формируем параметры уведомления
    const options = {
        body: event.data.text(), // Текст уведомления, полученный из события
        icon: '/icon.png',       // Иконка уведомления
        badge: '/badge.png'      // Значок уведомления (обычно маленькая иконка)
    };

    // Отображаем уведомление
    // Ожидаем, пока уведомление не будет показано
    event.waitUntil(
        // Вызываем метод showNotification() для регистрации уведомления
        self.registration.showNotification(title, options)
    );
});

// importScripts("https://api.mindbox.ru/scripts/service-worker.js");