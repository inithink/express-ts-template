# Express typescript template

## Initial setup

```bash
git clone git@github.com:inithink/express-ts-template.git
cd express-ts-template
yarn
```

## Development

optional: use `.env` file to set environment variables

```bash
yarn start
```

### Docker

```bash
docker build -t <IMAGE_NAME> .
docker run -p <PORT>:80 -d <IMAGE_NAME>
```