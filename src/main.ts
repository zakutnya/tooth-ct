import "./style.css";
import Alpine from "alpinejs";

// Register CT Viewer Alpine.js component
Alpine.data("ctViewer", () => ({
    currentFrame: 1,
    totalFrames: 18,
    frameWidth: 392,
    frameHeight: 587,
    imagePath: "/tooth-ct-frames.jpg",

    get backgroundPosition() {
        const row = Math.floor((this.currentFrame - 1) / 6);
        const col = (this.currentFrame - 1) % 6;

        // For percentage positioning with a 6x3 grid:
        const xPercent = (col / 5) * 100; // Divide by (columns - 1) for percentage positioning
        const yPercent = (row / 2) * 100; // Divide by (rows - 1) for percentage positioning

        return `${xPercent}% ${yPercent}%`;
    },
}));

// Initialize Alpine.js
Alpine.start();
