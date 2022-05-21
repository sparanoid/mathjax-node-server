# MathJax Node Server

Zhihu-like `tex2svg` MathJax Node service by passing TeX from URL query

- [Docker Hub](https://hub.docker.com/r/sparanoid/mathjax-node-server)
- [ghcr.io](https://github.com/users/sparanoid/packages/container/package/mathjax-node-server)

## Usage

```bash
# Docker Hub
docker run --init -p 3456:3456 sparanoid/mathjax-node-server:latest

# GitHub Container Registry
docker run --init -p 3456:3456 ghcr.io/sparanoid/mathjax-node-server:latest
```

## Development

```
yarn install
yarn start
```

## License

AGPL-3.0
