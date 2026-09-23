import { createServer } from 'node:http';
import mathjax from 'mathjax';

const listen = '0.0.0.0';
const port = 3456;
const base = '/'

const server = createServer(async (req, res) => {
  const url = URL.parse(req.url ?? '', 'http://localhost');

  if (url?.pathname !== base || !url.searchParams.has('tex')) {
    res.statusCode = 501;
    res.end('Not a valid route');
    return;
  }

  const { searchParams } = url;
  const tex = searchParams.get('tex');
  const fg = searchParams.get('fg');
  const container = searchParams.get('container');

  const color = `#${fg}`.match(/^#([0-9a-f]{3}){1,2}$/i) === null
    ? 'currentColor' :
    `#${fg}`;

  try {
    const MathJax = await mathjax.init({
      loader: {
        load: [
          'input/tex',
          'output/svg'
        ],
      },
      svg: {
        internalSpeechTitles: true,
      }

    });
    const adaptor = MathJax.startup.adaptor;
    const node = MathJax.tex2svg(tex || '', {
      display: true,
    });
    const output = container ? adaptor.outerHTML(node) : adaptor.innerHTML(node);

    res.setHeader('Content-Type', 'image/svg+xml');
    res.end(output.replace(/ style="/, ` style="color: var(--text-color, ${color}); `));
  } catch (err) {
    console.log(err);
  }
});

server.listen(port, listen, () => {
  console.log(`MathJax server is running at http://${listen}:${port}/`);
});
