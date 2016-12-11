var express=require('express');
var util=require('util');
var moment=require('moment');
var path=require('path');
var app=express();
app.use(express.static('/'));
app.get('/:date',function(req,res) {
var inDate=(JSON.stringify(req.params.date));
inDate=inDate.slice(1,inDate.length-1); //slice strips quotes from beginning and end
if (!inDate.match(/[A-Z][a-z]*/g)) { 
//possible unix timestamp, no natural language
var day=moment.unix(inDate); if (day.isValid()===false) {invalidQuit();}
//calculate natural language date off timestamp
else{res.send({"unix":day.unix(),"natural":day.format("MMMM D, YYYY")}); res.end(); }
}
else { //some natural language
var day=moment(inDate); if (day.isValid()===false) {invalidQuit();}
else { res.send({"unix":day.unix(),"natural":day.format("MMMM D, YYYY")}); res.end(); }
}
function invalidQuit() {res.send({"unix":null,"natural":null}); res.end();}
});
app.get('*',function(req,res){res.sendFile(path.join(__dirname, 'index.html'));});
app.listen(process.env.PORT||8080,function() {console.log('listening'); });
