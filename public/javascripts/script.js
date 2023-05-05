
document.addEventListener('DOMContentLoaded', function () {
    const search = document.querySelector('.input-group input'),
        tableBody = document.querySelector('.table_body tbody'),
        table_rows = document.querySelectorAll('tbody tr');

    search.addEventListener('input', searchTable);

    // console.log(search)

function searchTable(){

        // console.log(table_rows)

    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();

        row.classList.toggle('hide',table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
        // console.log(row.textContent);
    });

    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 ==0) ? 'transparent' : '#0000000b';
    });
}
});
