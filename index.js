const express = require('express');
require('dotenv').config();
const router = require('./routes/routes');
const connectDB = require('./db/connect');
(async () => {
    await connectDB(
        `mongodb://172.19.0.2:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        },
        console.log('DB Connected')
    );
    try {
        const app = express();
        // Custom code
        app.use(express.json());
        app.use(router);
        app.listen(process.env.SERVER_PORT, () => {
            console.log(
                `Listening on http://localhost:${process.env.SERVER_PORT}`
            );
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
