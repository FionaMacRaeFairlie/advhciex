const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const userModel = require("../db/userModel");
const bcrypt = require("bcrypt");

exports.init = function (app) {
  // setup password
  console.log("hey trying to init");
  passport.use(
    new Strategy(
      { usernameField: "username", passwordField: "password" },
      function (userName, password, cb, req, res) {
        // cb is callback
        // console.log("INIT STRATEGY");
        userModel.lookup(userName, function (err, user) {
          if (err) {
            console.log("error looking up user", err);

            ///res.status(401);
            // res.end(info.message);
            return cb(err);
          }
          if (!user) {
            console.log("user ", userName, " not found");
            // res.status(401);
            //res.end(info.message);
            return cb(null, false);
          } //compare provided password with stored password
          bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
              console.log("user ok");
              cb(null, user);
            } else {
              console.log("USER NOT OK");
              cb(null, false);
            }
          });
        });
      }
    )
  ); //For session handling we need serialize and deserialize users.
  //Simplest is just to use the 'username' field.
  passport.serializeUser(function (user, cb) {
    console.log(user.user);
    cb(null, user.user);
  });
  passport.deserializeUser(function (id, cb) {
    userModel.lookup(id, function (err, user) {
      if (err) {
        return cb(err);
      }

      cb(null, user);
    });
  });
};

exports.authorize = function (redirect, req, res) {
  console.log("\x1b[35m", "authorize");

  return passport.authenticate(
    "local",
    {
      //successRedirect: "/",
      failureRedirect: redirect,
      failureFlash: "Invalid username or password.",
      successFlash: "Auth",
    }
    // (req, res) => {
    //   console.log("response", res);
    //   return res;
    // }
  );
};
