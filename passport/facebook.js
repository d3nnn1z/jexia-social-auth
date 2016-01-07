var FacebookStrategy = require('passport-facebook').Strategy;
var fbConfig = require('../config/fb');

module.exports = function(passport, dataApp) {
    passport.use('facebook', new FacebookStrategy({
      clientID : fbConfig.appID,
      clientSecret : fbConfig.appSecret,
      callbackURL : fbConfig.callbackUrl,
      profileFields: [
          'id',
          'email',
          'gender',
          'link',
          'locale',
          'name',
          'timezone',
          'updated_time',
          'verified'
      ]
    },

    function(access_token, refresh_token, profile, done) {
        process.nextTick(function() {
            // Check if we have a valid user
            // otherwise create one
            dataApp
              .dataset('accounts')
              .query({
                  where: {
                      "facebook.id": profile.id
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
                            facebook: {
                                id: profile.id,
                                access_token: access_token,
                                displayName: profile.displayName,
                                email: profile.emails[0].value
                            },
                            username: profile.emails[0].value,
                            email: profile.emails[0].value,
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName
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
