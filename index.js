const http = require('http');
const spawn = require('child_process').spawn;
const createHeadler = require('github-webhook-handler');
const config = require('./config');
const handler = createHeadler({path: '/autoBuild', secret: config.secret})

http.createServer((req, res) => {
    handler(req, res, function (err) {
        res.statusCode = 404;
        res.end('there is something wrong!');
    })
}).listen(config.port);

handler.on('error', function (err) {
    console.log('Error:', err.message);
})

handler.on('push', function (event) { 
    runCommand('sh', ['./autoBuild.sh'], function (txt) {
        console.log(txt);
    })
})

function runCommand(cmd, args, callback) {
    const child = spawn(cmd, args);
    let resp = '';
    child.stdout.on('data', function (buffer) {
        resp += buffer.toString();
    })
    child.stdout.on('end', function () {
        callback(resp);
    })

}
