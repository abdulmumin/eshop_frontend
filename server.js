import express from 'express';
import  mongoose from 'mongoose';
import data from './data.js'
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';


dotenv.config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb: //localhost/E-commerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use('/api/users', userRouter);


app.get('/api/products/:id', (req,res) => {
    const product = data.products.find((item) => item._id === Number(req.params.id));
    if (!product) {
        res.status(500).send({ message: "Product not found"});
    } else {
        res.send(product);
    }
});



app.get('/api/products', (req,res) => {
    res.send(data.products)
})
app.get('/', (req, res) => {
    res.send("server is ready");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server at http://localhost:${port}`)
});

process.on('unhandledRejection', (reason, promise) => {
    // do something
  });