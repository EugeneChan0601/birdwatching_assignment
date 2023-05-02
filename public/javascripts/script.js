
document.addEventListener('DOMContentLoaded', function () {
    const search = document.querySelector('.input-group input'),
        tableBody = document.querySelector('.table_body tbody'),
        table_rows = document.querySelectorAll('tbody tr');

    search.addEventListener('input', searchTable);

function searchTable(){

    let visibleRowCount = 0;


    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();

        if (table_data.indexOf(search_data) < 0) {
            row.classList.add('hide');
            row.style.display = 'none';
        } else {
            row.classList.remove('hide');
            row.style.display = 'table-row';
        }

        row.style.setProperty('--delay', i / 25 + 's');
        // console.log(row.textContent);
    });

    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.classList.add('collapsed');
    });

    document.querySelectorAll('tbody tr.hide').forEach((hidden_row) => {
        hidden_row.classList.remove('collapsed');
    });

    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 ==0) ? 'transparent' : '#0000000b';
    });
}
});
