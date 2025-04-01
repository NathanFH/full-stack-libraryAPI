import db from '../db/db.js';

const handleServerError = (res,error)=>{
    console.log(error);
    res.status(500).send({erro:'um erro ocorreu'});
};

const getAllBook = async(req, res) =>{
    try{
        const sql = 'SELECT * FROM livros';
        const livros = await db.query(sql);
        res.status(200).send(livros.rows);
    }
    catch(e){
        handleServerError(res,e);
    }
};

const getBookById = async (req,res) => {
    const id = req.params.id;
    try{
        const sql = 'SELECT * FROM livros WHERE id_livro = $1';
        const livros = await db.query(sql,[id]);

        if(livros.rows.length === 0){
            return res.status(400).send({erro:'Usuario não encontrado'});
        }
        res.status(200).send(livros.rows);
    }
    catch(e){
        handleServerError(res,e);
    }
};

const postBook = async(req,res) =>{
    try{
        const{titulo,isbn,edicao,ano} = req.body;
        const values = [titulo,isbn,edicao,ano];
        const sql = 'INSERT INTO livros(titulo,isbn,edicao,ano) VALUES ($1,$2,$3,$4) RETURNING *';

        const r = await db.query(sql,values);
        res.status(201).send(r.rows[0]);
    }
    catch(e){
        handleServerError(res,e);
    }

};

const updateBook = async(req,res)=>{
    const id = req.params.id;
    const livroAlterar = req.body;

    const col = Object.keys(livroAlterar);

    if(col.length === 0){
        return res.status(400).send({erro: 'Nenhum dado para atualizar'});
    }

    const sqlTemp = ['UPDATE livros', 'SET'];
    const temp = col.map((c,i)=> `${c} = $${i + 1}`);
    sqlTemp.push(temp.join(', '));
    sqlTemp.push(`WHERE id_livro = $${col.length + 1} RETURNING *`);
    const sql = sqlTemp.join(' ');

    const atributos = col.map((c)=> livroAlterar[c]);

    try{
        const r = await db.query(sql,[...atributos,id ]);
        if(r.rows.length === 0 ){
            return res.status(404).send({erro:'Livro não encontrado'});
        }
        res.status(200).send(r.rows[0]);
    }
    catch(e){
     handleServerError(res,e);   
    }
}

const deleteBook = async(req,res)=>{
    const id = req.params.id;

    try{
        const sql = 'DELETE FROM livros WHERE id_livro = $1 RETURNING *';
        const r = await db.query(sql,[id]);

        if(r.rows.length === 0 ){
            return res.status(404).send({erro: 'Livro não encontrado'})
        }
        return res.status(200).send({mensagem:'Livro removido',contato: r.rows[0]});
    }
    catch(e){
        handleServerError(res,e);
    }
}


export default{
    getAllBook,
    postBook,
    getBookById,
    updateBook,
    deleteBook,
}