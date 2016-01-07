var GithubStrategy = require('passport-github').Strategy;
var githubConfig = require('../config/github');

module.exports = function(passport, dataApp) {
    passport.use('github', new GithubStrategy({
        clientID: githubConfig.clientId,
        clientSecret : githubConfig.clientSecret,
        callbackURL : githubConfig.callbackURL
    },
    function(token, tokenSecret, profile, done) {
        process.nextTick(function() {
            // Check if we have a valid user
            // otherwise create one
            dataApp
              .dataset('accounts')
              .query({
                  where: {
                      "github.id": profile.id
                  }
              })
              .then(function(user) {
                  return user;
              })
              .then(function(user) {
                  if(!user || user.length === 0) {
                      dataApp
                        .dataset('accounts')
                        .create({
                            twitter: {
                                id: profile.id,
                                token: token,
                                displayName: profile.displayName
                            },
                            username: profile.username
                        })
                        .then(function(registeredUser) {
                            return done(null, registeredUser);
                        }, function(error) {
                            return done(error, 'An error occured');
                        }).catch(function(e) {
                            throw new Error(e);
                        });

                  } else { // Existing user
                      return done(null, user[0]);
                  }
              });
        });
    }));
}
