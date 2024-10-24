const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'views');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mahasiswa'
});

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('Mysql connected...');

});

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM mhs';
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        const users =JSON.parse(JSON.stringify(result));
        console.log('hasil database -> ', users);
    res.render('index', {users: users, title: 'MAHASISWA'});
    });   
});


app.post('/hapus/:nama', (req, res) => {
  const nama = req.params.nama;
  db.query(`DELETE FROM mhs WHERE nama = ?`, [nama], (err, result) => {
    if(err) {
      throw err;
    }
    res.redirect('/');
    console.log('data di hapus');
  });
});

app.post('/tambah', (req, res) => {
    const { nama, fakultas } = req.body;
    const sql = `INSERT INTO mhs (nama, fakultas) VALUES ('${nama}', '${fakultas}')`;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log('data ditambahkan');
        res.redirect('/');
    });
});

app.post('/edit', (req, res) => {
    const { id, nama, fakultas } = req.body;
    const sql = `UPDATE mhs SET nama = '${nama}', fakultas = '${fakultas}' WHERE id = ${id}`;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log('data di ubah');
        res.redirect('/');
    });
});

app.get('/cari/:nama', (req, res) => {
    const { nama } = req.params;
    const sql = `SELECT * FROM mhs WHERE nama = ?`;
    db.query(sql, [nama], (err, result) => {
        if(err) {
        throw err;
        }
        const users = JSON.parse(JSON.stringify(result));
        res.render('index', {users: users, title: 'MAHASISWA'});
    });
});

app.listen(8080, () => {
    console.log('Server running on port 8000');
})