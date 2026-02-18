document.addEventListener("DOMContentLoaded", () => {
    const openLetterBtn = document.getElementById("openLetterBtn");
    const letterContent = document.getElementById("letterContent");
    const container = document.getElementById("stickerContainer");

    // 1. Generar muchos stickers solo a los lados
    const emojis = ["🐬", "🍓"];
    const cantidad = 40; // Más cantidad como pediste

    for (let i = 0; i < cantidad; i++) {
        const span = document.createElement("span");
        span.className = "sticker";
        span.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Decidir si va a la izquierda o a la derecha
        const side = Math.random() > 0.5 ? "left" : "right";
        let xPos;
        
        if (side === "left") {
            xPos = Math.random() * 30; // 0% al 30% del ancho
        } else {
            xPos = 70 + (Math.random() * 25); // 70% al 95% del ancho
        }

        span.style.left = xPos + "%";
        span.style.top = Math.random() * 90 + "%";
        
        // Guardamos una rotación inicial para la animación CSS
        const initialRot = Math.floor(Math.random() * 40) - 20;
        span.style.setProperty('--rot', `${initialRot}deg`);
        
        container.appendChild(span);
    }

    const stickers = document.querySelectorAll(".sticker");

    // 2. Control de Apertura
    let isOpen = false;
    openLetterBtn.addEventListener("click", () => {
        isOpen = !isOpen;
        letterContent.classList.toggle("hidden", !isOpen);
        openLetterBtn.textContent = isOpen ? "Cerrar carta" : "Abrir carta";
        if (isOpen) letterContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // 3. Movimiento de Huida (Actualizado para trabajar con la flotación)
    document.addEventListener("mousemove", (e) => {
        stickers.forEach((s) => {
            const rect = s.getBoundingClientRect();
            const sX = rect.left + rect.width / 2;
            const sY = rect.top + rect.height / 2;
            const dist = Math.sqrt(Math.pow(e.clientX - sX, 2) + Math.pow(e.clientY - sY, 2));

            if (dist < 150) {
                const angle = Math.atan2(e.clientY - sY, e.clientX - sX);
                const moveX = Math.cos(angle) * -50;
                const moveY = Math.sin(angle) * -50;
                s.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.3)`;
                s.style.animationPlayState = "paused"; // Se detiene la flotación al interactuar
            } else {
                s.style.transform = "translate(0, 0) scale(1)";
                s.style.animationPlayState = "running";
            }
        });
    });
});