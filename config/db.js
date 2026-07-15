const { Pool } = require("pg");

const pool = new Pool({
    user: "u0_a451",
    host: "localhost",
    database: "hospital_db",
    password: "",
    port: 5432
});

module.exports = pool;
