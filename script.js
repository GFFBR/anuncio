document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

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
