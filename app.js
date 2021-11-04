const exp = require('constants');
const express = require('express');
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const app = express();
var myList=[
    {
        comment:[{

            name:"oooooo",
            type:"audio",
            data:'https://bek-chat-app.herokuapp.com/audio/temp.wav',
            time:"00:00",

        }],
    },
    {
        comment:[]
    },
    {
        comment:[]
    },
    {
        comment:[]
    },
    {
        comment:[]
    },
    {
        comment:[]
    },
    {
        comment:[]
    },
    {
        comment:[]
    },
    {
        comment:[]
    },
    {
        comment:[]
    }
    
];
var filename=""
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './my-uploads')
    },
    filename: function (req, file, cb) {
      req.Filename = file.originalname
      console.log(file)
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

app.use('/audio',express.static(path.join(__dirname,'my-uploads')))
app.get('/', async (req, res) => {
    
    res.send(myList);
    res.end();
});

app.post('/:id/audio', upload.single('audio'),(req, res) => {
    myList[req.params.id].comment.push({
               name:"oooooo",
               type:"audio",
               data:'https://bek-chat-app.herokuapp.com/audio/'+req.Filename,
               time:"00:00",
           });
    res.end();
});
app.post('/:id/chat', async (req, res) => {
    myList[req.params.id].comment.push({
        name:req.body.name,
        type:"chat",
        data:req.body.data,
        time:req.body.time,
    });
    res.end();
});

app.listen(process.env.PORT || 3000, () => console.log("Server 3000 portida ishlayapti !!"));
