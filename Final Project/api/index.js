const express = require('express');
const cors = require("cors");
const app = express();

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'developer',
        password: 'Tudorel1',
        database: 'weather'
    }
});

app.use(express.json());
app.use(cors());

app.get('/cities', async function(req, res) {
    const cities = await knex.select('id', 'name').from('cities');
    res.json(cities);
})

app.post("/cities", async function(req, res) {
    const result = await knex("cities").insert({
        name: req.body.name,
    });

    console.log(result);

    res.json(result[0]);
});

app.put("/cities/:id", async function(req, res) {
    await knex("cities")
        .update({ name: req.body.name })
        .where({
            id: req.params.id
        });

    res.json();


});

app.delete("/cities/:id", async function(req, res) {
    await knex("cities")
        .delete()
        .where({
            id: req.params.id
        });

    res.json();


});

app.listen(8080)