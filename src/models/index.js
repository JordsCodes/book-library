const Sequelize = require('sequelize');
const ReaderModel = require('./reader');
const BookModel = require('./book');
const AuthorModel = require('./author');
const GenreModel = require('./genre');

const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT } = process.env;

const setUpDatabase = () => {
  const connection = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    port: PGPORT,
    dialect: 'postgres',
    logging: false,
  });

  const Reader = ReaderModel(connection, Sequelize);
  const Book = BookModel(connection, Sequelize);
  const Author = AuthorModel(connection, Sequelize);
  const Genre = GenreModel(connection, Sequelize);

  Book.belongsTo(Reader);
  Book.belongsTo(Genre);
  Book.belongsTo(Author);
  Genre.hasMany(Book);
  Author.hasMany(Book);
  Reader.hasMany(Book);

  connection.sync({ alter: true });

  return { Reader, Book, Author, Genre };
};

module.exports = setUpDatabase();
