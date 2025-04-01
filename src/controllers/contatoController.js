import db from '../db/db.js';

const handleServerError = (res,error)=>{
    console.log(error);
    res.status(500).send({erro:'um erro ocorreu'});
};

const getAllUsers = async(req, res) =>{
    try{
        const sql = 'SELECT * FROM usuarios';
        const usuarios = await db.query(sql);
        res.status(200).send(usuarios.rows);
    }
    catch(e){
        handleServerError(res,e);
    }
};

const getUserById = async (req,res) => {
    const id = req.params.id;
    try{
        const sql = 'SELECT * FROM usuarios WHERE id_usuario = $1';
        const usuarios = await db.query(sql,[id]);

        if(usuarios.rows.length === 0){
            return res.status(400).send({erro:'Usuario não encontrado'});
        }
        res.status(200).send(usuarios.rows);
    }
    catch(e){
        handleServerError(res,e);
    }
};

const postUser = async(req,res) =>{
    try{
        const{nome,cpf,email,senha} = req.body;
        const values = [nome,cpf,email,senha];
        const sql = 'INSERT INTO usuarios(nome,cpf,email,senha) VALUES ($1,$2,$3,$4) RETURNING *';

        const r = await db.query(sql,values);
        res.status(201).send(r.rows[0]);
    }
    catch(e){
        handleServerError(res,e);
    }

};

const updateUser = async(req,res)=>{
    const id = req.params.id;
    const usuarioAlterar = req.body;

    const col = Object.keys(usuarioAlterar);

    if(col.length === 0){
        return res.status(400).send({erro: 'Nenhum dado para atualizar'});
    }

    const sqlTemp = ['UPDATE usuarios', 'SET'];
    const temp = col.map((c,i)=> `${c} = $${i + 1}`);
    sqlTemp.push(temp.join(', '));
    sqlTemp.push(`WHERE id_usuario = $${col.length + 1} RETURNING *`);
    const sql = sqlTemp.join(' ');

    const atributos = col.map((c)=> usuarioAlterar[c]);

    try{
        const r = await db.query(sql,[...atributos,id ]);
        if(r.rows.length === 0 ){
            return res.status(404).send({erro:'Usuario não encontrado'});
        }
        res.status(200).send(r.rows[0]);
    }
    catch(e){
     handleServerError(res,e);   
    }
}

const deleteUser = async(req,res)=>{
    const id = req.params.id;

    try{
        const sql = 'DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *';
        const r = await db.query(sql,[id]);

        if(r.rows.length === 0 ){
            return res.status(404).send({erro: 'Usuario não encontrado'})
        }
        return res.status(200).send({mensagem:'Contato removido',contato: r.rows[0]});
    }
    catch(e){
        handleServerError(res,e);
    }
}


export default{
    getAllUsers,
    postUser,
    getUserById,
    updateUser,
    deleteUser,
}