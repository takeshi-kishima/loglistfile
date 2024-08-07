
# これは
./logs配下にある、Amazon S3 アクセスログをエクセルファイルに書き出します。

## 手順
npx を使用して TypeScript コンパイラを実行
```
npm run build
```
JavaScript ファイルの実行:
```
npm run start
```

# Amazon S3 アクセスログのCSV項目
### Amazon S3のアクセスログのCSVファイルには、以下の項目が含まれます：
1. Bucket Owner：ソースバケット所有者の正規ユーザーID。
1. Bucket Name：リクエストの処理ターゲットのバケットの名前。
1. Request DateTime：リクエストが受信された時間（UTC）。
1. Remote IP：リクエスタの表面上のIPアドレス。
1. Requester：リクエスタの正規ユーザーID。認証されていないリクエストの場合は"-"。
1. Request ID：各リクエストを一意に識別するためにAmazon S3で生成される文字列。
1. Operation：実行された操作（例：REST.GET.OBJECT）。
1. Key：オブジェクトのキー（パス）。
1. Request URI：リクエストのURI。
1. HTTP Status：HTTPステータスコード。
1. Error Code：エラーコード（エラーが発生した場合）。
1. Bytes Sent：送信されたバイト数。
1. Object Size：オブジェクトのサイズ（バイト数）。
1. Total Time：リクエストの総処理時間（ミリ秒）。
1. Turnaround Time：リクエストのターンアラウンドタイム（ミリ秒）。
1. Referrer：リクエストのリファラー。
1. User Agent：ユーザーエージェント。
1. Version ID：オブジェクトのバージョンID（バージョニングが有効な場合）。
1. Host ID：ホストID。
1. SigV：署名バージョン。
1. Cipher Suite：暗号スイート。
1. Auth Type：認証タイプ。
1. Endpoint：エンドポイント。
1. TLS Version：TLSバージョン。
1. Access Point ARN：アクセスポイントのARN。
1. ACL Required：ACLが必要かどうか（Yes/No）。