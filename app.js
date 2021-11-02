const express = require('express');
const multer = require('multer')
const fetchall = require('./postgres.js')
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
      req.originalFileName = file.originalname
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use('/audio',express.static('./my-uploads'))
app.get('/', async (req, res) => {
    
    console.log(await fetchall('select * from messages'))
    res.send(myList);
    res.end();
});

app.post('/:id/audio', (req, res) => {
   
    myList[req.params.id].comment.push({
               name:req.headers.name,
               type:"audio",
               data:'https://bek-chat-app.herokuapp.com/audio/'+req.originalFileName.toString(),
               time:req.headers.time,
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
    await fetchall('update messages set comment=$1 where id=$2',req.params.id,'{'+JSON.stringify(myList[req.params.id])+'}')
    res.end();
});

app.listen(process.env.PORT || 3000, () => console.log("Server 3000 portida ishlayapti !!"));
