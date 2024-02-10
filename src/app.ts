import * as express from 'express'
import { render } from 'ejs'
import * as config from 'config'
import * as path from 'path'
// import express = require('express')
// import ejs = require('ejs')
// import config = require('config')
// import path = require('path')

//import { requestTime, logger } from './middleware.js'
//import serverRoutes from './routes/servers.js'

// пути к ресурсам
const __dirname: string = path.resolve()
const pathTemplates: string = path.resolve(__dirname, 'templates')
const pathStatic: string = path.resolve(__dirname, 'static')
const pathImages: string = path.resolve(__dirname, 'static')

// получение настроек
const port: string = config.has('port')
  ? config.get('port')
  : process.env.port ?? '3000'

const app = express()

// настройка EJS
app.set('view engine', 'ejs')
app.set('views', pathTemplates)

app.use(express.static(pathStatic))
app.use(express.static(pathImages))
//app.use(requestTime)
//app.use(logger)
//app.use(serverRoutes)

// массив страниц
interface Page {
  urlName: string
  fileName: string
  title: string
}
const pages: Page[] = [
  { urlName: '/', fileName: 'index', title: 'Home' },
  { urlName: '/game', fileName: 'game', title: 'Play' },
  { urlName: '/rating', fileName: 'rating', title: "Player's rating" },
  { urlName: '/wiki', fileName: 'wiki', title: 'Game wiki' },
  { urlName: '/rmji', fileName: 'rmji', title: 'Inspired by...' },
]

// настройка отрисовки по шаблонам
function getRenderFunc(idx: number): any {
  return (req: express.Request, res: express.Response) => {
    let p: Page = pages[idx]
    res.render(p.fileName, {
      index: idx,   
      pages: pages,
      title: p.title,
      header: p.title,
    })
  }
}
for (let i = 0; i < pages.length; i++) {
  app.get(pages[i].urlName, getRenderFunc(i))
}

// запуск сервера
app.listen(port, () => {
  console.log(`Server has been started on port: ${port}`)
})

/*

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
server.on('request', (req, res) => {
  // Обработка запроса
  if (req.url === '/add') {
  const name = req.headers.username;
  const rating = Number(req.query.rating);
  
  users.push({ name, rating });
  saveUser({ name, rating });
  
  res.write(`User ${name} added with rating ${rating}`);
  res.end();
  } else if (req.url.startsWith('/top10')) {



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
    */
