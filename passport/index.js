var login = require('./login');
var register = require('./register');
var facebook = require('./facebook');
var twitter = require('./twitter');
var github = require('./github');

module.exports = function(passport, dataApp) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        dataApp
          .dataset('accounts')
          .query({
              where:{
                  id: id
              }
          })
          .then(function(user) {
              if(!user || user.length === 0) {
                  return done(null, false);
              }
              return done(null, user[0]);

          }).catch(function(error) {
               return done(null, false);
          });
    });

    login(passport, dataApp);
    register(passport, dataApp);
    facebook(passport, dataApp);
    twitter(passport, dataApp);
    github(passport, dataApp);
}
