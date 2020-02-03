# dockerでどっかーん

## 以下のコマンドを実行することでdockerを起動できます

```bash
docker-compose up -d --build

docker-compose ps

docker exec -it nuxt-web npm install
docker exec -it nuxt-web npm run build
```

ここで docker-compose.yml の `#command: npm run start` のコメントアウトを外す

```bash
docker-compose down
docker-compose up -d

docker exec -it nuxt-web ./node_modules/.bin/sequelize db:migrate
docker exec -it nuxt-web npm run setup
```

> 参照
> https://qiita.com/kitsuki00/items/ed51dbb254bcc6c94fbd