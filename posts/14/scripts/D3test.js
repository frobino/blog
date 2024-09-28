// select the canvas element created in the html
var canvas = document.getElementById('myChart');

// Get the 'context'
var ctx = canvas.getContext('2d');

// Build a rectangle
ctx.fillStyle = '#69b3a2'; // rectangle color
ctx.fillRect(20, 20, 50, 50); // 4 arguments for the rect features: x, y, width and height
