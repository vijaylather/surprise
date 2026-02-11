// 1. Password Verification Logic
function checkPassword() {
    const input = document.getElementById('passInput').value;
    const loginCard = document.querySelector('.login-card');
    
    // Replace 'MTQwMg==' with your Base64 encoded date
    // Example: btoa("1402") is "MTQwMg=="
    const encodedPass = "MTQwMg=="; 

    if (btoa(input) === encodedPass) {
        // Access Granted
        document.getElementById('passwordOverlay').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        
        // Start the background hearts only after unlocking
        setInterval(createHeart, 300);
    } else {
        // Access Denied - Shake Effect
        document.getElementById('errorMessage').innerText = "Incorrect code. Try again! ❤️";
        loginCard.classList.add('shake');
        
        // Remove shake class after animation so it can be re-triggered
        setTimeout(() => {
            loginCard.classList.remove('shake');
        }, 400);
    }
}

// 2. Valentine Reveal Logic
document.getElementById('revealBtn').addEventListener('click', function() {
    // Show the hidden message
    const hiddenSection = document.getElementById('hiddenMessage');
    hiddenSection.style.display = 'block';
    
    // Hide the button
    this.style.display = 'none';

    // Play the music
    const music = document.getElementById('valentineMusic');
    music.play().catch(error => {
        console.log("Playback prevented: ", error);
    });
});

// 3. Heart Creation Logic
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    const icons = ['❤️', '💖', '💕', '💗', '🌸'];
    heart.innerText = icons[Math.floor(Math.random() * icons.length)];
    
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    
    // Ensure heart-container exists in your HTML
    const container = document.getElementById('heart-container');
    if (container) {
        container.appendChild(heart);
    }
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}