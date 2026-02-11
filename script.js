// 1. Handle Google Login Response
function handleCredentialResponse(response) {
    const responsePayload = parseJwt(response.credential);
    const authorizedEmails = ["vijay17lat@gmail.com", "krutikaahirrao2002@gmail.com"];

    if (authorizedEmails.includes(responsePayload.email)) {
        document.getElementById('passwordOverlay').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        setInterval(createHeart, 300);
    } else {
        document.getElementById('errorMessage').innerText = "Access Denied. This memory is private! 🔒";
    }
}

// 2. Photo Injection (Triggers after YES is clicked)
function injectPhotos() {
    const container = document.querySelector('.collage-container');
    const driveIds = [
        "1AZPsRCPQp5lYG8QPI5_hM-RLtNgCy_aH",
        "1VapgAaSumEjCB_g8yJW4-9_uzJ4MpasE",
        "1wQQ9TsKTncLLHgkS7Sbfvar0uEFjW40l",
        "1Seq5TzfIxQJ0W-ayReWSlU81hZJE9Y0J"
    ];

    // Clear container first to prevent duplicates
    container.innerHTML = '';

    driveIds.forEach((id, index) => {
        const img = document.createElement('img');
        img.src = `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
        img.className = "collage-img";
        img.style.animationDelay = `${index * 0.3}s`;
        const rot = (Math.random() * 10 - 5) + "deg";
        img.style.setProperty('--rotation', rot);
        container.appendChild(img);
    });
}

// 3. Step 1: Initial Surprise Reveal
document.getElementById('revealBtn').addEventListener('click', function() {
    document.getElementById('hiddenMessage').style.display = 'block';
    this.style.display = 'none';

    // Play music
    const music = document.getElementById('valentineMusic');
    music.play().catch(e => console.log("Audio blocked: ", e));
});

// 4. Step 2: Runaway "No" Button Logic
const noBtn = document.getElementById('noBtn');
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', moveButton); // For mobile

function moveButton() {
    // Calculate random position within the card/viewport
    // Subtracting button dimensions so it doesn't go off-screen
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.position = 'fixed'; // Overrides the relative flow
}

// 5. Step 3: "Yes" Button Celebration
document.getElementById('yesBtn').addEventListener('click', function() {
    // Hide the question buttons
    document.querySelector('.question-container').style.display = 'none';

    // Show the final photos and message
    const finalSurprise = document.getElementById('finalSurprise');
    finalSurprise.style.display = 'block';

    injectPhotos();

    // Optional: Add a special alert or effect
    console.log("She said YES! ❤️");
});

// 6. JWT Decoder Helper
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

// 7. Heart Animation
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    const icons = ['❤️', '💖', '💕', '💗'];
    heart.innerText = icons[Math.floor(Math.random() * icons.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    heart.style.fontSize = Math.random() * 20 + 10 + "px";

    const container = document.getElementById('heart-container');
    if(container) container.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}