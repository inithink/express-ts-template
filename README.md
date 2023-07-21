# Express typescript template

## Initial setup
```bash
git clone git@github.com:inithink/express-ts-template.git
cd express-ts-template
yarn
```

## Development
use `.env` file to set environment variables
```bash
yarn start
```

## Production
### Cli
```bash
yarn build
node --require ./.pnp.cjs dist/main.js
```
### Docker
```bash
docker build -t <IMAGE_NAME> .
```