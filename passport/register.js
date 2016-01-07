var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, dataApp) {
	passport.use('register', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
			process.nextTick(function() {
				dataApp
	              .dataset('accounts')
				  .query({
					  where:{
						  username: username
					  }
				  })
	              .then(function(user) {

					  if(user && user.length !== 0) {
	                      return done(null, false, req.flash('message','User Already Exists'));
	                  } else {
						  dataApp
	                        .dataset('accounts')
	                        .create({
	                            username: username,
	                            password: createHash(password),
	                            email: req.body.email,
	                            firstName: req.body.firstName,
	                            lastName: req.body.lastName
	                        }).then(function(registeredUser) {
	                            return done(null, registeredUser);
	                        }, function(error) {
	                            throw new Error(error);
	                        });
	                  }
	              });
			});
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}
