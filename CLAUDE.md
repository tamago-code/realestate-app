# realestate-app

不動産関連アプリ。

## 技術スタック

- React + TypeScript + Vite
- React Router(ルーティング)
- Supabase(認証。メールアドレス+パスワード)
- 接続情報は `.env` の `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` で管理する(雛形は `.env.example`)
- コードのコメントは日本語で書く

## コマンド

- `npm install`:依存パッケージのインストール
- `npm run dev`:開発サーバー起動
- `npm run build`:型チェック+本番ビルド
- `npm run lint`:Lint(oxlint)

## GitHubリポジトリ

https://github.com/tamago-code/realestate-app.git

## Git運用ルール

- コードを変更するたびに、変更内容をコミットして GitHub(`origin`)へプッシュする。このプロジェクトではユーザーの都度の指示を待たずに行ってよい(グローバルの「コミットは明示的な依頼時のみ」より優先する)。
- コミットは意味のある変更単位ごとに分ける。メッセージは日本語で、何を・なぜ変えたかを1行目に簡潔に書く。
- テスト・型チェックが用意されている場合は、通ることを確認してからコミット・プッシュする。失敗したままプッシュしない。
- `.env` などの秘密情報・認証情報をコミットしない。必要なものは `.gitignore` に追加する。
- force push、`git reset --hard`、履歴の書き換え、ブランチ削除は事前にユーザーの承認を得る。
- プッシュが失敗した場合(リモート未設定、認証エラー、競合など)は勝手に解決せず、原因を報告して指示を仰ぐ。
