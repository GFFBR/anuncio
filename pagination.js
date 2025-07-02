document.addEventListener('DOMContentLoaded', function() {
    const PAGINAS = [
        'index.html',
        'pagina2.html'
    ];

    const container = document.getElementById('pagination-container');
    if (!container) return;

    let path = window.location.pathname;
    let currentPageFile = path.substring(path.lastIndexOf('/') + 1);
    if (currentPageFile === '') {
        currentPageFile = 'index.html';
    }

    const currentIndex = PAGINAS.indexOf(currentPageFile);
    if (currentIndex === -1) return;

    let paginationHTML = '';

    if (currentIndex > 0) {
        paginationHTML += `<a href="${PAGINAS[currentIndex - 1]}" class="pagination-link">&laquo; Anterior</a>`;
    } else {
        paginationHTML += `<span class="pagination-disabled">&laquo; Anterior</span>`;
    }

    PAGINAS.forEach((page, index) => {
        const pageNumber = index + 1;
        if (index === currentIndex) {
            paginationHTML += `<span class="pagination-active" aria-current="page">${pageNumber}</span>`;
        } else {
            paginationHTML += `<a href="${page}" class="pagination-link">${pageNumber}</a>`;
        }
    });

    if (currentIndex < PAGINAS.length - 1) {
        paginationHTML += `<a href="${PAGINAS[currentIndex + 1]}" class="pagination-link">Próxima &raquo;</a>`;
    } else {
        paginationHTML += `<span class="pagination-disabled">Próxima &raquo;</span>`;
    }

    container.innerHTML = paginationHTML;
});

