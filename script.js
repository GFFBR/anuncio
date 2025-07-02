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
    // Este código pode ser removido se você não quiser o banner,
    // mas é uma boa prática para transparência.
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const acceptCookiesButton = document.getElementById('accept-cookies');

    if (cookieBanner && acceptCookiesButton) {
        if (!localStorage.getItem('cookie_consent')) {
            cookieBanner.classList.remove('hidden');
        }

        acceptCookiesButton.addEventListener('click', function() {
            localStorage.setItem('cookie_consent', 'true');
            cookieBanner.style.display = 'none';
        });
    }
});



