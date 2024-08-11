const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { BASE_URL } = require('../../constants');

describe('トップページのリンクテスト', () => {
  let driver;

  beforeAll(async () => {
    try {
      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options())
        .build();
      console.log(`Driver initialized:`, driver);
    } catch (error) {
      console.error(`Error initializing WebDriver:`, error);
    }
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('全てのリンクが正しいページに遷移すること', async () => {
    await driver.get(BASE_URL);

    // ページ内の全てのリンク要素を取得
    let links = await driver.findElements(By.tagName('a'));

    // 広告リンクを除外する
    const filteredLinks = await Promise.all(
      links.map(async (link) => {
        try {
          // もしリンクが広告タグの子要素であればフィルタリングする
          await link.findElement(
            By.xpath("ancestor::ins[contains(@class, 'adsbygoogle')]")
          );
          console.log(`Skipping ad link: ${await link.getAttribute('href')}`);
          const adUrl = await link.getAttribute('href');
          console.log(`Skipping ad link: ${adUrl}`);
          // 広告リンクの場合はnullを返す
          return null;
        } catch (error) {
          // 広告リンクでない場合はそのまま返す
          return link;
        }
      })
    ).then((results) => results.filter((link) => link !== null));

    // // フィルタリング後のリンクをコンソールに表示
    // for (let link of filteredLinks) {
    //   let url = await link.getAttribute('href');
    //   console.log(`Filtered link: ${url}`);
    // }

    // for (let link of filteredLinks) {
    //   // リンクのhref属性からurl取得
    //   let url = await link.getAttribute('href');

    //   if (url && url.startsWith(BASE_URL)) {
    //     try {
    //       // 取得したurlに遷移する
    //       await driver.get(url);
    //       // ページが正しくロードされるまで最大10秒待機する
    //       await driver.wait(until.urlIs(url), 10000);
    //       // 遷移先のページタイトルを取得する
    //       let title = await driver.getTitle();
    //       console.log(`Navigated to: ${url} - Title: ${title}`);
    //       // タイトルが、空文字 ('')、null、undefinedではないことをテストする
    //       expect(title).toBeTruthy();
    //       // 次のリンクを確認するために元のページに戻る
    //       await driver.navigate().back();
    //       await driver.wait(until.urlIs(BASE_URL), 10000);
    //     } catch (error) {
    //       console.error(`Error navigating to: ${url}`, error);
    //     }
    //   }
    // }
  }, 30000);
});
