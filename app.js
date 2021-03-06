const exp = require('constants');
const express = require('express');
const multer = require('multer')
const path = require('path')
const app = express();
var myList=[
    {
        comment:[],
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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './my-uploads')
    },
    filename: function (req, file, cb) {
        let date = new Date().getTime()
      req.Filename = date +file.originalname
      cb(null, req.Filename)
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
               name:req.body.name,
               type:"audio",
               data:'https://bek-chat-app.herokuapp.com/audio/'+req.Filename,
               time:req.body.time,
           });
    console.log(req.Filename)
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
