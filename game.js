
// Función para reproducir audio de respuesta correcta
function playCorrectSound() {
    const audio = new Audio('Media/correct.mp3');
    audio.play().catch(error => {
        console.error('Error playing correct audio:', error);
    });
}

// Función para reproducir audio de respuesta incorrecta
function playIncorrectSound() {
    const audio = new Audio('Media/incorrect.mp3');
    audio.play().catch(error => {
        console.error('Error playing incorrect audio:', error);
    });
}

// Función para determinar la respuesta correcta basada en la página actual
function getCorrectAnswer() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'game1p2.html':
            return 'HEAD'; // imagen: head.png
        case 'game1p3.html':
            return 'EYES'; // imagen: eyes.png
        case 'game1p4.html':
            return 'KNEES'; // imagen: kness.png
        case 'game1p5.html':
            return 'MOUTH'; // imagen: mouth.png
        case 'game1p6.html':
            return 'EARS'; // imagen: ear.png
        default:
            return null;
    }
}

// Función para manejar la selección de respuesta
function handleAnswer(selectedElement, isCorrect) {
    // Deshabilitar todos los botones temporalmente
    const allButtons = document.querySelectorAll('.game-body-item');
    allButtons.forEach(btn => {
        btn.style.pointerEvents = 'none';
    });

    if (isCorrect) {
        // Animación y audio para respuesta correcta
        selectedElement.classList.add('correct-answer');
        playCorrectSound();
        
        // Mostrar el botón NEXT después de un breve delay
        setTimeout(() => {
            const nextButton = document.querySelector('.btn-next, .btn-back');
            if (nextButton) {
                nextButton.style.display = 'block';
                nextButton.classList.add('show-next');
            }
        }, 1000);
    } else {
        // Animación y audio para respuesta incorrecta
        selectedElement.classList.add('incorrect-answer');
        playIncorrectSound();
        
        // Reactivar botones después de la animación
        setTimeout(() => {
            selectedElement.classList.remove('incorrect-answer');
            allButtons.forEach(btn => {
                btn.style.pointerEvents = 'auto';
            });
        }, 1500);
    }
}

// Función para inicializar el juego
function initializeGame() {
    // Ocultar el botón NEXT/BACK inicialmente
    const nextButton = document.querySelector('.btn-next, .btn-back');
    if (nextButton) {
        nextButton.style.display = 'none';
    }

    // Obtener la respuesta correcta para la página actual
    const correctAnswer = getCorrectAnswer();
    
    if (!correctAnswer) {
        console.warn('No se pudo determinar la respuesta correcta para esta página');
        return;
    }

    // Agregar event listeners a los botones del juego
    const gameButtons = document.querySelectorAll('.game-body-item');
    gameButtons.forEach(button => {
        // Agregar estilos de transición y cursor
        button.style.transition = 'all 0.3s ease';
        button.style.cursor = 'pointer';
        
        button.addEventListener('click', function() {
            const buttonText = this.querySelector('span').textContent.trim();
            const isCorrect = buttonText === correctAnswer;
            
            handleAnswer(this, isCorrect);
        });
        
        // Agregar efecto hover
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('correct-answer') && !this.classList.contains('incorrect-answer')) {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('correct-answer') && !this.classList.contains('incorrect-answer')) {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            }
        });
    });
}

// Inicializar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', initializeGame);