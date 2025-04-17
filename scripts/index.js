document.addEventListener('DOMContentLoaded', function() {
    // Проверка локального запуска
    if (window.location.protocol === 'file:') {
        alert('Для работы приложения запустите локальный сервер:\n\n1. Установите http-server: npm install -g http-server\n2. Запустите: http-server -p 8080\n3. Откройте http://localhost:8080');
        return;
    }

    // Загрузка сохраненных данных
    const selections = JSON.parse(localStorage.getItem('documentSelections')) || {};
    
    // Полный маппинг всех 8 файлов с правильными путями
    const fileMapping = {
        kp: {
            'order1': 'КП_Заказ_1.docx',
            'order2': 'КП_Заказ_2.docx',
            'order3': 'КП_Заказ_3.docx',
            'order4': 'КП_Заказ_4.docx'
        },
        tp: {
            'order1': 'ТП_Заказ_1.docx',
            'order2': 'ТП_Заказ_2.docx',
            'order3': 'ТП_Заказ_3.docx',
            'order4': 'ТП_Заказ_4.docx'
        }
    };

    // Заполнение полей формы (только имена файлов)
    if (selections.first_title) {
        document.getElementById('first_title').value = fileMapping.kp[selections.first_title] || 'Не выбран';
    }
    if (selections.second_title) {
        document.getElementById('second_title').value = fileMapping.tp[selections.second_title] || 'Не выбран';
    }

    // Обработчик кнопки "Сгенерировать ТКП"
    document.getElementById('downloadBtn').addEventListener('click', async function(e) {
        e.preventDefault();
        
        // Проверка выбора
        if (!selections.first_title || !selections.second_title) {
            alert('Пожалуйста, выберите оба документа!');
            return;
        }
        
        // Проверка соответствия номеров
        if (selections.first_title !== selections.second_title) {
            alert('Номера заказов должны совпадать!');
            return;
        }

        // Получаем сохраненные данные заказа
        const orderData = JSON.parse(localStorage.getItem('currentOrderData')) || {};
    
        // Создаем объект с данными заказа
        const fullOrderData = {
            ...orderData,
            orderNumber: selections.first_title.replace('order', ''),
            documentName: `Предварительное технико-коммерческое предложение_Заказ ${selections.first_title.replace('order', '')}.docx`
        };
        localStorage.setItem('currentOrderData', JSON.stringify(fullOrderData));
        
        // Очищаем форму
        document.getElementById('mainForm').reset();
        localStorage.removeItem('documentSelections');

        
        // Переходим на страницу результатов
        window.location.href = '../htmls/processed_data.html';
    });
});