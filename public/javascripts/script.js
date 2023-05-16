
document.addEventListener('DOMContentLoaded', function () {
    const search = document.querySelector('.input-group input'),
        tableBody = document.querySelector('.table_body tbody'),
        table_rows = document.querySelectorAll('tbody tr'),
        table_headings = document.querySelectorAll('thead th');

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

    table_headings.forEach((head,i)=>{
        let sort_arc = true;
        head.onclick = ()=>{
            table_headings.forEach(head => head.classList.remove('active'));
            head.classList.add('active');

            document.querySelectorAll('td').forEach(td => td.classList.remove('active'))
            table_rows.forEach(row => {
                row.querySelectorAll('td')[i].classList.add('active');
            })

            head.classList.toggle('asc', sort_arc)
            sort_arc = head.classList.contains('asc') ? false : true;

            sortTable(i,sort_arc);
        }
    })

    function sortTable(column,sort_arc){
        [...table_rows].sort((a,b) => {
            let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
                second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

            return sort_arc ? (first_row < second_row ? -1 : 1) : (first_row < second_row ? -1 : 1);
        })
            .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
    }
});
