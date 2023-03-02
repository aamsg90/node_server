const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  if (path === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Welcome to my server!</h1>');
    res.write('<img src="https://picsum.photos/200/300">');
    res.end();
  } else if (path === '/list') {
    fetch('https://swapi.dev/api/people')
      .then(response => response.json())
      .then(data => {
        const people = data.results;
        // res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<table border="1">');
        res.write('<tr><th>Name</th><th>Height</th><th>Birth Year</th><th>Gender</th><th>url</th></tr>');
        for (let person of people) {
          res.write(`<tr><td>${person.name}</td><td>${person.height}</td><td>${person.birth_year}</td><td>${person.gender}</td><td><a href="${person.url}">url</a></td></tr>`);
        }
        res.write('</table>');
        res.end();
      })
      .catch(error => {
        console.log(error);
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('<h1>Internal Server Error</h1>');
        res.end();
      });
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write('<h1>404 Page Not Found</h1>');
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});