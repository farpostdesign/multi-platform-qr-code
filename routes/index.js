var express = require('express');
var router = express.Router();
var qr = require('qr-image');


router.get('/', function(req, res, next) {
    var hostURL = req.protocol + '://' + req.get('host') + req.originalUrl;
    var qrCodeSvgString = qr.imageSync(hostURL + 'pr', { type: 'svg' });

    res.render('index', {
        title: 'Scan QR code with your mobile device to know your platform',
        qrCodeSvgString: qrCodeSvgString
    });
});

router.get('/pr', function(req, res, next) {
    var userAgent = req.get('user-agent');
    var platform = PlarformDetector.fromUserAgetnStr(userAgent)

    res.redirect(302, PlarformRedirects.urlFor(platform));
});

router.get('/not-supported-platform', function(req, res, next) {
    res.render('not-supported-platform');
});

var PlarformDetector = {
    fromUserAgetnStr: function(userAgentStr) {
        return userAgentStr.match(/OS X|Android/)[0];
    }
}

var PlarformRedirects = {
    'OS X': 'https://itunes.apple.com',
    'Android': 'https://play.google.com/store/apps',
    'Not supported': '/not-supported-platform',

    urlFor: function(platformStr) {
        return PlarformRedirects[platformStr] || PlarformRedirects['Not supported']
    }
}

module.exports = router;
