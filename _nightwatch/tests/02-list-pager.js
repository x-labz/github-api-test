module.exports = {
	before: function (browser) {
		browser._myTestData = {}
	},

	'repo list': function (browser) {

		browser
			.windowSize('current', 1024, 768)
			.url('file:///C:/_WORK/git-test/public/index.html')
			.waitForElementVisible('.item-list', 5000)
			.expect.element('.item-list article').to.be.visible.before(2500)
	},

	'pager-forward': function (browser) {
		browser
			.click('button[data-role="ff"]')
			.waitForElementPresent('.item-list .ajax', 1000)
			.waitForElementPresent('.item-list article', 1000)
			.expect.element('.item-list article').to.be.visible.before(2500)
	},

	'check current page = 2': function (browser) {
		browser
			.expect.element('.pager label').text.to.contain('page 2')
	},

	'pager-back': function (browser) {
		browser
			.click('button[data-role="rev"]')
			.waitForElementNotPresent('.item-list .ajax', 1000)
			.waitForElementPresent('.item-list article', 1000)
			.expect.element('.item-list article').to.be.visible.before(2500)
	},

	'check current page = 1': function (browser) {
		browser
			.expect.element('.pager label').text.to.contain('page 1')
	},

	after: function (browser) {
		browser.closeWindow();
	}

};