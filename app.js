/require('dotenv').config({ path: `${process.cwd()}/.env` });

const express = require('express');
const cors = require('cors');

const authRouter = require('./route/authRoute');

const app = express();

// Middlewares
app.use(express.json());

// CORS (liberado para seu front no Vercel)
app.use(cors({
    origin: "https://tera-link-front.vercel.app",
    credentials: true
}));

// Rota de teste
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'servidor conectado.'
    });
});

// Rotas principais
app.use('/auth', authRouter);

// 404
app.use('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: 'Route não encontrada'
    });
});

// Porta do Render (IMPORTANTE)
const PORT = process.env.PORT || 4000;

// Start servidor
app.listen(PORT, () => {
    console.log('Servidor rodando na porta', PORT);
});