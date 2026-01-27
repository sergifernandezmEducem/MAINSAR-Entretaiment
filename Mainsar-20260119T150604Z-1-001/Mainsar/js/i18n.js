function updateContent(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });

    // Update document title if needed
    if (translations[lang] && translations[lang]['site_title']) {
        document.title = translations[lang]['site_title'];
    }

    // Update lang attribute of html tag
    document.documentElement.lang = lang;
}

function setLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
    updateContent(lang);

    // Update select value if it exists
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.value = lang;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'ca';

    // Add event listener to language select
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.value = savedLang;
        langSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }

    updateContent(savedLang);
});
