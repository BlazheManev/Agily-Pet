const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'agilypet@outlook.com',
        pass: '12abc34!"#'
    }
});

transporter.use('compile', hbs({
    viewEngine: {
        extName: '.handlebars',
        partialsDir: './mailer/views',
        layoutsDir: './mailer/views',
        defaultLayout: false
    },
    viewPath: './mailer/views',
    extName: '.handlebars'
}));

module.exports = {
    sendEmail: (to, subject, text) => {
        transporter.sendMail({
            from: '"AgilyPet" <agilypet@outlook.com>',
            to: to,
            subject: subject,
            //text več ni pomemben, ker vse spremenljivke lahko obdelamo v handlebarsju/templejtu
            text: text,
            //template
            template: 'obvesti_agily',
            //namenjeno spremenljivkam
            context: {
                avtor: 'nek avtor'
            }
        }, (err, info) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(info.response);
            }
        });
    }
}