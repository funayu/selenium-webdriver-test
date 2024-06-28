// ブラウザを起動して特定のURLを開くスクリプト
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
(async function example() {
  // Builderクラスを使用してWebDriverインスタンスを作成
  let driver = await new Builder()
    .forBrowser('chrome') // 使用するブラウザを指定
    .setChromeOptions(new chrome.Options()) // 必要なオプションを設定
    .build(); // WebDriverインスタンスを構築;
  try {
    // 特定のURLを開く
    await driver.get('https://www.google.com');
    // タイトルを取得して表示
    let title = await driver.getTitle();
    console.log(title);
  } finally {
    await driver.quit();
  }
})();
