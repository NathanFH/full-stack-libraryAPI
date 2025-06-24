import db from "../db/db.js";

const handleServerError = (res,error)=>{
    console.log(error);
    res.status(500).send({erro:'um erro ocorreu'});
};

const getLivrosDisponiveis = async (req, res) => {
    try {
        const sql = `
            SELECT * FROM livros
            WHERE id_livro NOT IN (
                SELECT id_livro FROM locacao WHERE status = true
            );
        `;
        const r = await db.query(sql);
        res.status(200).send(r.rows);
    } catch (e) {
        handleServerError(res, e);
    }
};

export default{
    getLivrosDisponiveis,
};
