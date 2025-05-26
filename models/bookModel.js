const fs = require('fs');
const path = './data/books.json';

const readBooks = () => {
  const data = fs.readFileSync(path, 'utf8');
  return JSON.parse(data || '[]');
};

const writeBooks = (books) => {
  fs.writeFileSync(path, JSON.stringify(books, null, 2));
};

module.exports = { readBooks, writeBooks };
