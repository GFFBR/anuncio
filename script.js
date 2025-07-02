document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Dynamic Year in Footer ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Cookie Consent Banner ---
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const acceptCookiesButton = document.getElementById('accept-cookies');

    // Check if the user has already consented
    if (!localStorage.getItem('cookie_consent')) {
        if(cookieBanner) cookieBanner.classList.remove('hidden');
    }

    if (acceptCookiesButton) {
        acceptCookiesButton.addEventListener('click', function() {
            // When the user clicks "Accept", we store this preference in localStorage
            localStorage.setItem('cookie_consent', 'true');
            if(cookieBanner) cookieBanner.style.display = 'none';
        });
    }

    // --- Phrase of the Day ---
    const frases = [
        "Grandes jornadas começam com pequenos passos.", "O conhecimento transforma realidades.", "Acredite no poder das suas ideias.", 
        "A persistência supera o talento.", "Cada dia é uma nova chance de recomeçar.", "Não espere por oportunidades, crie-as.", 
        "O fracasso é apenas um passo rumo ao sucesso.", "Coragem é agir apesar do medo.", "Pequenas ações diárias constroem grandes conquistas.", 
        "A gratidão transforma o que temos em suficiente.", "O impossível só existe até alguém provar o contrário.", "Você é mais forte do que imagina.", 
        "A disciplina é o caminho mais curto até o objetivo.", "Desafios são oportunidades disfarçadas.", "Não desista. Grandes coisas levam tempo.", 
        "Acredite no processo, ele te transforma.", "Aprenda com os erros e siga em frente.", "Seja a mudança que você deseja ver no mundo.", 
        "Você nunca saberá se não tentar.", "Não existe progresso sem desconforto.", "As melhores conquistas nascem da persistência.", 
        "Se você pode sonhar, pode realizar.", "A vida recompensa quem não desiste.", "O medo limita, o conhecimento liberta.", 
        "Confie no seu potencial, você é único.", "Não espere o momento perfeito, crie-o.", "A verdadeira liberdade está em aprender sempre.", 
        "Sonhos grandes exigem esforços grandes.", "A mente focada vence as distrações.", "Você é responsável pelo seu próprio sucesso.",
        // Adicionei mais algumas para variedade
        "O melhor investimento é em você mesmo.", "O sucesso começa onde termina sua zona de conforto.", "Seus pensamentos criam sua realidade.",
        "Cada passo, por menor que seja, te aproxima do objetivo.", "A força de vontade supera o cansaço.", "Seja constante, o progresso é inevitável.",
        "A paciência é a chave para grandes realizações.", "Seu futuro depende das suas ações de hoje.", "O caminho pode ser difícil, mas a vista vale a pena.",
        "Grandes vitórias nascem da resiliência.", "Enfrente os desafios como oportunidades de evolução.", "Você é capaz de muito mais do que acredita.",
        "A determinação transforma limites em possibilidades.", "Não existe sucesso sem esforço consistente.", "O aprendizado diário molda o sucesso futuro.",
        "Confie no processo, os resultados virão.", "Desistir nunca é a solução, ajustar é.", "A constância é a base do crescimento sólido."
    ];
    const fraseElement = document.getElementById('frase');
    if (fraseElement) {
        fraseElement.innerText = frases[Math.floor(Math.random() * frases.length)];
    }

    // --- Fetch Latest News ---
    const noticiasContainer = document.getElementById('noticias');
    if (noticiasContainer) {
        // Using a CORS proxy for the RSS feed to avoid browser restrictions.
        // RSS2JSON is a good option for this.
        const rssUrl = 'https://g1.globo.com/dynamo/rss2.xml';
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'ok') {
                    noticiasContainer.innerHTML = ''; // Clear the "loading" message
                    const items = data.items.slice(0, 5); // Get first 5 news items

                    items.forEach(item => {
                        // Sanitize content to prevent potential XSS issues
                        const title = item.title.replace(/<[^>]*>?/gm, '');
                        // The description from RSS often contains HTML, let's get a clean snippet.
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = item.description;
                        const snippet = tempDiv.textContent || tempDiv.innerText || '';
                        const cleanSnippet = snippet.substring(0, 120) + '...';

                        const articleHTML = `
                            <article class="bg-white p-6 rounded-lg shadow-md hover-lift">
                                <h3 class="text-xl font-bold mb-2">${title}</h3>
                                <p class="text-sm text-gray-500 mb-3">Publicado em: ${new Date(item.pubDate).toLocaleDateString('pt-BR')}</p>
                                
                                <!-- IMPORTANT FOR ADSENSE: Add your own value here! -->
                                <p class="text-gray-700 mb-4">
                                    <strong>Nossa Análise:</strong> 
                                    Aqui você pode adicionar um breve comentário ou resumo original sobre a notícia. 
                                    Isso agrega valor e é fundamental para as políticas do AdSense. 
                                    Exemplo: <em>"Esta notícia destaca uma importante mudança econômica que pode impactar o dia a dia..."</em>
                                </p>

                                <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="text-blue-600 font-semibold hover:underline">
                                    Leia a Matéria Completa &rarr;
                                </a>
                            </article>
                        `;
                        noticiasContainer.innerHTML += articleHTML;
                    });
                } else {
                    throw new Error('RSS feed could not be loaded.');
                }
            })
            .catch(error => {
                console.error("Erro ao carregar notícias:", error);
                noticiasContainer.innerHTML = "<p class='text-center text-red-500'>Não foi possível carregar as notícias no momento. Por favor, tente novamente mais tarde.</p>";
            });
    }

});


