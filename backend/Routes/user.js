const exp = require('express');
const userApp = exp.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


userApp.use((req,res,next)=>{
    jobRecommends = req.app.get('jobRecommends');
    userCred = req.app.get('userCred');
    MPC = req.app.get('MPC');
    BiPC = req.app.get('BiPC');
    arts = req.app.get('arts');
    diploma = req.app.get('diploma');
    commerce = req.app.get('commerce');
    next();
})



userApp.post('/registration', async (req, res) => {
    let newUser = req.body;
    const status = await userCred.findOne({ email: newUser.email });
    if (status != null) {
        res.send({ message: "user exists" });
    } else {
        let newPassword = await bcryptjs.hash(newUser.password, 4);
        newUser.password = newPassword;
        await userCred.insertOne(newUser);
        res.send({ message: "user added" });
    }
});


userApp.post('/login', async (req, res) => {
    let user = req.body;
    const status = await userCred.findOne({ mail: user.mail });
    if (status === null) {
        res.send({ message: "credentials don't exist" });
    } else {
        const pass = await bcryptjs.compare(user.password, status.password);
        if (!pass) {
            res.send({ message: "invalid password" });
        } else {
            const signedToken = jwt.sign({ email: user.email }, "qwerty", { expiresIn: '1d' });
            res.send({ message: "login success", token: signedToken, user: status });
        }
    }
});



userApp.put('/reset-password', async (req, res) => {
    const userDetails = req.body;
    let user = await userCred.findOne({ mail: userDetails.mail });

    if (user === null) {
        res.send({ message: "credentials do not exist" });
    } else {
        let pass = await bcryptjs.compare(userDetails.oldPassword, user.password);
        if (!pass) {
            res.send({ message: "entered wrong password" });
        } else {
            user.password = await bcryptjs.hash(userDetails.newPassword, 4);
            await userCred.updateOne({ mail : userDetails.mail }, { $set: { password: user.password } });
            res.send({ message: "password changed" });
        }
    }
});


userApp.get('/mpc', async(req,res)=>{
    let resource = await MPC.findOne();
    res.send({message : resource});
})


userApp.get('/bipc', async(req,res)=>{
    let resource = await BiPC.findOne();
    res.send({message : resource});
})


userApp.get('/diploma', async(req,res)=>{
    let resource = await diploma.findOne();
    res.send({message : resource});
})


userApp.get('/arts', async(req,res)=>{
    let resource = await arts.findOne();
    res.send({message : resource});
})

userApp.get('/commerce', async(req, res)=>{
    let resource = await commerce.findOne();
    res.send({message : resource});
})


module.exports = userApp;