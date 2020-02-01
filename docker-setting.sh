# これでやればとりあえずうまくできる
# TODO: 

docker-compose up -d --build 

docker-compose ps

# travel-with-us-neo_nuxt_1 の部分は ps したときの Name に依存
docker exec -it travel-with-us-neo_nuxt_1 npm install 
docker exec -it travel-with-us-neo_nuxt_1 npm run build

# ここで docker-compose.yml の #command: npm run start のコメントアウトを外す

docker-compose down
docker-compose up -d

# 参照
# https://qiita.com/kitsuki00/items/ed51dbb254bcc6c94fbd