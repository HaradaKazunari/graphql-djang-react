
## 環境
| コンテナ  | 言語/ツール | バージョン |
|-----------|-------------|------------|
| app-back  | Python      | 3.11       |
| web-back  | Nginx       | 1.25.3     |
| app-front | Node        | 20.11      |
| db        | MySQL       | 8.0        |
| mailhog   | mailhog     | latest     |

### フロントエンド使用パッケージ
|  パッケージ名    |
|------------------|
| react            |
| react-router-dom |
| headless-ui              |

## プロジェクト作成
```
make create-project
```
### 必要なセッティング
``` setting.py
ALLOWED_HOSTS = ['gunicorn-django']
# ------------
# ------------
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # add
    # more source
]
```

```vite.config
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { host: true }, // add
});
```

ファイルに追記したら
```make
make restart
```


## 開発の継続
```
make init
```

## Git運用

1. featureブランチで作業
2. 作業終了後、mainブランチにマージリクエストを発行
3. ブランチのネーミング形式 `Ex. feature/画面or機能名`
4. コメント規則 `Ex. [feat] 新規モーダル機能追加`

| 区分  | 内容                                                                        |
| ----- | --------------------------------------------------------------------------- |
| feat  | 新機能に関するコミット                                                      |
| fix   | バグ修正に関するコミット                                                    |
| build | ビルド関連ファイルの修正/モジュールのインストールまたは削除に関するコミット |
| style | コードのスタイルやフォーマットに関するコミット                              |
| chore | その他の細かい変更に関するコミット                                          |
| docs  | 文書修正に関するコミット                                                    |
