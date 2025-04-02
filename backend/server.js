import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import contatoRoutes from './src/routes/contatoRoutes.js';
import livroRoutes from './src/routes/livroRoutes.js';
import locarRoutes from './src/routes/locarRoutes.js';
import cors from 'cors';


dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use('/bib/user',contatoRoutes);
app.use('/bib/livro',livroRoutes);
app.use('/bib/locar',locarRoutes);


app.listen(process.env.APP_PORT, ()=>
    console.log('BIBLIOTECA - API WEB executando')
);