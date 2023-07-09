const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs')

const salt = bcrypt.genSaltSync(10);
const secret = 'your-secret-key';

app.use(cors({ credentials: true  }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect('mongodb+srv://blog:7cxoLkDlkL0zbwXx@cluster0.mirozfc.mongodb.net/?retryWrites=true&w=majority');



app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDocs = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDocs);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        const token = jwt.sign({ username, id: userDoc._id }, secret);
        res.cookie('token', token).json({
          id: userDoc._id,
          username,
        });
      } else {
        res.status(401).json({ error: 'Wrong credentials' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, (err, info) => {
    if (err) {
      res.status(401).json({ error: 'Invalid token' });
    } else {
      res.json(info);
    }
  });
});

app.post('/logout', (req, res) => {
  res.clearCookie('token').json('ok');
});


app.post('/post', uploadMiddleware.single('file'), async (req, res) => {

  //  res.json({files:req.file}) ;
  const { originalname, path } = req.file;
  const parts = originalname.split('.')
  const ext = parts[parts.length - 1]
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath)
  const token = req.cookies.token;
  jwt.verify(token, secret, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    })
    res.json(postDoc);
  });
})






app.get('/post', async (req, res) => {
  res.json(await Post.find().populate('author', ['username'])
    .sort({ createdAt: -1 })
    .limit(20)
  );
})



app.get('/post/:id',async (req, res) => {
  const {id} = req.params ;
  const postDoc = await Post.findById(id).populate('author',['username']) 
  res.json(postDoc) ;
})


app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }

  const token = req.cookies.token;
  jwt.verify(token, secret, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id)
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if(!isAuthor){
      res.status(400).json('you are not the author') ;
    }
    await postDoc.updateOne({
      title, 
      summary, 
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });

});





app.listen(4000, () => {
  console.log('Red Blog app listening on port 4000');
});
