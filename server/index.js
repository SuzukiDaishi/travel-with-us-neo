const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookie = require('cookie-parser')
const cors = require('cors')
const bcrypt = require('bcrypt')
const models = require('../models/index.js')
const fs = require('fs')
const multer = require('multer')
const imgur = require('imgur')

const spots = require('../assets/data/spots.json')
const spotsOter = require('../assets/data/spotsOther.json')

spots.push(spotsOter)


// Authorization: Client-ID YOUR_CLIENT_ID
// Client ID: 10c653f617c2ed7
// Client secret: 50e92eb623c9bce58c7f6b346541a0271dc41ef2
imgur.setClientId('10c653f617c2ed7')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './server/uploads/')
    },
    limits: {
        files: 1,
        fileSize: 1024 * 1024
    },
    filename: function (req, file, cb) {
        const datetimestamp = Date.now();
        cb(null, datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    },
    onFileUploadStart: function (file) {
        console.log("Inside uploads");
        if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png')
            return true;
        else
            return false;
    }
})

const upload = multer({ storage, dest: './server/uploads/' })

const app = express()

app.use(cookie())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
    secret: 'tekitou-na-secret-key-wo-kaku',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: 'auto',
        maxAge: 60000,
    }
}))

app.get('/', (req, res) => {
    return res.json({isAccess: true, message: 'This is API'})
})

app.post('/auth/login', async (req, res) => {
    if ( !req.body['email'] ) { return res.status(401).json({ error: 'Email address is empty' }) }
    if ( !req.body['password'] ) { return res.status(401).json({ error: 'Password address is empty' }) }
    await models.Users.findOne({ where: { email: req.body.email } })
    .then((recode) => {
        if ( !recode ) { return res.status(401).json({ error: 'Incorrect email address' }) }
        if ( bcrypt.compareSync(req.body.password, recode.password) ) {
            let userInfo = { 
                id: recode.id, 
                name: recode.name,
                email: recode.email,
                imageurl: recode.imageurl,
                description: recode.description,
                create: recode.createdAt,
            }
            req.session.authUser = userInfo
            return res.json(userInfo)
        } else {
            return res.status(401).json({ error: 'The password is incorrect ...' })
        }
    })
    .catch((err) => {
        return res.status(401).json({ error: 'There is something wrong with the database !!' })
    })
})

app.post('/auth/logout', (req, res) => {
    delete req.session.authUser
    return res.json({ ok: true })
})

app.post('/auth/signup', (req, res) => {
    try {
        models.Users.create({
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, 10),
            email: req.body.email,
            imageurl: null,
            description: null
        })
        return res.json({ ok: true })
    } catch(err) {
        if (err.validatorKey) {
            return res.status(400).json({ error: 'This email address is already registered.' })
        } else {
            return res.status(400).json({ error: 'Failed for some reason.' })
        }
    }
})

app.post('/user/change/image', upload.single('image'), async (req, res) => {
    let imagePath = ''
    try {
        imagePath = req.file.path
        let imgRes = await imgur.uploadFile(imagePath)
        const filter = { where: { id: req.session.authUser.id } }
        let feed = await models.Users.update({ imageurl: imgRes.data.link }, filter )
        req.session.authUser.imageurl = imgRes.data.link
        fs.unlinkSync(imagePath)
        return res.json({ ok: true, imageLink: imgRes.data.link })
    } catch(e) {
        if (!imagePath) {
            fs.unlinkSync(imagePath)
        }
        return res.status(400).json({ error: 'Failed to change image.' })
    }
})

app.post('/user/change/name', async (req, res) => {
    try {
        const name = req.body.name
        const filter = { where: { id: req.session.authUser.id } }
        let feed = await models.Users.update({ name: name }, filter)
        req.session.authUser.name = name
        return res.json({ ok: true, name: name })
    } catch(e) {
        return res.status(400).json({ error: 'Failed to change name.' })
    }
})


app.post('/user/change/description', async (req, res) => {
    try {
        const description = req.body.description
        const filter = { where: { id: req.session.authUser.id } }
        let feed = await models.Users.update({ description: description }, filter)
        req.session.authUser.description = description
        return res.json({ ok: true, description: description })
    } catch (e) {
        return res.status(400).json({ error: 'Failed to change description.' })
    }
})

app.get( '/spots/show', async (req, res) => {
    try {
        let datas = await models.Post.findAll()
        let users = await models.Users.findAll()
        let out = []
        for (let data of datas) {
            out.push({
                id: data.id,
                imageurl: data.imageurl,
                text: data.text,
                createAt: data.createdAt,
                user: {
                    id: users.filter(u => u.id === data.userid)[0].id,
                    name: users.filter(u => u.id === data.userid)[0].name,
                    imgurl: users.filter(u => u.id === data.userid)[0].imageurl,
                },
                spot: spots.filter(s => s.id === data.spotid)[0],
            })
        }
        return res.json({ ok: true, data: out})
    } catch(e) {
        return res.status(400).json({ error: 'Database Error.' })
    }
})

app.post('/spots/upload', upload.single('image'), async (req, res) => {
    let imagePath = ''
    try {
        imagePath = req.file.path
        console.log('img uploading...');
        let imgRes = await imgur.uploadFile(imagePath)
        console.log('img upload fin');
        const user = req.session.authUser.id
        const img  = imgRes.data.link
        const text = req.body.text
        const spot = req.body.spot
        const data  = {
            userid: user,
            spotid: spot,
            imageurl: img,
            text: text,
        }
        await models.Post.create(data)
        fs.unlinkSync(imagePath)
        let outData = {
            id: data.id,
            imageurl: data.imageurl,
            text: data.text,
            createAt: new Date(),
            user: {
                id: req.session.authUser.id,
                name: req.session.authUser.name,
                imgurl: req.session.authUser.imageurl,
            },
            spot: spots.filter(s => s.id == spot)[0],
        }
        return res.json({ ok: true, postInfo: outData })
    } catch(e) {
        return res.status(400).json({ error: 'Database Error.' })
    }
})

app.post('/spots/upload/anonymous', upload.single('image'), async (req, res) => {
    let imagePath = ''
    try {
        imagePath = req.file.path
        console.log('img uploading...');
        let imgRes = await imgur.uploadFile(imagePath)
        console.log('img upload fin');
        const user = 1
        const img = imgRes.data.link
        const text = req.body.text
        const spot = req.body.spot
        const data = {
            userid: user,
            spotid: spot,
            imageurl: img,
            text: text,
        }
        await models.Post.create(data)
        fs.unlinkSync(imagePath)
        let outData = {
            id: null,
            imageurl: data.imageurl,
            text: data.text,
            createAt: new Date(),
            user: {
                id: 1,
                name: 'anonymous',
                imgurl: null,
            },
            spot: spots.filter(s => s.id == spot)[0],
        }
        return res.json({ ok: true, postInfo: outData })
    } catch (e) {
        return res.status(400).json({ error: 'Database Error.' })
    }
})


module.exports = {
    path: '/api',
    handler: app,
}