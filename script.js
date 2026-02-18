document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("stickerContainer");
    const openLetterBtn = document.getElementById("openLetterBtn");
    const letterContent = document.getElementById("letterContent");

    // 1. Generación responsiva de stickers
    const isMobile = window.innerWidth < 600;
    const cantidad = isMobile ? 18 : 35; // Menos stickers en móvil para no saturar

    for (let i = 0; i < cantidad; i++) {
        const span = document.createElement("span");
        span.className = "sticker";
        span.innerText = Math.random() > 0.5 ? "🐬" : "🍓";
        
        // Solo colocar a los lados para no estorbar la carta
        const side = Math.random() > 0.5 ? (Math.random() * 20) : (80 + Math.random() * 15);
        span.style.left = side + "%";
        span.style.top = Math.random() * 95 + "%";
        span.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
        
        container.appendChild(span);
    }

    // 2. Lógica de la carta
    openLetterBtn.addEventListener("click", () => {
        const isOpening = letterContent.classList.contains("hidden");
        letterContent.classList.toggle("hidden");
        openLetterBtn.textContent = isOpening ? "Cerrar carta" : "Abrir carta";
        
        if (isOpening) {
            // Scroll suave hacia el mensaje en móviles
            setTimeout(() => {
                letterContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    });
});