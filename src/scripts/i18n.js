// scripts/i18n.js
class I18n {
    constructor() {
        this.language = localStorage.getItem('language') || 'en';
        this.translations = {};
    }

    async init() {
        await this.loadTranslations(this.language);
        this.updateDOM();
    }

    async loadTranslations(lang) {
        try {
            const response = await fetch(`/i18n/${lang}.json`);
            this.translations = await response.json();
        } catch (error) {
            console.error('Failed to load translations:', error);
        }
    }

    async setLanguage(lang) {
        this.language = lang;
        localStorage.setItem('language', lang);
        await this.loadTranslations(lang);
        this.updateDOM();
    }

    translate(key) {
        return this.translations[key] || key;
    }

    updateDOM() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.translate(key);
        });
    }
}

const i18n = new I18n();
export default i18n;