import "./style.css";
import Alpine from "alpinejs";

// Register CT Viewer Alpine.js component
Alpine.data("ctViewer", () => ({
    currentFrame: 1,
    totalFrames: 18,
    frameWidth: 392,
    frameHeight: 587,
    imagePath: "/tooth-ct-frames.jpg",
    isImageLoaded: false,
    isImageLoading: true,
    imageLoadError: false,

    init() {
        this.loadImage();
    },

    async loadImage() {
        try {
            this.isImageLoading = true;
            this.imageLoadError = false;

            // Create a new Image object to preload the image
            const img = new Image();

            // Wait for both the image to load AND a minimum delay
            const [_] = await Promise.all([
                new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = this.imagePath;
                }),
                new Promise(resolve => setTimeout(resolve, 200)) // 200ms artificial delay
            ]);

            // Image loaded successfully
            this.isImageLoaded = true;
            this.isImageLoading = false;
        } catch (error) {
            // Image failed to load - still wait for minimum delay
            await new Promise(resolve => setTimeout(resolve, 200));
            console.error("Failed to load CT image:", error);
            this.isImageLoading = false;
            this.imageLoadError = true;
        }
    },

    retryImageLoad() {
        this.loadImage();
    },

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
