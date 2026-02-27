var express = require('express');
var cors = require('cors');   // ✅ ADD THIS
var app = express();

var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring'),
    ccavReqHandler = require('./ccavRequestHandler.js'),
    ccavResHandler = require('./ccavResponseHandler.js');

// ✅ ENABLE CORS
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://your-frontend-domain.com" // when deployed
    ],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);

app.get('/pay', function (req, res) {
    res.render('dataFrom.html', {
        amount: req.query.amount,
        name: req.query.name,
        email: req.query.email
    });
});

app.get('/payment', function (req, res){
    res.render('dataFrom.html');
});

app.post('/ccavRequestHandler', function (request, response){
    ccavReqHandler.postReq(request, response);
});

app.post('/ccavResponseHandler', function (request, response){
    ccavResHandler.postRes(request, response);
});

// ✅ CHANGE PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
