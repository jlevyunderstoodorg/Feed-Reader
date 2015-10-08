$(function() {
	/*
	* This test suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* 
         * This test makes sure that the allFeeds
         * variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* 
         * This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has all URLs defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            };
         });
        /*
         * This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has all names defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            };
         });
     });
	/*
	 * This test suite is all about the functionality of the menu.
     */
    describe('The Menu', function() {
    	/* 
    	 * Global variables to be used throughout the test suite.
    	 */
    	 var body = $('body');
         var menuIcon = $('a.menu-icon-link');

        /*
         * This test ensures the menu element is hidden by default.
         */
         it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
         });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. 
          * This test has two expectations...
          */

         /*
          * Does the menu display when clicked.
          */
         it('displays when clicked', function() {
            menuIcon.trigger('click');
            expect(body.hasClass('')).toBe(true);
         });

         /*
          * Does it hide when clicked again.
          */
         it('hides when clicked again', function() {
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
         });
    });
    /*
     * This test suite is all about testing the initial feed entries.
     */
    describe('Initial Entries', function() {
    	/*
         * This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * LoadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
            loadFeed(0, done);
         });
        
         it('has a single entry', function() {
             expect($('.feed .entry').length).toBeGreaterThan(0);
         });
    });
    /*
     * This test suite is all about content changes in a feed.
     */
    describe('New Feed Selection', function() {
    	/* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * LoadFeed() is asynchronous.
         */

         /* 
    	 * Global variables to be used throughout the test suite.
    	 */
         var feedOne, feedTwo;
         
         /*
         * Call the loadFeed function twice in order to compare
         * if feed content changes after a new feed is loaded.
         */
         beforeEach(function(done) {
            loadFeed(0, function() {
            	/* Set the first feed.*/
                feedOne = $('.feed').html();
            
                loadFeed(1, function() {
                	/* Set the second feed.*/
                    feedTwo = $('.feed').html();
                    done();
                });
            });
        });
         /*
          * Test if new content has changed compared to initial content.
          */
        it('content changes when new feed loads', function(done) {
            expect(feedTwo).not.toBe(feedOne);
            done();
        });
     });   
}());