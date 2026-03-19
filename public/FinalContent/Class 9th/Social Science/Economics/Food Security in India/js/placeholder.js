// Script to handle placeholder images
document.addEventListener('DOMContentLoaded', function() {
    // Find all images with missing src or that failed to load
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            // Replace with data URL placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgMzAwIDMwMCI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSIxNTAiIHk9IjE0MCIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZpbGw9IiM2NjY2NjYiPlBsYWNlaG9sZGVyPC90ZXh0Pjx0ZXh0IHg9IjE1MCIgeT0iMTcwIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZmlsbD0iIzY2NjY2NiI+SW1hZ2U8L3RleHQ+PC9zdmc+';
            this.alt = 'Placeholder Image';
        };
        
        // Also set placeholder for images with src="images/placeholder.jpg"
        if (img.src.endsWith('placeholder.jpg')) {
            img.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgMzAwIDMwMCI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSIxNTAiIHk9IjE0MCIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZpbGw9IiM2NjY2NjYiPlBsYWNlaG9sZGVyPC90ZXh0Pjx0ZXh0IHg9IjE1MCIgeT0iMTcwIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZmlsbD0iIzY2NjY2NiI+SW1hZ2U8L3RleHQ+PC9zdmc+';
            img.alt = 'Placeholder Image';
        }
    });
});
