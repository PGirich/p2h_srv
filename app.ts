import { createServer } from 'http';
import { readFile, writeFile } from 'fs';

interface User {
  name: string;
  rating: number;
}

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html>
    <head><title>Web Server</title></head>
    <body>
      <h1>Welcome to the Web Server</h1>
    </body>
    </html>
  `);
});

server.listen(3000);

function saveUser(user: User) {
  const data = JSON.stringify(user) + '\n';
  writeFile('users.txt', data, (err) => {
    if (err) throw err;
    console.log('User saved!');
  });
}