# fastAPI-veutify-template

FastAPI+Vuetify+Nginx+Docker のテンプレート

## 環境構築

1. コンテナのビルド&起動

```
$ docker compose up -d --build
```

2. 開発環境起動

```
$ docker compose exec front yarn dev
```

3. http://localhost:3000 にアクセス(vite の開発環境へのアクセス)

4. フロント側のビルド

```
docker compose exec front yarn build
```

5. http://localhost:8000 にアクセス(NGINX による本番環境へのアクセス)

## 開発作業

- フロント開発環境へ入る

```
$ docker-compose exec -it front bash
```
