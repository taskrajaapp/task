
// npm init -y
// npm install puppeteer
// node main.js 
// it will run 99 times 

let puppeteer = require("puppeteer");


let curl = "https://www.entrepreneurship-campus.org/ideas/32/20259/";
let tempMailUrl = "https://temp-mail.io/en";

async function run(){
    let browser = await puppeteer.launch({
        // headless:false,
        defaultViewport: null,
        args: ['--start-maximized']
    });

    
    await browser.newPage();
    let pages = await browser.pages();
    let page = pages[0];
    let temp = pages[1];

    await page.bringToFront();
    
    await page.goto(curl);
    await page.waitForSelector(`a#CookieBoxSaveButton`);
    await page.click(`a#CookieBoxSaveButton`);
    await page.waitFor(1000);

    await temp.bringToFront();
    
    await temp.goto(tempMailUrl);
    await temp.waitFor(3000);


    await temp.waitForSelector(`button[data-original-title="Copy email"]`);
    await temp.click(`button[data-original-title="Copy email"]`);
    await temp.waitFor(1000);

    await page.bringToFront();
    await page.waitFor(1000);

    await page.waitForSelector(`input#guest-email`);
    await page.click(`input#guest-email`);
    await page.waitFor(500);

    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');

    await page.waitFor(500);

    await page.waitForSelector(`input#vote-privacy`);
    await page.click(`input#vote-privacy`);

    await page.waitFor(500);

    await page.waitForSelector(`input[value="Verify your email to vote!"]`);
    await page.click(`input[value="Verify your email to vote!"]`);

    await page.waitFor(5000);

    await temp.bringToFront();
    await temp.waitFor(5000);

    // await temp.waitForSelector(`div[title=""Entrepreneurship Campus" <no-reply@entrepreneurship-campus.org>"]`);
    // await temp.click(`div[title=""Entrepreneurship Campus" <no-reply@entrepreneurship-campus.org>"]`);

    await temp.waitForSelector(`li.message.list-complete-item`);
    await temp.click(`li.message.list-complete-item`);

    await temp.waitFor(1000);

    await temp.waitForSelector(`a[rel="nofollow"]`);
    await temp.click(`a[rel="nofollow"]`, {
        button: "middle"
    })

    await temp.waitFor(3000);

    let newPages = await browser.pages();
    let votePage = newPages[2];

    await votePage.bringToFront();
    await votePage.waitFor(1000);

    await votePage.waitForSelector(`input[value="vote now!"]`);
    await votePage.click(`input[value="vote now!"]`);

    await votePage.waitFor(5000);

    await browser.close();

}

async function run5times(){
    for(let i = 0; i<99; i++){
        await run();
        let j = i+1;
        console.log("Ran "+ j +" times.");
    }
}


run5times();


