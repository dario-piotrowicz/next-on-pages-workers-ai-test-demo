# next-dev workers-ai test/demo

## Steps

### Install the dependencies

```sh
pnpm i
```
> [!NOTE]
> You do need to use `pnpm` as this project is relying on a pnpm patch

### Populate .env.local

Populate the `.env.local` file with your Cloudflare account id and with an API token which enables workers-ai usage

### Run the app in dev mode
```sh
pnpm dev
```

### Preview the app before deployment
```sh
pnpm pages:preview
```

### Deploy the application
```sh
pnpm pages:deploy
```
