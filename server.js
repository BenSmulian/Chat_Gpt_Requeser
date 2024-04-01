<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server Example</title>
</head>
<body>
    <script>
        const http = require('http');
        const PORT = 443;

        const server = http.createServer((req, res) => {
            // Set CORS headers to allow requests from any origin
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', '*');

            // Handle POST requests to save data
            if (req.method === 'POST') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString(); // convert Buffer to string
                });
                req.on('end', () => {
                    // Parse the JSON data from the request body
                    const data = JSON.parse(body);
                    
                    // Here you can process the data as needed
                    // For this example, let's just log the data
                    console.log('Received data:', data);
                    
                    // Respond with a success message
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end('Data received successfully');
                });
            } else {
                // For other HTTP methods or routes, respond with a 404 Not Found error
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('404 Not Found');
            }
        });

        server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    </script>
</body>
</html>
