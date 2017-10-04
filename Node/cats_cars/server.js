const http = require('http');
const fs = require('fs');
const server = http.createServer(function (request, response) {
    if (request.url === '/cars') {
        fs.readFile('index.html', 'utf8', function (errors, contents) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(contents);
            response.end();
        });
    } 
    else if (request.url === '/cars/new') {
        fs.readFile('newCar.html', 'utf8', function (errors, contents) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(contents);
            response.end();
        });
    } 
    else if (request.url === '/cats') {
        fs.readFile('cats.html', 'utf8', function (errors, contents) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(contents);
            response.end();
        });
    }
    else if (request.url === '/stylesheets/style.css') {
        fs.readFile('./stylesheets/style.css', 'utf8', function (errors, contents) {
            response.writeHead(200, { 'Content-type': 'text/css' });
            response.write(contents);
            response.end();
        })
    }
    else if (request.url.startsWith('/images/')){
        console.log("Images tried to load");
        fs.readFile('.' + request.url, function (errors, contents) {
            response.writeHead(200, { 'Content-type': 'image/jpg' });
            response.write(contents);
            response.end();
        })
    }
    // else if (request.url === '/images/pizza.jpg') {
    //     fs.readFile('./images/pizza.jpg', function (errors, contents) {
    //         response.writeHead(200, { 'Content-type': 'image/jpg' });
    //         response.write(contents);
    //         response.end();
    //     })
    // }

    else {    // request didn't match anything:
        response.writeHead(404);
        response.end('the URL requested is not available.');
    }
})
// tell your server which port to run on
server.listen(7077);