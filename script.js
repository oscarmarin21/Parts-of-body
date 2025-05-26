function playSound(bodyPart) {
    const audio = new Audio(`Media/${bodyPart}.mp3`);
    audio.play().catch(error => {
        console.error('Error playing audio:', error);
    });
}
