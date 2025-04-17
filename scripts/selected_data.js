document.addEventListener('DOMContentLoaded', function() {
    const radioButtons = document.querySelectorAll('input[type="radio"][name="order"]');
    const confirmBtn = document.getElementById('confirm-btn'); // Изменено здесь
    const urlParams = new URLSearchParams(window.location.search);
    const targetField = urlParams.get('target');
    
    // Проверяем, найдена ли кнопка
    if (!confirmBtn) {
        console.error('Кнопка "Использовать для генерации" не найдена!');
        return;
    }

    // Получаем текущие выбранные значения
    let currentSelections = JSON.parse(localStorage.getItem('documentSelections')) || {};

    // Инициализируем кнопку как неактивную
    confirmBtn.disabled = true;

    // Активация кнопки при выборе
    function updateConfirmButton() {
        confirmBtn.disabled = !document.querySelector('input[name="order"]:checked');
    }

    radioButtons.forEach(radio => {
        radio.addEventListener('change', updateConfirmButton);
    });

    // Обработчик подтверждения выбора
    confirmBtn.addEventListener('click', function() {
        
        const selectedRadio = document.querySelector('input[name="order"]:checked');
        
        if (!selectedRadio) {
            alert('Пожалуйста, выберите документ!');
            return;
        }

        const orderId = selectedRadio.value;

        const orderData = {
            orderNumber: orderId.replace('order', ''),
            orderName: document.getElementById(`name-${orderId}`).textContent,
            receiptDate: document.getElementById(`receipt-date-${orderId}`).textContent,
            documentName: `Предварительное технико-коммерческое предложение_Заказ ${orderId.replace('order', '')}.docx`
        };

        // Сохраняем выбор для главной страницы
        currentSelections[targetField] = orderId;
        localStorage.setItem('documentSelections', JSON.stringify(currentSelections));
        
        // Сохраняем полные данные для страницы processed_data
        // localStorage.setItem('orderData', JSON.stringify(orderData));
        localStorage.setItem('currentOrderData', JSON.stringify(orderData));
        
        
        // Возвращаемся на главную страницу
        window.location.href = '../htmls/index.html';
    });

});