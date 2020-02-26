const mjAPI = require('mathjax-node');
const http = require('http');
const url = require('url');

const listen = '127.0.0.1';
const port = 3456;
const base = '/'
const param = 'tex'

// https://github.com/mathjax/MathJax-node#getting-started
mjAPI.config({
  MathJax: {
    // traditional MathJax configuration
  },
  displayErrors: false
});
mjAPI.start();

const server = http.createServer((req, res) => {
  let parsedUrl = url.parse(req.url, true);

  if (base === parsedUrl.pathname && param in parsedUrl.query) {
    mjAPI.typeset({
      math: parsedUrl.query[param],
      format: 'TeX',
      svg: true,
      speakText: false,
    }, function (data) {
      res.setHeader('Content-Type', 'image/svg+xml');
      res.end(data.svg);
    });
  } else {
    res.statusCode = 501;
    res.end('Not a valid route');
  }
});

server.listen(port, listen, () => {
  console.log(`MathJax server is running at http://${listen}:${port}/`);
});
