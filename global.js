
var HtmlReporter = require('nightwatch-html-reporter');
var reporter = new HtmlReporter({
    openBrowser: true,
    themeName: 'compact',
    reportsDirectory: __dirname + '/_nightwatch/results'
});
module.exports = {
    reporter: reporter.fn
};