const http = require('http')

http.createServer(onRequest).listen(80);

function onRequest (client_req, client_res) {
    client_req.addListener("end", function() {
        var options = {
            hostname: 'www.google.com',
            port: 80,
            path: client_req.url,
            method: client_req.method,
            headers: client_req.headers
        };
        var req=http.request(options, function(res) {
            var body;
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                 client_res.writeHead(res.statusCode, res.headers);
                 client_res.end(body);
            });
        });
        req.end();
    });
}