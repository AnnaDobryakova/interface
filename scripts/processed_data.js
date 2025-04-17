document.addEventListener('DOMContentLoaded', function() {
    // Получаем сохраненные данные
    const orderData = JSON.parse(localStorage.getItem('currentOrderData'));
    
    if (!orderData) {
        alert('Данные о заказе не найдены!');
        window.location.href = 'selected_data.html';
        return;
    }

    // Обновляем данные на странице
    document.getElementById('orderNumberTitle').textContent = `Заказ ${orderData.orderNumber}`;
    document.getElementById('orderDate').textContent = orderData.receiptDate;
    document.getElementById('documentName').textContent = orderData.documentName;

    // Обработчики кнопок
    document.querySelectorAll('.result-list__button').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            alert(`Действие: ${action} для заказа ${orderData.orderNumber}`);
        });
    });
});