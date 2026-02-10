document.getElementById('revealBtn').addEventListener('click', function() {
    const hiddenSection = document.getElementById('hiddenMessage');
    hiddenSection.style.display = 'block';
    this.style.display = 'none';
});

// Function to create floating hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Pick a random heart icon
    const icons = ['❤️', '💖', '💕', '💗', '🌸'];
    heart.innerText = icons[Math.floor(Math.random() * icons.length)];
    
    // Random position and size
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s"; // 3-5 seconds
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    
    document.getElementById('heart-container').appendChild(heart);
    
    // Remove heart after animation finishes
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Generate a heart every 300ms
setInterval(createHeart, 300);
