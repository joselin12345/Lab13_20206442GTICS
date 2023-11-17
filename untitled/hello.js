const express = require("express");
const bodyParse = require("body-parser");
const mysql = require("mysql2");

var cors = require('cors')
const app = express()
app.use(cors())


const  conn = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bicicentro"
});

app.get("/trabajadores",(req,res) => {
    let sql = "select * from trabajadores";
    conn.query(sql,(err, result, fields) => {
        if(err) throw err;

        res.json(result);
    });

});


app.get("/trabajadores/:id",(req,res) => {

    let id = req.params["id"];

    let sql = "SELECT trabajadores.* , sedes.nombreSede FROM  trabajadores \n" +
        "LEFT JOIN sedes ON trabajadores.idsede = sedes.idsede\n" +
        "where dni = ?";

    conn.query(sql,[id], (err, result, fields) => {
        if(err) throw err;

        res.json(result);
    });

});

app.get("/trabajadores/ventas/:id",(req,res) => {

    let id = req.params["id"];

    let sql = "SELECT ventas.fecha ,  inventario.nombre , inventario.numeroserie , marcas.nombre as 'marca' FROM  ventas \n" +
        "LEFT JOIN inventario ON ventas.id_inventario = inventario.idinventario\n" +
        "LEFT JOIN marcas ON inventario.idmarca = marcas.idmarca\n" +
        "where ventas.dniTrabajador = ?";

    conn.query(sql,[id], (err, result, fields) => {
        if(err) throw err;

        res.json(result);
    });

});


app.get("/sedes",(req,res) => {
    let sql = "select * from sedes";
    conn.query(sql,(err, result, fields) => {
        if(err) throw err;

        res.json(result);
    });

});

app.get("/sedes/:id",(req,res) => {

    let id = req.params["id"];

    let sql = "SELECT *  FROM  sedes \n" +
        "where idsede = ?";

    conn.query(sql,[id], (err, result, fields) => {
        if(err) throw err;

        res.json(result);
    });

});

app.get("/sedes/trabajadores/:id",(req,res) => {

    let id = req.params["id"];

    let sql = "SELECT *  FROM  trabajadores \n" +
        "where idsede = ?";

    conn.query(sql,[id], (err, result, fields) => {
        if(err) throw err;

        res.json(result);
    });

});


app.listen(3000,function(){
    console.log("Servidor desplegado correctamente");
});