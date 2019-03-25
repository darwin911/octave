const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = 'Secret';

const hash = async (password) => {
  return await bcrypt.hash(password, 10);
}

const compare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
}

const encode = (data) => {
  return jwt.sign(data, SECRET);
}

const verify = (token) => {
  return jwt.verify(token, SECRET);
}

const restrict = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const data = verify(token);
    res.locals.user = data;
    next();
  } catch(e) {
    console.log(e);
    res.status(401).send('Invalid Creds');
  }
}

const main = async() => {
  // const pw = 'bye';
  // const digest = await hash(pw);
  // const f = await compare('adfjp', digest);
  // const f = verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1yZ21haWxAZ21haWwuY29tIiwiaWQiOjYsImNyZWF0ZWRfYXQiOiIyMDE5LTAzLTEyVDIyOjU5OjIyLjc3NFoiLCJ1cGRhdGVkX2F0IjoiMjAxOS0wMy0xMlQyMjo1OToyMi43NzRaIiwiaWF0IjoxNTUyNDMyMzQ2fQ.1RaAn4z4_brSSKhpIPpqm6MeLu1nIaceIc53StifknE')
  console.log(digest);
}

// main();

module.exports = {
  hash,
  compare,
  encode,
  verify,
  restrict,
};
