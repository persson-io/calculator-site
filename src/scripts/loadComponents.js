async function loadComponents(pageTitle) {
    // Load header
    const headerResponse = await fetch('/components/header.html');
    const headerText = await headerResponse.text();
    document.querySelector('header').innerHTML = headerText;
    document.getElementById('page-title').textContent = pageTitle;

    // Load footer
    const footerResponse = await fetch('/components/footer.html');
    const footerText = await footerResponse.text();
    document.querySelector('footer').innerHTML = footerText;
}