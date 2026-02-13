// 1. Handle Google Login Response
function handleCredentialResponse(response) {
    const responsePayload = parseJwt(response.credential);

        // Create a list of allowed emails
        const authorizedEmails = ["vijay17lat@gmail.com", "krutikaahirrao2002@gmail.com","vijaylather1999@gmail.com"];

        // Check if the logged-in email exists in our list
        if (authorizedEmails.includes(responsePayload.email)) {
            document.getElementById('passwordOverlay').style.display = 'none';
            document.getElementById('mainContent').style.display = 'block';

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

    driveIds.forEach((id, index) => {
        const img = document.createElement('img');
        img.src = `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
        img.className = "collage-img";

        // Stagger the reveal of each photo
        img.style.animationDelay = `${index * 0.3}s`;

        // Assign random rotation variable for the CSS
        const rot = (Math.random() * 10 - 5) + "deg";
        img.style.setProperty('--rotation', rot);

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
