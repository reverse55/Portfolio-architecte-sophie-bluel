document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('adress');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        // blank 
        if (email === "" || password === "") {
            errorMessage.textContent = 'Email et mot de passe sont requis!';
        } else {
            errorMessage.textContent = '';
            alert('tentative de connection de' + email);
        }
    });
});