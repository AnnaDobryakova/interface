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

        const orderData = {
            orderNumber: selections.first_title.replace('order', ''),
            documentName: `Предварительное технико-коммерческое предложение_Заказ ${selections.first_title.replace('order', '')}.docx`,
            date: new Date().toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
        };
        localStorage.setItem('orderData', JSON.stringify(orderData));
    
        // Переход на страницу с результатами
        window.location.href = 'processed_data.html';

        // Получаем выбранные файлы
        const kpFile = fileMapping.kp[selections.first_title];
        const tpFile = fileMapping.tp[selections.second_title];
        const patternFile = document.getElementById('pattern').value;

            // Скачивание файлов по одному
        const filesToDownload = [
            { name: kpFile, path: `../files/${kpFile}` },
            { name: tpFile, path: `../files/${tpFile}` },
            patternFile && { name: 'Шаблон.docx', path: patternFile }
        ].filter(Boolean);

        filesToDownload.forEach((file, index) => {
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = file.path;
                link.download = file.name;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }, index * 500);
        });

        // Очистка формы после скачивания
        setTimeout(() => {
            document.getElementById('mainForm').reset();
            localStorage.removeItem('documentSelections');
            alert('Все документы успешно скачаны!');
        }, filesToDownload.length * 500 + 500);
    });
});