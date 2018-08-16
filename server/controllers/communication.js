//const mailgun = require('../config/mailgun');
var config =require ("../config/main")
var nodemailer = require("nodemailer");

exports.sendContactForm = function (req, res, next) {

	var  transporter = nodemailer.createTransport({
	  service: 'Gmail',
	  auth: {
	    user: config.gmailEmail,
	    pass: config.gmailPassword,
	  },
	});

  	/* email to site admin */
	var html = 'Hello Donnies list Admin, <br> Someone contacted you on Donnies list';
	html += '<p>Following is user information:</p>';
	html += '<p>-----------------------</p>';
	html += '<p>First Name : '+req.body.firstName+'</p>';
	html += '<p>Last Name : '+req.body.lastName+'</p>';
	html += '<p>Subject : '+req.body.subject+'</p>';
	html += '<p>Email : '+req.body.emailAddress+'</p>';
	html += '<p>Message : '+req.body.message+'</p>';
	html += '<p>-----------------------</p>';
	html += '<p><br>Thank you, Team Donnies List</p>';

	var mailOptions = {
	  from   : "Donnies list <no-reply@donnieslist.com>",
	  to     : 'donnydey@gmail.com',
	  subject: "Donnies List Session Request",
	  html   : html
	};

    /* email to contact request person */
	var html1 = 'Hello '+req.body.firstName+', <br> Thank you for submitting your request.';
	html1 += '<br><p>We will contact you soon! <br>Thank you, Team Donnies List</p>';
	var mailOptions1 = {
	  from   : "Donnies list <no-reply@donnieslist.com>",
	  to     : req.body.emailAddress,
	  subject: "Donnies list contact request",
	  html   : html1
	};
	transporter.sendMail(mailOptions, function(error, info){
	  if(error){
	      console.log("In error of nodemailer")
	      console.log(error);
	  }else{
	    console.log('Message sent to user: ' /*+ JSON.stringify(info)*/);
	  }
	});
  	//mailgun.contactForm(fromText, message);

  return res.status(200).json({ message: 'Your email has been sent. We will be in touch with you soon.' });
};
