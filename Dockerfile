FROM node:8

# コンテナ内で cd /app しているようなもの
WORKDIR /app

# コマンド実行
# linux 最新化,gitのインストール、npm最新化、vue-cli インストール　をしている。
RUN npm install -g npm && \
    npm install -g vue-cli

ENV HOST 0.0.0.0
EXPOSE 3000