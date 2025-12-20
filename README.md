# なかがわ電機サービス (Nakagawa Mechatronics Service)

SvelteKit + Tailwind CSS + microCMS で構築されたポートフォリオ/ブログサイトです。

## 技術スタック

- **Framework**: SvelteKit
- **Styling**: Tailwind CSS v4
- **CMS**: microCMS
- **Package Manager**: Bun

## セットアップ

### 1. 依存関係のインストール

```sh
bun install
```

### 2. 環境変数の設定

`.env` ファイルをプロジェクトルートに作成し、以下の環境変数を設定してください:

```env
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

### 3. microCMS API スキーマ

#### works エンドポイント (`/works`)

| フィールド名 | 表示名 | 種類 |
|-------------|--------|------|
| title | タイトル | テキストフィールド |
| description | 説明 | テキストフィールド |
| content | 本文 | リッチエディタ |
| thumbnail | サムネイル | 画像 |

#### blog エンドポイント (`/blog`)

| フィールド名 | 表示名 | 種類 |
|-------------|--------|------|
| title | タイトル | テキストフィールド |
| content | 本文 | リッチエディタ |
| thumbnail | サムネイル | 画像 |

## 開発

```sh
bun run dev

# ブラウザで自動的に開く
bun run dev -- --open
```

## ビルド

```sh
bun run build
```

## プレビュー

```sh
bun run preview
```

## ページ構成

- `/` - トップページ (Works一覧、SNS、Links)
- `/blog` - ブログ一覧 (最新3件 + 月別アーカイブ)
- `/blog/[slug]` - ブログ詳細
- `/works/[slug]` - Works詳細
