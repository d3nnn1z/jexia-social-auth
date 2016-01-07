var TwitterStrategy = require('passport-twitter').Strategy;
var twitterConfig = require('../config/twitter');

module.exports = function(passport, dataApp) {
    passport.use('twitter', new TwitterStrategy({
        consumerKey : twitterConfig.apikey,
        consumerSecret : twitterConfig.apisecret,
        callbackURL : twitterConfig.callbackURL
    },
    function(token, tokenSecret, profile, done) {
        process.nextTick(function() {
            // Check if we have a valid user
            // otherwise create one
            dataApp
              .dataset('accounts')
              .query({
                  where: {
                      "twitter.id": profile.id
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
