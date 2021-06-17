const Page = require('./helpers/page');

let page;

// this works on the file that is used we cannot transfer beforEach and AfterEach to every file we need to write it on that file
beforeEach(async () => { // this will run before every single test
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => { // this will run after every single test 
  await page.close();
});

test('the header has the correct text', async () => {
  const text = await page.getContentsOf('a.brand-logo');

  expect(text).toEqual('Blogster');
});

test('clicking login starts oauth flow', async () => {
  await page.click('.right a');

  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test('When signed in, shows logout button', async () => {
  await page.login();

  const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);

  expect(text).toEqual('Logout');
});
