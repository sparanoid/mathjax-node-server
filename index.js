const mathjax = require('mathjax');
const http = require('http');
const url = require('url');

const listen = '0.0.0.0';
const port = 3456;
const base = '/'

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  const {
    tex,
    bg,
    fg,
    container,
  } = parsedUrl.query;

  const color = `#${fg}`.match(/^#([0-9a-f]{3}){1,2}$/i) === null
    ? 'currentColor' :
    `#${fg}`;

  if (base === parsedUrl.pathname && 'tex' in parsedUrl.query) {

    mathjax.init({
      loader: {
        load: [
          'input/tex',
          'output/svg'
        ],
      },
      svg: {
        internalSpeechTitles: true,
      }

    }).then((MathJax) => {
      const adaptor = MathJax.startup.adaptor;
      const node = MathJax.tex2svg(tex || '', {
        display: true,
      });
      const output = container ? adaptor.outerHTML(node) : adaptor.innerHTML(node);

      res.setHeader('Content-Type', 'image/svg+xml');
      res.end(output.replace(/ style="/, ` style="color: var(--text-color, ${color}); `));
    }).catch(err => console.log(err));

  } else {
    res.statusCode = 501;
    res.end('Not a valid route');
  }
});

server.listen(port, listen, () => {
  console.log(`MathJax server is running at http://${listen}:${port}/`);
});

process.on('SIGINT', () => {
  process.exit();
});
