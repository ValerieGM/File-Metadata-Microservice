require('dotenv').config()
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  let upfile = req.file;

  if (typeof upfile === 'undefined')
    res.json({ error: 'File not uploaded' });

  return res.json({
    name: upfile.originalname,
    type: upfile.mimetype,
    size: upfile.size
  });
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port)
});
