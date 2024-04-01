'use strict';
var https = require('https');
var port = process.env.PORT || 1337;
const fs = require('fs');
const path = require('path');

https.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);
