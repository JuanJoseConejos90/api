import roundround from "roundround";
import cluster from "./cluster";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "./../config";

var clusterNumber = ["master", "slave1", "slave2"];


async function signUp(req, res) {
    let conn;
    try {
        let passWord = bcrypt.hashSync(req.body.pass, 8);
        let next = roundround(clusterNumber);
        conn = await cluster.getConnection(next());
        var query = `CALL sp_createUser('${req.body.name}','${req.body.nickName}','${passWord}')`;
        const rows = await conn.query(query);
        if (rows.affectedRows === 0 || rows.affectedRows >= 1)
            return res.status(201).json({ code: 0, response: true });
        else return res.status(500).json({ code: 1, error: rows.affectedRows });
    } catch (err) {
        return res.status(500).json({ code: 1, error: err });
    } finally {
        if (conn) return conn.end();
    }
}


async function Login(req, res) {
    let conn;
    try {
        let passWord = bcrypt.hashSync(req.body.pass, 8);
        let next = roundround(clusterNumber);
        conn = await cluster.getConnection(next());
        let query = `CALL sp_Login('${req.body.nickName}','${passWord}')`;
        const rows = await conn.query(query);
        if (rows) {
            if (bcrypt.compareSync(req.body.pass, rows[0][0].Pass)) {
                let token = jwt.sign({ username: req.body.user }, config.SECRET_KEY, { expiresIn: config.EXPIRED });
                if (token) {
                    return res.status(200).json({
                        code: 0,
                        response: true,
                        token: token,
                        nickName: rows[0][0].nickName,
                    });
                } else {
                    return res.status(403).json({
                        code: 1,
                        response: false,
                        message: "Error generate TOKEN"
                    });
                }
            } else {
                return res.status(403).json({
                    code: 1,
                    response: false,
                    message: "Incorrect username or password"
                });
            }
        } else {
            return res.status(403).json({
                code: 1,
                response: false,
                message: "Incorrect username or password"
            });
        }
    } catch (err) {
        return res.status(500).json({ code: 1, error: err });
    } finally {
        if (conn) return conn.end();
    }
}


async function getTask(req, res) {
    let conn;
    try {
        let next = roundround(clusterNumber);
        conn = await cluster.getConnection(next());
        const rows = await conn.query("CALL sp_getTask()");
        return res.status(200).json({
            code: 0,
            response: true,
            tasks: rows[0]
        });
    } catch (err) {
        return res.status(500).json({ code: 1, response: false, error: err });
    } finally {
        if (conn) return conn.end();
    }
}


async function getTaskId(req, res) {
    let conn;
    try {
        let id = req.params.taskId;
        let next = roundround(clusterNumber);
        conn = await cluster.getConnection(next());
        const rows = await conn.query("CALL sp_getTaskId(" + id + ")");
        return res.status(200).json({ code: 0, response: true, task: rows[0] });
    } catch (err) {
        return res.status(500).json({ code: 1, response: false, error: err });
    } finally {
        if (conn) return conn.end();
    }
}

async function createTask(req, res) {
    let conn;

    try {

        var next = roundround(clusterNumber);
        conn = await cluster.getConnection(next());
        var query = `CALL sp_createTask('${req.body.name}','${req.body.description}','${req.body.state}')`;
        const rows = await conn.query(query);
        if (rows.affectedRows === 0 || rows.affectedRows >= 1)
            return res.status(201).json({ code: 0, response: true });
        else return res.status(500).json({ code: 1, error: rows.affectedRows });
    } catch (error) {
        return res.status(500).json({ code: 1, response: false, error: err });
    } finally {
        if (conn) return conn.end();
    }
}


async function updateTask(req, res) {
    let conn;

    try {

        var next = roundround(clusterNumber);
        conn = await cluster.getConnection(next());
        var query = `CALL sp_updateTask('${req.body.Id}','${req.body.name}','${req.body.description}',${req.body.state})`;
        const rows = await conn.query(query);
        if (rows.affectedRows === 0 || rows.affectedRows >= 1)
            return res.status(201).json({ code: 0, response: true });
        else return res.status(500).json({ code: 1, error: rows.affectedRows });
    } catch (error) {
        return res.status(500).json({ code: 1, response: false, error: err });
    } finally {
        if (conn) return conn.end();
    }
}

async function deleteTask(req, res) {
    let conn;
    try {
        let id = req.params.Id;
        var next = roundround(clusterNumber);
        conn = await cluster.getConnection(next());
        var query = `CALL sp_deleteTask(${id})`;
        const rows = await conn.query(query);
        if (rows.affectedRows === 0 || rows.affectedRows >= 1)
            return res.status(201).json({ code: 0, response: true });
        else return res.status(500).json({ code: 1, error: rows.affectedRows });
    } catch (err) {
        return res.status(500).json({ code: 1, response: false, error: err });
    } finally {
        if (conn) return conn.end();
    }
}

module.exports = {
    signUp,
    Login,
    getTask,
    getTaskId,
    createTask,
    updateTask,
    deleteTask
};
