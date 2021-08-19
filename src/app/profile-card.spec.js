var { suite} = require('selenium-webdriver/testing');

const { By, Key, until } = require("selenium-webdriver");
require("chromedriver");

suite(function(env) {
    describe("Profile-card custom element", function(){

        let driver;
        before(async function(){
            //To wait for browser to build and launch properly
            driver = await env.builder().forBrowser("chrome").build();
            // do something before test suite execution
            // no matter if there are failed cases
        });
    
        after(function(){
            driver.quit()
            // do something after test suite execution is finished
            // no matter if there are failed cases
    
        });
    
        beforeEach(function(){
            // do something before test case execution
            // no matter if there are failed cases
    
        });
    
        afterEach(function(){
    
            // do something after test case execution is finished
            // no matter if there are failed cases
    
        });
    
        it("exist portfolio webpage", async function(){
            this.timeout(5000);
            await driver.get('http://localhost:9000');

            // let q = await driver.findElement(By.name('q'));
            // await q.sendKeys('webdriver', Key.RETURN);
            // return driver.getTitle();
            // console.log('Title is:',title);
            return driver.wait(until.titleIs('Portfolio'), 1000);
        });
    
        it("exist profile-card component", function(){
    
            // test Code
            // assertions
    
        });
    
        it("contains a profile", function(){
    
            // test Code
            // assertions
    
        });
    
    });
});