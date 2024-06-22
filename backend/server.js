// // backend/server.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const jobRoutes = require('./routes/jobRoutes');

// const app = express();
// const PORT = 5000;

// app.use(bodyParser.json());
// app.use('/api/jobs', jobRoutes);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const exp = require('express');
const app = exp();

const mc = require('mongodb').MongoClient;

const path = require('path');

app.use(exp.static(path.join(__dirname,'../frontend/build')))

mc.connect('mongodb://127.0.0.1:27017').then(client=>{
    const dbObj = client.db('krith');

    const jobRecommends = dbObj.collection('jobRecommends');
    const userCred = dbObj.collection('userCred');
    const MPC = dbObj.collection('MPC');
    const BiPC = dbObj.collection('BiPC');
    const arts = dbObj.collection('arts');
    const diploma = dbObj.collection('diploma');
    const commerce = dbObj.collection('commerce');


    app.set('jobRecommends', jobRecommends);
    app.set('userCred', userCred);
    app.set('MPC', MPC);
    app.set('arts', arts);
    app.set('BiPC', BiPC);
    app.set('diploma', diploma);
    app.set('commerce', commerce)


    console.log("connected to mongoDB");
}) 


app.use(exp.json());

const job = require('./Routes/user');

app.use('/job-recommend', job);


//routing middleware from react || deals with page refresh 
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../frontend/build/index.html'))
})



app.use((err,req,res,next)=>{
    res.send({message : "error", payload : err})
})

app.listen(4000,()=>console.log("running on port 4000"))
