/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a URL defined and are not empty', function() {
          allFeeds.forEach(function(feed) {
            //must exist
            expect(feed.url).toBeDefined();
            //cannot be an empty string
            expect(feed.url.length).not.toBe(0);
          });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have a name defined and names are not empty', function() {
           allFeeds.forEach(function(feed) {
             //must exist
             expect(feed.name).toBeDefined();
             //cannot be an empty string
             expect(feed.name.length).not.toBe(0);
           });
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         // The index.html file has the .menu-hidden class added to the body by default
          it('is hidden by default', function() {
            var hidden = $('body').hasClass('menu-hidden');
            expect(hidden).toBe(true);
          });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          // JS in the app.js file toggles the .menu-hidden class on the body
          it('toggles visibility when the icon is clicked', function() {
            var menuIcon = $('.menu-icon-link');

            //When you click to open, the menu-hidden class should be removed
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            //When you click to close the menu-hidden class should be added
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
           loadFeed(0, done);
         });

         it('has at least one entry element in the feed container', function() {
           expect($('.feed .entry').length).toBeGreaterThan(0);
         });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous
         */
         // This variable will store the first set of feeds
         var originalFeed;

         beforeEach(function(done) {
           loadFeed(0, function() {
             //Grab the text content from the first set of feeds
             originalFeed = $('.feed').text();
             //Call the function again to have it update the feeds
             loadFeed(1, done);
           });
         });

         it('updates content when a new feed is loaded', function() {
           expect($('.feed').text()).not.toBe(originalFeed);
         });
    });
}());
