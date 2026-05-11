# LoggingLibrary
JavaScriptのログ出力を、統一したインターフェースで提供するためのライブラリです。  
C#の`Microsoft.Extensions.Logging`や`log4net`に影響を受けています。

## 特徴
- `LoggerFactory`から`Logger`を取得する
  - `LoggerFactory`は、設定jsonを`Configurator`を使って初期化することができる
  - ロガー名によって、出力ロジックを切り替えることができる
- `LogManager`の設定を変えることにより、動的に出力レベルの閾値を変更することができる
  - 閾値は一定時間キャッシュされる

## 構成プロジェクト
IDEはVisualStudioを使用しています。ソリューションは「01.Solution」内にあります。
### logging-core
コア機能

# その他
## 処理ラップではなく、処理ロジックを返す
ロガーのメソッドを使ってラップされた処理を呼び出すのではなく、ロジックそのもの(`console.log.bind(console)`)を取得するような作りにしています。  
ブラウザの開発者ツールのコンソールで`console.log`の呼び出し箇所を、できるだけ汚さないようにするためです。  
`MultiLogger`を使った場合は呼び出し箇所が汚れるので、必要であればブラウザの「無視リスト」機能を活用してください。  
## 実装されていない機能
log4netの様に、LoggerとAppenderの分離ができていません。  
Layout機能がありません。
Filter機能がありません。ロガー単位の下側閾値しか設定できません。  
