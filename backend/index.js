const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

const userRouter = require('./routes/userRoutes');
app.use('/users', userRouter);

const productRouter = require('./routes/productRoutes');
app.use('/products', productRouter);

const checkoutRouter = require('./routes/checkoutRoutes');
app.use('/checkouts', checkoutRouter);

const conversationRouter = require('./routes/conversationRoutes');
app.use('/conversations', conversationRouter);

const messageRouter = require('./routes/messageRoutes');
app.use('/messages', messageRouter);

db.sequelize.sync().then(()=>{
    app.listen(8080, ()=>{
        console.log("Server running on post 8080")
    });
});


