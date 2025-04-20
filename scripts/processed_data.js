document.addEventListener('DOMContentLoaded', function() {
    const orderData = JSON.parse(localStorage.getItem('currentOrderData'));
    
    if (!orderData) {
        alert('Данные о заказе не найдены!');
        window.location.href = 'selected_data.html';
        return;
    }

    // Обновляем данные на странице
    document.getElementById('orderNumberTitle').textContent = `Заказ ${orderData.orderNumber}`;
    document.getElementById('orderDate').textContent = orderData.receiptDate; // Дата из заказа
    document.getElementById('documentName').textContent = orderData.documentName;

    // Обработчик кнопки "Сохранить"
    document.getElementById('downloadBtn').addEventListener('click', function() {
        try {
            const orderNumber = orderData.orderNumber;

            const fileMapping = {
                kp: {
                    '1': 'КП_Заказ_1.docx',
                    '2': 'КП_Заказ_2.docx',
                    '3': 'КП_Заказ_3.docx',
                    '4': 'КП_Заказ_4.docx'
                },
                tp: {
                    '1': 'ТП_Заказ_1.docx',
                    '2': 'ТП_Заказ_2.docx',
                    '3': 'ТП_Заказ_3.docx',
                    '4': 'ТП_Заказ_4.docx'
                }
            };

            // Проверяем существование файлов
            if (!fileMapping.kp[orderNumber] || !fileMapping.tp[orderNumber]) {
                throw new Error('Файлы для выбранного заказа не найдены');
            }

            const filesToDownload = [
                { 
                    name: fileMapping.kp[orderNumber], 
                    path: `../files/${fileMapping.kp[orderNumber]}` 
                },
                { 
                    name: fileMapping.tp[orderNumber], 
                    path: `../files/${fileMapping.tp[orderNumber]}` 
                },
                { 
                    name: 'Шаблон.docx', 
                    path: '../files/Шаблон.docx' 
                }
            ];

            // Скачивание файлов
            filesToDownload.forEach((file, index) => {
                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = file.path;

                    const newName = file.name.split('_')[0] || file.name;
                    link.download = newName;
                    
                    // Обработчик ошибок
                    link.onerror = () => {
                        console.error(`Ошибка при скачивании файла: ${file.name}`);
                    };
                    
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }, index * 3000);
            });

            alert(`Файлы для заказа ${orderNumber} успешно сохранены!`);
            
            // Очищаем только нужные данные
            localStorage.removeItem('currentOrderData');

        } catch (error) {
            console.error('Ошибка при сохранении файлов:', error);
            alert(`Произошла ошибка: ${error.message}`);
        }
    });

    document.getElementById('backBtn').addEventListener('click', function() {
        window.location.href = '../htmls/index.html';
    })
});