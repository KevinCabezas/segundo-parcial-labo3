// document.addEventListener('DOMContentLoaded', function () {
//     console.log("DOM cargado");
    
//     const checkboxes = document.querySelectorAll('.filter-toggle');

//     checkboxes.forEach(checkbox => {
//         checkbox.addEventListener('change', function () {
//             const column = this.getAttribute('data-column');
//             const checked = this.checked;
//             toggleColumn(column, checked);
//         });
//     });

//     function toggleColumn(column, show) {
//         console.log(`Toggling column: ${column}, Show: ${show}`);
        
//         const table = document.getElementById('table-items-c');
//         const headers = table.querySelectorAll('th');
//         const rows = table.querySelectorAll('tbody tr');

//         headers.forEach((header, index) => {
//             if (header.getAttribute('data-column') === column) {
//                 header.style.display = show ? '' : 'none';
//                 rows.forEach(row => {
//                     const cells = row.querySelectorAll('td');
//                     cells[index].style.display = show ? '' : 'none';
//                 });
//             }
//         });
//     }
// });


export function controlerColumns() {
    const checkboxes = document.querySelectorAll('.filter-toggle');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const column = this.getAttribute('data-column');
            const checked = this.checked;
            toggleColumn(column, checked);
        });
    });
}


function toggleColumn(column, show) {
    // console.log(`Toggling column: ${column}, Show: ${show}`);
    
    const table = document.getElementById('table-items-c');
    const headers = table.querySelectorAll('th');
    const rows = table.querySelectorAll('tbody tr');

    headers.forEach((header, index) => {
        if (header.getAttribute('data-column') === column) {
            header.style.display = show ? '' : 'none';
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                cells[index].style.display = show ? '' : 'none';
            });
        }
    });
}

export function actualizarVisibilidadColumnas() {
    // console.log("Actualizando visibilidad de columnas");
    const table = document.getElementById('table-items-c');
    const headers = table.querySelectorAll('th');
    const rows = table.querySelectorAll('tbody tr');
  
    headers.forEach((header, index) => {
      const column = header.getAttribute('data-column');
      const checkbox = document.querySelector(`.filter-toggle[data-column="${column}"]`);
  
      if (checkbox) {
        const show = checkbox.checked;
        header.style.display = show ? '' : 'none';
  
        rows.forEach(row => {
          const cells = row.querySelectorAll('td');
          cells[index].style.display = show ? '' : 'none';
        });
      }
    });
  }