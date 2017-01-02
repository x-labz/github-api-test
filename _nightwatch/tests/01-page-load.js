module.exports = {	
	before: function(browser) {
		browser._myTestData = {}
	},
	
	'static content' : function (browser) {
		
		browser
			.windowSize('current', 1024, 768)
			.url('file:///C:/_WORK/git-test/public/index.html')
			.waitForElementVisible('header', 3000)	
			.expect.element('header').to.be.visible.before(500)  
	},

	'query user': function(browser) {
		browser
			.waitForElementVisible('[data-test="basedata-username"]',5000) 
			.assert.containsText('[data-test="basedata-username"]','Addy Osmani')

	},

	after: function(browser) {
		browser.closeWindow();
	}

	
};