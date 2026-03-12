# 北海道 旅行プラン（スマホ閲覧用）

`hokkaido-trip.jsx` をReact（Vite）アプリとしてGitHub Pagesで公開し、URLからスマホで見れるようにするためのプロジェクトです。

## ローカルで見る

```bash
npm install
npm run dev
```

## GitHub Pagesで公開する（自動デプロイ）

1. GitHub に新規リポジトリを作成（例: `hokkaido-trip`）
2. このフォルダを `main` ブランチでpush
3. GitHub のリポジトリ設定で Pages を有効化  
   - Settings → Pages → **Build and deployment** → Source: **GitHub Actions**

push後、Actionsが成功すると公開URLが発行されます。

