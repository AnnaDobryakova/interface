document.addEventListener('DOMContentLoaded', function() {
    const radioButtons = document.querySelectorAll('input[type="radio"][name="order"]');
    const confirmBtn = document.getElementById('confirmBtn');
    const urlParams = new URLSearchParams(window.location.search);
    const targetField = urlParams.get('target');
    
    // Получаем текущие выбранные значения
    let currentSelections = JSON.parse(localStorage.getItem('documentSelections')) || {};

    // Активация кнопки при выборе
    function updateConfirmButton() {
        confirmBtn.disabled = !document.querySelector('input[name="order"]:checked');
    }

    radioButtons.forEach(radio => {
        radio.addEventListener('change', updateConfirmButton);
    });

    // Обработчик подтверждения выбора
    confirmBtn.addEventListener('click', function() {
        const selectedOrder = document.querySelector('input[name="order"]:checked')?.value;
        
        if (!selectedOrder) {
            alert('Пожалуйста, выберите документ!');
            return;
        }

        // Сохраняем выбор
        currentSelections[targetField] = selectedOrder;
        localStorage.setItem('documentSelections', JSON.stringify(currentSelections));
        
        // Проверяем соответствие номеров заказов, если оба выбраны
        // Возвращаемся на главную страницу
        window.location.href = '../htmls/index.html';
    });
});