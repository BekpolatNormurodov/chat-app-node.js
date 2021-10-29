const express = require('express');
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
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


app.get('/chats', (req, res) => {
    res.send(myList);
    console.log(req.app.locals.settings.etag);
    res.end();
});

app.get('/rasm',(req,res)=>{
    res.sendFile(__dirname+'/img.jpg')
})

app.post('/chats/:index', (req, res) => {
   
    myList[req.params.index].comment.push({
               name:req.body.name,
               chat:req.body.chat,
               time:req.body.time,
           });
    res.end();
});


app.listen(process.env.PORT || 5000, () => console.log("Server 3000 portida ishlayapti !!"));









// const { log } = require('console');
// const express = require('express');
// const { request } = require('http');
// const app = express()
// const port = 3000

// app.use(express.json())
// app.use(express.urlencoded({
//     extended:true
// }))
// myList=[
//     {
//         comments:[],
//         channel_name:"Kursdoshlar"
//     },
//     {
//         comments:[],
//         channel_name:"Sinfdoshlar"
//     },
//     {
//         comments:[],
//         channel_name:"Qarindoshlar"
//     },
//     {
//         comments:[],
//         channel_name:"Do'stlar"
//     },
// ];

// app.get('/channels', (req, res) =>{
//     var list1=[];
//     myList.forEach(element => {
//         list1.push(element.channel_name);
//     });
//     res.json(list1);
// });
// app.get('/:id', (req, res) =>{
//     var _id=parseInt(req.params.id);
//     res.json(myList[_id].comments)
// });
// app.post('/:id/:type',(req,res)=>{
//     var _id=parseInt(req.params.id);
//     if (req.params.type=="chat") {
//         myList[_id].comments.push({
//             name:req.body.name,
//             type:"chat",
//             data:req.body.data,
//         })
//     } else if(req.params.type=="audio"){
//          if (req.files) {
//              console.log(req.files);
             
//          }


//         // myList[_id].comments.push({
//         //     name:req.body.name,
//         //     type:"audio",
//         //     data:req.body.data,
//         // })

//     }
//     console.log(myList)
// });
// app.listen(port, () => console.log("Example app listening on 3000 port!"))


//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