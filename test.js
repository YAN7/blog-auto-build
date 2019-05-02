const http = require('http');

http.createServer((req, res) => {
    res.statusCode = 200
    res.end('123')
}).listen(2048);
