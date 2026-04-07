document.addEventListener('DOMContentLoaded', () => {
    const userStr = localStorage.getItem('user');

    if (userStr) {
        const user = JSON.parse(userStr);
        const navLinks = document.getElementById('nav-links');

        if (navLinks) {
            // Find and remove login/signup list items
            const loginBtn = navLinks.querySelector('.nav-btn-login');
            if (loginBtn && loginBtn.parentElement) {
                loginBtn.parentElement.remove();
            }

            const signupBtn = navLinks.querySelector('.nav-btn-signup');
            if (signupBtn && signupBtn.parentElement) {
                signupBtn.parentElement.remove();
            }

            // Create profile item
            const profileLi = document.createElement('li');
            profileLi.style.display = 'flex';
            profileLi.style.alignItems = 'center';
            profileLi.style.gap = '10px';
            profileLi.innerHTML = `
                <img src="${user.photoURL}" alt="${user.displayName}" 
                     style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #0A84FF; cursor: pointer; object-fit: cover; transition: transform 0.2s;"
                     title="${user.displayName} (Click to Logout)"
                     id="authProfilePic">
            `;

            navLinks.appendChild(profileLi);

            const profilePic = document.getElementById('authProfilePic');
            profilePic.addEventListener('mouseover', () => profilePic.style.transform = 'scale(1.1)');
            profilePic.addEventListener('mouseout', () => profilePic.style.transform = 'scale(1)');

            // Add logout functionality
            profilePic.addEventListener('click', () => {
                if(confirm(`Logged in as ${user.displayName}.\nAre you sure you want to log out?`)) {
                    localStorage.removeItem('user');
                    window.location.reload();
                }
            });
        }
    }
});
