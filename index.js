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
    TeX: {
      extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js']
    },
    svg: {
      internalSpeechTitles: true
    }
  },
  displayErrors: false,
  extensions: 'TeX/color.js'
});
mjAPI.start();

const server = http.createServer((req, res) => {
  let parsedUrl = url.parse(req.url, true);
  let color = `#${parsedUrl.query.fg}`.match(/^#([0-9a-f]{3}){1,2}$/i) === null
    ? '#000' :
    `#${parsedUrl.query.fg}`;

  if (base === parsedUrl.pathname && param in parsedUrl.query) {
    mjAPI.typeset({
      math: parsedUrl.query[param],
      format: 'TeX',
      svg: true,
    }, function (data) {
      let svg = data.svg;
      svg = svg.replace(/ style="/, ` style="color: var(--text-color, ${color}); `);
      res.setHeader('Content-Type', 'image/svg+xml');
      res.end(svg);
    });
  } else {
    res.statusCode = 501;
    res.end('Not a valid route');
  }
});

server.listen(port, listen, () => {
  console.log(`MathJax server is running at http://${listen}:${port}/`);
});
