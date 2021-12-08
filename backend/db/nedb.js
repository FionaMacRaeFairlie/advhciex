const nedb = require("nedb");
class dbModel {
  constructor(dbPath) {
    if (dbPath) {
      this.db = new nedb({ filename: dbPath, autoload: true });

      console.log("DB connected to " + dbPath);
    } else {
      this.db = new nedb();
      this.init();
    }
    this.init();
  }

  init() {
    // this.db.insert({
    //   name: "Squat",
    //   recovery: "30s",
    //   category: "exercise",
    // });
    console.log("db started");
  }

  getAllEntries() {
    return new Promise((resolve, reject) => {
      this.db.find({}, function (err, dbData) {
        if (err) {
          reject(err);
        } else {
          resolve(dbData);
        }
      });
    });
  }

  registerUser() {}
}
module.exports = dbModel;
