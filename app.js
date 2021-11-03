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
var filename=""
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './my-uploads')
    },
    filename: function (req, file, cb) {
      filename = file.originalname
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

app.post('/:id/audio', (req, res) => {
   console.log(req)
    myList[req.params.id].comment.push({
               name:"oooooo",
               type:"audio",
               data:'https://bek-chat-app.herokuapp.com/my-uploads/'+filename.toString(),
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
