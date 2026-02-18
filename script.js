document.addEventListener("DOMContentLoaded", () => {
    const openLetterBtn = document.getElementById("openLetterBtn");
    const letterContent = document.getElementById("letterContent");
    const stickers = document.querySelectorAll(".sticker");

    // --- 1. Distribución Dinámica Aleatoria ---
    stickers.forEach(sticker => {
        const randomTop = Math.random() * 90; // Evita el borde inferior
        const randomLeft = Math.random() * 90; // Evita el borde derecho
        sticker.style.top = `${randomTop}%`;
        sticker.style.left = `${randomLeft}%`;
        
        // Rotación aleatoria para que parezcan stickers reales
        const randomRotation = Math.random() * 40 - 20;
        sticker.style.transform = `rotate(${randomRotation}deg)`;
    });

    // --- 2. Lógica de Apertura ---
    let isOpen = false;
    openLetterBtn.addEventListener("click", () => {
        isOpen = !isOpen;
        letterContent.classList.toggle("hidden", !isOpen);
        openLetterBtn.textContent = isOpen ? "Cerrar carta" : "Abrir carta";
        
        if(isOpen) {
            letterContent.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // --- 3. Movimiento Dinámico con el Mouse/Touch ---
    const moveStickers = (clientX, clientY) => {
        stickers.forEach(sticker => {
            const rect = sticker.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dist = Math.hypot(clientX - centerX, clientY - centerY);

            if (dist < 150) {
                const angle = Math.atan2(clientY - centerY, clientX - centerX);
                const pushX = -Math.cos(angle) * 40;
                const pushY = -Math.sin(angle) * 40;
                sticker.style.transform = `translate(${pushX}px, ${pushY}px) scale(1.2)`;
            } else {
                sticker.style.transform = `translate(0, 0)`;
            }
        });
    };

    document.addEventListener("mousemove", (e) => moveStickers(e.clientX, e.clientY));
    document.addEventListener("touchmove", (e) => {
        moveStickers(e.touches[0].clientX, e.touches[0].clientY);
    });
});