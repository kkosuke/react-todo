import { useState } from "react";
export const MyMemo = () => {
  const [isShow, setIsShow] = useState(false);
  const toggleShow = () => {
    setIsShow(!isShow);
  };
  return (
    <div className="mt-8">
      <button
        onClick={toggleShow}
        className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        開発用のメモを見る
      </button>
      {isShow && (
        <>
          <section className="mt-4 p-4 rounded-lg bg-gray-100">
            <h2 className="font-bold text-lg">icon, tailwind</h2>
            <ul className="mt-4">
              <li>
                <a href="https://heroicons.com/">https://heroicons.com/</a>
              </li>
              <li>
                <a href="https://tailwindcss.com/docs/installation">
                  https://tailwindcss.com/docs/installation
                </a>
              </li>
              <li>
                <a href="https://tailwindui.com/?ref=top">
                  https://tailwindui.com/?ref=top
                </a>
              </li>
              <li>
                <a href="https://zenn.dev/knaka0209/books/9e86ccb888758c/viewer/663286">
                  https://zenn.dev/knaka0209/books/9e86ccb888758c/viewer/663286
                </a>
              </li>
            </ul>
            <h2 className="font-bold text-lg mt-4">説明/学習法</h2>
            <p className="mt-4">TODOリストをつくってみる。ReactHooksを使う。</p>
            <p className="line-through">
              ReactHooksを使う（useStateやuseEffect）
            </p>
            <p className="line-through">TypeScriptで書く</p>
            <p className="line-through">
              → anyを使用しても良いので型エラーを解消する
            </p>
            <p>▼TODOリスト内の各TODOにほしい要素</p>
            <p className="line-through">ID(連番もしくはuuidを設定)</p>
            <p className="line-through">タイトル</p>
            <p className="line-through">
              ステータス(未着手、進行中、完了 など)
            </p>
            <p className="line-through">詳細</p>
            <p>▼ほしい機能</p>
            <p className="line-through">TODOの追加</p>
            <p className="line-through">TODOの削除</p>
            <p className="line-through">TODOの編集機能</p>
            <p className="line-through">絞り込み機能(IDで絞り込み)</p>
            <p className="line-through">絞り込み機能(期限で絞り込み)</p>
            <p className="line-through">絞り込み機能(ステータスで絞り込み)</p>
            <p>▼余裕があれば以下のようなカスタマイズをする</p>
            <p className="line-through">anyを使わずに型付けを行なう</p>
            <p className="line-through">
              期限の追加などの要素追加（期限、内容、作成日、更新日など）
            </p>
            <p className="line-through">ソート(ID)</p>
            <p className="line-through">ソート(期限)</p>
            <p className="line-through">ステータス変更でスタイル変更</p>
            <p className="line-through">コンポーネント化してみる</p>
            <p className="line-through">
              MaterialUIやChakraUI、もしくはTailwind CSSを使ってみる
            </p>
            <p>Recoilを使って状態管理</p>
            <p>Firebaseまたは、Supabaseを導入してデータの永続化</p>
            <h2 className="font-bold text-lg mt-4">やれたらいいな</h2>
            <ul className="mt-4">
              <li className="line-through">
                todoの項目を簡単に増やせるようになる
              </li>
              <li className="line-through">todoの編集のキャンセル</li>
              <li className="line-through">並び替え（単体）</li>
              <li className="line-through">並び替え（複数）</li>
              <li className="line-through">絞り込み検索（完全一致、含む）</li>
              <li>絞り込みの掛け合わせでなく、いい感じにできないか</li>
              <li>todoリストのその場で修正</li>
              <li>絞り込み検索（あいまい）</li>
              <li>csvエクスポート ダウンロード、インポート</li>
              <li>日にち制御を簡単に</li>
              <li>tailwindでRWD</li>
              <li>もっといい感じにコンポネント化</li>
              <li>独自ReactHooks</li>
              <li>期限：全ての期間 がほしい（絞り込みの on off UIが必要？）</li>
            </ul>
          </section>
        </>
      )}
    </div>
  );
};
