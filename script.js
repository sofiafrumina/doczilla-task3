$(document).ready(function () {
fetch('http://localhost:3000/proxy/todos')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log('Error:', error));


    // Функция для отображения задач в таблице
    function displayTasks(tasks) {
        const tableBody = $('#taskTable');
        tableBody.empty();

        tasks.forEach(task => {
            const row = `
                <tr>
                    <td>${task.id}</td>
                    <td>${task.name}</td>
                    <td>${task.shortDesc}</td>
                    <td>${task.fullDesc}</td>
                    <td>${task.date}</td>
                    <td>${task.status}</td>
                </tr>
            `;
            tableBody.append(row);
        });
    }

    // Функция для получения списка задач
    function fetchTasks() {
        $.get(apiUrl, function (data) {
            displayTasks(data);
        });
    }

    // Поиск задач по названию
    $('#searchBtn').click(function () {
        const query = $('#search').val();
        if (query) {
            $.get(`${apiUrl}/find?q=${query}`, function (data) {
                displayTasks(data);
            }).fail(function () {
                alert("Error fetching tasks by name");
            });
        }
    });

    // Фильтр задач по диапазону дат и статусу
    $('#filterBtn').click(function () {
        const from = $('#fromDate').val();
        const to = $('#toDate').val();
        const status = $('#status').val();

        let queryParams = `from=${new Date(from).getTime()}&to=${new Date(to).getTime()}`;
        if (status) queryParams += `&status=${status}`;

        $.get(`${apiUrl}/date?${queryParams}`, function (data) {
            displayTasks(data);
        }).fail(function () {
            alert("Error fetching tasks by date range");
        });
    });

    // Инициализация датапикера для выбора дат
    $('#fromDate').datepicker({ dateFormat: 'yy-mm-dd' });
    $('#toDate').datepicker({ dateFormat: 'yy-mm-dd' });

    // Загрузка всех задач при старте
    fetchTasks();
});
