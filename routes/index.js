var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

module.exports = function(passport){
	router.get('/', isAuthenticated, function(req, res) {
		res.render('index', { user: req.user, message: req.flash('message') });
	});

	router.get('/login', function(req, res) {
		if( req.isAuthenticated() ) {
			res.redirect('/');
		}
		res.render('login', { message: req.flash('message') });
	});

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash : true
	}));

	router.get('/register', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	router.post('/register', passport.authenticate('register', {
		successRedirect: '/',
		failureRedirect: '/register',
		failureFlash : true
	}));

	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// Facebook
	router.get('/login/facebook', passport.authenticate('facebook'));
	router.get('/login/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/',
			failureRedirect : '/login'
		})
	);

	// Twitter
	router.get('/login/twitter', passport.authenticate('twitter'));
	router.get('/login/twitter/callback',
		passport.authenticate('twitter', {
			successRedirect : '/',
			failureRedirect : '/login',
			failureFlash : true
		})
	);

	// Github
	router.get('/login/github', passport.authenticate('github'));
	router.get('/login/github/callback',
		passport.authenticate('github', {
			successRedirect : '/',
			failureRedirect : '/login',
			failureFlash : true
		})
	);

	return router;
}
