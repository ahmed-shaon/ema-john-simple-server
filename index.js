const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


//middle wares
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4dokkij.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const productCollection = client.db("emaJohnSimpleMongoCrud").collection("products");

        app.get('/products', async (req, res) => {
            const query = {};
            const cursore = productCollection.find(query);
            const products = await cursore.toArray();
            res.send(products);
        })

    }
    finally{

    }
}
run().catch(err => console.log(err))



app.get('/', (req, res) => {
    res.send('ema-john server is running ');
})


app.listen(port, () => {
    console.log(`Server is running on prot ${port}`);
})