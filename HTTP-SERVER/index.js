const { Console } = require('console');
const http = require('http');

const PORT = 3000;

const server = http.createServer();

const freinds = [
  {
    id: 0,
    name: 'kiren',
  },
  {
    id: 1,
    name: 'koki',
  },
  {
    id: 2,
    name: 'kik0',
  },
];

  server.on('request', (req, res) => {
    const items = req.url.split('/');
    // /freinds/2 => ['', 'freinds', '2']
    if(req.method === 'POST' && items[1] === 'freinds'){
      req.on('data', (data) => {
        const freind = data.toString();
        console.log('Request:', freind);
        freinds.push(JSON.parse(freind));
      });
      req.pipe(res);
    }else if (req.method === 'GET' && items[1] === 'freinds') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    if (items.length === 3) {
      const freindIndex = Number(items[2]);
      res.end(JSON.stringify(freinds[freindIndex]));  
    }else{
  res.end(JSON.stringify(freinds));  
    }
} else if (req.method === 'GET' && items[1] === 'messages') {
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<body>');
  res.write('<ul>');
  res.write('<li> Hello Kiren </li>');
  res.write('<li>wats ur gain</li>');
  res.write('</ul>');
  res.write('</body>');
  res.write('</html');
  res.end();
} else {
  res.statusCode = 404;
  res.end();
}
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});