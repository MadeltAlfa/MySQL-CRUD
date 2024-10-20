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
    res.render('index', {users: users, title: 'Mahasiswa'});
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
    const { nama, kelas } = req.body;
    const sql = `INSERT INTO mhs (nama, kelas) VALUES ('${nama}', '${kelas}')`;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log('data ditambahkan');
        res.redirect('/');
    });
});

app.listen(8000, () => {
    console.log('Server running on port 8000');
})