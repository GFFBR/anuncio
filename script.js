document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const themeToggleButton = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const yearSpan = document.getElementById('year');

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

