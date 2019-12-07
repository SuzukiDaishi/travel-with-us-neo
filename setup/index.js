/**
 * サーバの初期化処理を行うファイル
 */
const models = require('../models/index.js')

/**
 * 管理者アカウントを生成
 * name: admin
 * password: 
 */
models.Users.create({
    name: 'admin',
    password: '$2b$10$PkiTJ5c/VtVACYVMtouO6OM9Ictc9RWMNJHx62KVVDKadKetpm4B2',
    email: 'travel.with@us',
    imageurl: null,
    description: 'this is admin !'
})
.then((record) => {
    console.log('Admin account generated !')
})
.catch((err) => {
    console.log('Failed to generate administrator account ...')
})