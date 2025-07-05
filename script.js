document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const themeToggleButton = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const yearSpan = document.getElementById('year');
    
    // --- INÍCIO DO CÓDIGO DE PAGINAÇÃO ---

    // Verifica se estamos na página inicial antes de executar
    const postsContainer = document.getElementById('posts-container');
    if (postsContainer) {
        const paginationContainer = document.getElementById('pagination-container');
        const posts = Array.from(postsContainer.getElementsByClassName('post-card'));
        
        // Defina quantos artigos você quer por página
        const postsPerPage = 2; // Mude para 10 quando tiver mais conteúdo
        let currentPage = 1;

        function displayPosts(page) {
            // Esconde todos os posts
            posts.forEach(post => post.classList.add('hidden'));

            const startIndex = (page - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            const postsToShow = posts.slice(startIndex, endIndex);

            // Mostra apenas os posts da página atual
            postsToShow.forEach(post => post.classList.remove('hidden'));
        }

        function setupPagination() {
            const pageCount = Math.ceil(posts.length / postsPerPage);
            paginationContainer.innerHTML = ''; // Limpa botões antigos

            for (let i = 1; i <= pageCount; i++) {
                const button = document.createElement('button');
                button.innerText = i;
                // Estilização com TailwindCSS
                button.className = 'px-4 py-2 rounded-md transition-colors duration-300';

                if (i === currentPage) {
                    // Estilo do botão da página ativa
                    button.classList.add('bg-fuchsia-500', 'text-white', 'font-bold');
                } else {
                    // Estilo dos outros botões
                    button.classList.add('bg-gray-800', 'text-gray-300', 'hover:bg-fuchsia-400');
                }

                button.addEventListener('click', () => {
                    currentPage = i;
                    displayPosts(currentPage);
                    setupPagination(); // Recria os botões para atualizar o estilo do botão ativo
                    window.scrollTo(0, 0); // Opcional: Rola a página para o topo ao trocar de página
                });

                paginationContainer.appendChild(button);
            }
        }

        // Inicia o sistema
        displayPosts(currentPage);
        setupPagination();
    }
    // --- FIM DO CÓDIGO DE PAGINAÇÃO ---

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (darkIcon) darkIcon.classList.remove('hidden');
            if (lightIcon) lightIcon.classList.add('hidden');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            if (darkIcon) darkIcon.classList.add('hidden');
            if (lightIcon) lightIcon.classList.remove('hidden');
        }
    };

    if (themeToggleButton) {
        // Usa o tema salvo ou prefere o escuro como padrão
        const currentTheme = localStorage.getItem('theme') || 'dark';
        applyTheme(currentTheme);

        themeToggleButton.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }

    // Supondo que a biblioteca hljs seja carregada em páginas de artigo
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }

    // Função de cópia modernizada
    document.querySelectorAll('pre code').forEach((block) => {
        const pre = block.parentNode;
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.textContent = 'Copiar';
        pre.appendChild(copyButton);

        copyButton.addEventListener('click', () => {
            const codeToCopy = block.innerText;

            navigator.clipboard.writeText(codeToCopy).then(() => {
                copyButton.textContent = 'Copiado!';
                setTimeout(() => {
                    copyButton.textContent = 'Copiar';
                }, 2000);
            }).catch(err => {
                console.error('Falha ao copiar o código.', err);
                copyButton.textContent = 'Erro';
                setTimeout(() => {
                    copyButton.textContent = 'Copiar';
                }, 2000);
            });
        });
    });
});
