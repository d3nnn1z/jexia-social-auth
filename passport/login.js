var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, dataApp) {

	passport.use('login',
		new LocalStrategy({
        	passReqToCallback : true
    	},
		function(req, username, password, done) {
			dataApp
	          .dataset('accounts')
	          .query({
				  where:{
					  username: username
				  }
			  })
	          .then(function(user) {
	              if(!user || user.length === 0) {
	                  return done(null, false, req.flash('message', 'Not a valid user'));
	              }

				  user = user[0];

	              if (!isValidPassword(user, password) || user.length === 0){
	                  return done(null, false, req.flash('message', 'Not a valid user'));
	              }

	              return done(null, user);

	          }).catch(function(error) {
				  console.log(error);
			  });
		})
    );

    var isValidPassword = function(user, password) {
        return bCrypt.compareSync(password, user.password);
    }
}
