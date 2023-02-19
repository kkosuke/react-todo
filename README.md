# ざっくり
- react、typescriptでTODOアプリを作ってみた。
- CSSはtailwind
- iconは、 https://heroicons.com
- `yarn install` 、`yarn start` で動くはず。
- node v18.7.0

# ファイル説明

## src
### src/components/MyMemo.tsx
- 開発者用のメモ

### src/components/FilterBy{XXX}.tsx
それぞれ絞り込み用のコンポーネントです。
- ID
- Status
- Date

### src/components/Todo.tsx
- TODOの表組みの1行(tr)のコンポーネント


## その他

### src/constants/Index.tsx
- 定数まとめたファイル
- TODOのステータスの初期値しか管理されていない。

### src/types/Index.d.ts
- 複数のファイルで扱うtypeを、このファイルに集約
- `import { todoType, deadlineType } from "../types/Index";` などでimport使い回す。

### src/function/Index.tsx
- 主にDateを受け取り、それぞれ加工して、新規Dataを返したり、文字列を返したり。
- 命名ルールがバラバラであったり、返り値の型を明記していないので、リファクタリング必要
- 日付管理のモジュールがあれば、今後不要になるかもしれない。
