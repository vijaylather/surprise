// 1. Handle Google Login Response
function handleCredentialResponse(response) {
    // Decode the Google JWT Token
    const responsePayload = parseJwt(response.credential);

    // SECURITY: Enter her exact Gmail address here
    const authorizedEmail = "vijay17lat@gmail.com";

    if (responsePayload.email === authorizedEmail) {
        // Unlock Site
        document.getElementById('passwordOverlay').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';

        // Inject Photos and Start Hearts
        injectPhotos();
        setInterval(createHeart, 300);
    } else {
        document.getElementById('errorMessage').innerText = "Access Denied. This memory is private! 🔒";
    }
}

// 2. Secure Photo Injection (IDs are only revealed after login)
function injectPhotos() {
    const container = document.querySelector('.collage-container');

    // Put your Google Drive File IDs here
    const driveIds = [
        "1AZPsRCPQp5lYG8QPI5_hM-RLtNgCy_aH",
        "1VapgAaSumEjCB_g8yJW4-9_uzJ4MpasE",
        "1wQQ9TsKTncLLHgkS7Sbfvar0uEFjW40l",
        "1Seq5TzfIxQJ0W-ayReWSlU81hZJE9Y0J"
    ];

    driveIds.forEach(id => {
        const img = document.createElement('img');
        // Using the Thumbnail API for faster loading and privacy
        img.src = `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
        img.alt = "Our Memory";
        img.className = "collage-img";
        container.appendChild(img);
    });
}

// 3. Valentine Surprise Logic
document.getElementById('revealBtn').addEventListener('click', function() {
    document.getElementById('hiddenMessage').style.display = 'block';
    this.style.display = 'none';

    const music = document.getElementById('valentineMusic');
    music.play().catch(e => console.log("Audio blocked: ", e));
});

// 4. JWT Decoder Helper
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// 5. Heart Animation
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