# これでやればとりあえずうまくできる
# TODO: 

docker-compose up -d --build 

docker-compose ps

docker exec -it nuxt-web npm install 
docker exec -it nuxt-web npm run build

# ここで docker-compose.yml の #command: npm run start のコメントアウトを外す

docker-compose down
docker-compose up -d

# 参照
# https://qiita.com/kitsuki00/items/ed51dbb254bcc6c94fbd