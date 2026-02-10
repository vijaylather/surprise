document.getElementById('revealBtn').addEventListener('click', function() {
    const hiddenSection = document.getElementById('hiddenMessage');
    hiddenSection.style.display = 'block';
    this.style.display = 'none'; // Hide button after click

    // Add a little console log easter egg for her
    console.log("Status: 200 OK. Love: Infinite.");
});