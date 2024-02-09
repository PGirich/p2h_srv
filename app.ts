import { createServer } from "http";
import { readFile, writeFile } from "fs";


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


// Пример использования сервера
server.on(‘request’, (req, res) => {
  // Обработка запроса
  if (req.url === ‘/add’) {
  const name = req.headers.username;
  const rating = Number(req.query.rating);
  
  users.push({ name, rating });
  saveUser({ name, rating });
  
  res.write(`User ${name} added with rating ${rating}`);
  res.end();
  } else if (req.url.startsWith(‘/top10’)) {



server.listen(3000);
console.log('Server started on ${PORT}');

// maintain rating list
interface UserRating {
    name: string;
    rating: number;
  }  
let userRatings: UserRating[] = []; // текущий список

function loadUserRatings() {
    readFile('users.txt', 'utf-8')
    .then((data) => {
        userRatings = JSON.parse(data);
    });
}

function saveUserRatings() {
    const data = JSON.stringify(userRatings) + '\n';
    writeFile('users.txt', data, (err) => {
      if (err) throw err;
      console.log('User ratings saved!');
    });
}

// Выдача топ 10 пользователей
function showUserRatings():string {
  const top10 = userRatings.sort((a, b) => b.rating - a.rating).slice(0, 10);
  return top10.map((ur) => `<tr><td>${ur.name}</td><td>${ur.rating}</td></tr>`).
} 
    