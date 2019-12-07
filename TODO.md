# TODO

これからやること、やって欲しいこと

## 早めに直した方がいいこと

- [ ] 画像の盗用をやめる

## 本番環境移行時にやるべきこと

- [ ] なければnode, npm, mysqlを使えるようにする
- [ ] これをGitからclone
- [ ] npm install
- [ ] MySQLにデータベース追加
- [ ] config/config.jsonを環境に書き換える
- [ ] その他不具合を直す
- [ ] Apache or Nginxのルーティング設定等をする
- [ ] npm run setup
- [ ] npm run build
- [ ] npm run start
- [ ] 起動できている確認する

## サイト本番環境移行時に再検討

- [ ] GPO設定(nuxt.config.js)をやってくれるとSEO諸々がうまくいく！
- [ ] 検索設定(static/robots.txt)もちゃんとやって
- [ ] HTTPSに対応(安全性のため)(redirect-sslも入れる)
- [ ] SakuraVPSに移行(じゃないとNode動かないのでは？)
- [ ] 二段階認証をやる

## 再考すべきこと

- [ ] logo、icon、fevicon、favicon、全体の色合、その他UI、UXを考え直す
- [ ] Metaタグ関連も見直す
- [ ] Wi-Fiやネットワークがない環境の人が多いのでそのことを考慮しなければいけない

### 補足情報

開発にあたって、本サイトは http://travelwithus.sodeproject.com/ (2019/11/17現在) にあると仮定し作成されています
故にGPOのURL設定部分などでそこを参照している場合があります。場合によっては書き換えてね！