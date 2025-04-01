import db from "../db/db.js";

const handleServerError = (res,error)=>{
    console.log(error);
    res.status(500).send({erro:'um erro ocorreu'});
};

const postLocacao = async(req,res) =>{
    try{
        const{id_usuario,id_livro,status} = req.body;

        const userExists = await db.query('SELECT id_usuario FROM usuarios WHERE id_usuario = $1', [id_usuario]);
        if (userExists.rows.length === 0) {
            return res.status(404).send({ erro: 'Usuário não encontrado' });
        }

        const livroExists = await db.query('SELECT id_livro FROM livros WHERE id_livro = $1', [id_livro]);
        if (livroExists.rows.length === 0) {
            return res.status(404).send({ erro: 'Livro não encontrado' });
        }

        const values = [id_usuario,id_livro,status];
        const sql = 'INSERT INTO locacao(id_usuario,id_livro,status) VALUES ($1,$2,$3) RETURNING *';

        const r = await db.query(sql,values);
        res.status(201).send(r.rows[0]);
    }
    catch(e){
        handleServerError(res,e);
    }
}

const getAllLocacao = async(req,res) => {
    try {
        const sql = `
            SELECT u.nome, l.titulo, loc.status 
            FROM locacao loc
            JOIN usuarios u ON loc.id_usuario = u.id_usuario
            JOIN livros l ON loc.id_livro = l.id_livro;
        `;

        const locacoes = await db.query(sql);
        res.status(200).send(locacoes.rows);
    }
    catch(e){
        handleServerError(res,e);
    }
};

export default{
    postLocacao,
    getAllLocacao,
};