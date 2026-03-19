// Script to generate a placeholder image
const fs = require('fs');
const path = require('path');

// Create a simple HTML file that will render a placeholder
const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      width: 300px;
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e0e0e0;
      font-family: Arial, sans-serif;
      color: #666;
      text-align: center;
    }
    .placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .icon {
      font-size: 48px;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="placeholder">
    <div class="icon">📷</div>
    <div>Placeholder Image</div>
    <div>300 × 300</div>
  </div>
</body>
</html>
`;

// Write the HTML file
fs.writeFileSync(path.join(__dirname, 'placeholder.html'), html);

console.log('Placeholder HTML file created. Open it in a browser and save as image.');
console.log('File location:', path.join(__dirname, 'placeholder.html'));
