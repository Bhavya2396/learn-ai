# Nelson Mandela: Long Walk to Freedom - Interactive English Lesson

This is an interactive web-based English lesson based on an extract from Nelson Mandela's autobiography "Long Walk to Freedom." It is designed for Class X students as part of the First Flight textbook.

## Overview

This interactive lesson explores Nelson Mandela's inauguration as South Africa's first black President after decades of apartheid. The lesson includes:

- The narrative text of the chapter with interactive vocabulary
- The poem "A Tiger in the Zoo" by Leslie Norris
- Comprehension questions for both the story and poem
- Interactive vocabulary and grammar exercises
- Audio narration capabilities

## Features

- **Narration:** Text-to-speech functionality for reading the story and poem aloud
- **Vocabulary Help:** Highlighted vocabulary words with definitions
- **Interactive Exercises:** Vocabulary matching, sentence completion, and more
- **Comprehension Questions:** Questions with instant feedback and suggested answers
- **Progress Tracking:** Monitors student completion and scores
- **Print Mode:** Printer-friendly version for offline use

## Getting Started

### Prerequisites

You need a modern web browser to run this lesson locally:
- Chrome (recommended)
- Firefox
- Edge
- Safari

For the local server functionality, you'll need:
- [Node.js](https://nodejs.org/) (optional, for running the server)

### Running the Lesson

#### Option 1: Direct Open (Simplest)

1. Navigate to the lesson directory
2. Double-click on `index.html` to open it in your default browser

#### Option 2: Using the Node.js Server (Recommended)

1. Install Node.js if not already installed
2. Open a terminal/command prompt
3. Navigate to the lesson directory
4. Run: `node simple_server.js`
5. Open your browser and go to: `http://localhost:8080`

## Using the Lesson

1. Start at the Introduction page
2. Click "Start Your Learning Journey" to begin
3. Navigate through the different sections using the top navigation bar
4. Use the audio controls to hear the text read aloud
5. Complete exercises and questions to track your progress

## Technical Details

This lesson is built using:
- HTML5
- CSS3
- JavaScript (ES6)
- Web Speech API for text-to-speech functionality

No external libraries or frameworks are required.

## File Structure

- `index.html` - Main HTML file
- `css/styles.css` - All styling for the lesson
- `js/main.js` - Core functionality
- `js/nelson-mandela-story.js` - Story content and narration functions
- `js/questions.js` - Comprehension questions and checking logic
- `js/activities.js` - Interactive activities and exercises
- `simple_server.js` - Basic Node.js server for local development

## Accessibility

This lesson includes several accessibility features:
- ARIA attributes for screen readers
- Keyboard navigation support
- High contrast text
- Resizable text
- Audio narration of content

## Credits

- Text content from "First Flight" - Class X English textbook
- "A Tiger in the Zoo" poem by Leslie Norris
- Developed for educational purposes

## License

This educational material is created for classroom use and aligns with the standard curriculum.

---

*Reprint 2025-26*
