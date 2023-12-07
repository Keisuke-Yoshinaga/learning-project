# 技術学習

## 環境構築

### local

1. Node, npm, yarn インストール
2. ローカルでの起動

```
$ cd front/app/
$ yarn install
$ yarn dev
```

### docker

1. コンテナのビルド&起動

```
$ docker-compose up -d --build
```

#### 開発環境

1. 開発環境の起動

```
$ docker-compose exec front yarn dev
```

2. http://localhost:3000 にアクセス(vite の開発環境へのアクセス)

#### 本番環境 (nginx)

1. フロント側のビルド

```
docker-compose exec front yarn build
```

2. http://localhost:8000 にアクセス(NGINX による本番環境へのアクセス)

#### template

https://github.com/gaitou2048/fastAPI-veutify-template

### GitHub Pages

https://keisuke-yoshinaga.github.io/learning-project/
