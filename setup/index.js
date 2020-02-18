/**
 * サーバの初期化処理を行うファイル
 */
const models = require('../models/index.js')



async function postMigrate() {
    await models.Users.create({
        id: 0,
        name: 'anonymous',
        password: '$2b$10$PkiTJ5c/VtVACYVMtouO6OM9Ictc9RWMNJHx62KVVDKadKetpm4B2',
        email: 'anonymous.travel.with@us',
        imageurl: null,
        description: 'this is anonymous !'
    })

    /**
     * 管理者アカウントを生成
     * name: admin
     * password: 
     */
    await models.Users.create({
        name: 'admin',
        password: '$2b$10$PkiTJ5c/VtVACYVMtouO6OM9Ictc9RWMNJHx62KVVDKadKetpm4B2',
        email: 'travel.with@us',
        imageurl: null,
        description: 'this is admin !'
    })
    await models.Post.create({
        userid: 1,
        spotid: 0,
        imageurl: 'https://i.imgur.com/sWO7m0V.jpg',
        text: 'めちゃくそ楽しい卍',
    })
    await models.Post.create({ userid: 1, spotid: -1, imageurl: 'https://i.imgur.com/JPYyp9c.jpg', text: 'Ren', })
    await models.Post.create({ userid: 1, spotid: -1, imageurl: 'https://i.imgur.com/p2Al3fi.jpg', text: 'together', })
    await models.Post.create({ userid: 1, spotid:  0, imageurl: 'https://i.imgur.com/E8rxG4j.jpg', text: 'Alba Cardona Jiménez', })
    await models.Post.create({ userid: 1, spotid: -1, imageurl: 'https://i.imgur.com/pYpxAx3.jpg', text: 'Karen', })
    await models.Post.create({ userid: 1, spotid:  0, imageurl: 'https://i.imgur.com/GcGsFlW.jpg', text: 'Werner', })
    await models.Post.create({ userid: 1, spotid: -1, imageurl: 'https://i.imgur.com/e6xs9q2.jpg', text: 'Natty', })
    await models.Post.create({ userid: 1, spotid:  0, imageurl: 'https://i.imgur.com/JhPMMTK.jpg', text: 'Silvio Tardelli Uehara', })
    await models.Post.create({ userid: 1, spotid: -1, imageurl: 'https://i.imgur.com/7d6C8L4.jpg', text: 'first', })
    await models.Post.create({ userid: 1, spotid: -1, imageurl: 'https://i.imgur.com/XXezSKV.jpg', text: 'second', })
    await models.Post.create({ userid: 1, spotid: -1, imageurl: 'https://i.imgur.com/FFkj9YQ.jpg', text: 'third', })
    await models.Post.create({ userid: 1, spotid: -1, imageurl: 'https://i.imgur.com/Ry19NBj.jpg', text: 'Grill Otsuka', })
    await models.Post.create({ userid: 1, spotid: -1, imageurl: 'https://i.imgur.com/STeRYzs.jpg', text: 'fourth', })
    await models.Post.create({ userid: 1, spotid:  0, imageurl: 'https://i.imgur.com/exOPGIa.jpg', text: 'Maya', })
    await models.Post.create({ userid: 1, spotid: -1, imageurl: 'https://i.imgur.com/5MEVX55.jpg', text: 'Natty', })
    await models.Post.create({ userid: 1, spotid: -1, imageurl: 'https://i.imgur.com/1OUIZb4.jpg', text: 'Daniel', })
    await models.Post.create({ userid: 1, spotid: -1, imageurl: 'https://i.imgur.com/MWxILH0.jpg', text: 'Roanne Evans', })
    await models.Post.create({ userid: 1, spotid:  3, imageurl: 'https://i.imgur.com/MDrnCHl.jpg', text: 'John', })
    await models.Post.create({ userid: 1, spotid: -1, imageurl: 'https://i.imgur.com/XipQ6un.jpg', text: 'mees', })
    await models.Post.create({ userid: 1, spotid: -1, imageurl: 'https://i.imgur.com/NbklQ9y.jpg', text: 'Francisca Fuenzalida', })
    await models.Post.create({ userid: 1, spotid:  1, imageurl: 'https://i.imgur.com/F24x1Ad.jpg', text: 'Walter Bishop', })
    await models.Post.create({ userid: 1, spotid: -1, imageurl: 'https://i.imgur.com/zZTrnT6.jpg', text: 'Dog', })
    await models.Post.create({ userid: 1, spotid: -1, imageurl: 'https://i.imgur.com/INaoOMi.jpg', text: 'mama', })
}

postMigrate()