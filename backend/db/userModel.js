const Datastore = require("nedb");
const bcrypt = require("bcrypt");
const saltRounds = 10;
class UserDAO {
  constructor(dbFilePath) {
    if (dbFilePath) {
      //embedded
      this.db = new Datastore({ filename: dbFilePath, autoload: true });
      console.log("connected to db: -->", dbFilePath);
    } else {
      //in memory
      this.db = new Datastore();
      console.log("connected to memory db");
    }
  }
  newUser(username, password, name, surname) {
    console.log("\x1b[35m", "Hereworks");

    const that = this;
    bcrypt.hash(password, saltRounds).then(function (hash) {
      var entry = {
        user: username,
        password: hash,
        personalInfo: {
          name: name,
          surname: surname,
        },
      };
      that.db.insert(entry, function (err) {
        if (err) {
          console.log("Can't insert user: ", username);
        }
      });
    });
  }
  lookup(user, cb) {
    console.log("\x1b[36m", "performingLookup");

    this.db.find({ user: user }, function (err, entries) {
      if (err) {
        return cb(null, null);
      } else {
        if (entries.length == 0) {
          return cb(null, null);
        }
        return cb(null, entries[0]);
      }
    });
  }
}
const dao = new UserDAO("./public/database.db");
module.exports = dao;
