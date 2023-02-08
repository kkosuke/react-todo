import { useState } from "react";
// @ts-ignore
import styled from "styled-components";

const SSection = styled.section`
  margin-top: 10px;
  background: #f6f6f6;
  padding: 16px;
  border-radius: 8px;
`;
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
          <SSection>
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
            <p>・ReactHooksを使う</p>
            <p className="line-through">
              ・TypeScriptで書く（全てではないけど…）
            </p>
            <p className="line-through">
              → anyを使用しても良いので型エラーを解消する
            </p>
            <p>▼TODOリスト内の各TODOにほしい要素</p>
            <p className="line-through">　・ID(連番もしくはuuidを設定)</p>
            <p className="line-through">　・タイトル</p>
            <p className="line-through">
              　・ステータス(未着手、進行中、完了 など)
            </p>
            <p className="line-through">　・詳細</p>
            <p>▼ほしい機能</p>
            <p className="line-through">　・TODOの追加</p>
            <p className="line-through">　・TODOの削除</p>
            <p className="line-through">　・TODOの編集機能</p>
            <p>　・絞り込み機能(IDで絞り込み)</p>
            <p>　・絞り込み機能(期限で絞り込み)</p>
            <p className="line-through">
              　・絞り込み機能(ステータスで絞り込み)
            </p>
            <p>▼余裕があれば以下のようなカスタマイズをする</p>
            <p>　・anyを使わずに型付けを行なう</p>
            <p>
              　・期限の追加などの要素追加（期限、内容、作成日、更新日など）
            </p>
            <p>　・ソート(ID、期限)</p>
            <p className="line-through">　・ステータス変更でスタイル変更</p>
            <p>　・コンポーネント化してみる</p>
            <p className="line-through">
              　・MaterialUIやChakraUI、もしくはTailwind CSSを使ってみる
            </p>
            <p>　・Recoilを使って状態管理</p>
            <p>　・Firebaseまたは、Supabaseを導入してデータの永続化</p>
          </SSection>
          <SSection>
            <h2>やれたらいいな</h2>
            <ul>
              <li>todoの項目を用意に増やせるようになる</li>
              <li>todoの編集のキャンセル</li>
              <li>todoリストのその場で修正</li>
              <li>並び替え</li>
              <li>絞り込み検索（完全一致、含む、あいまい）</li>
              <li>csvエクスポート ダウンロード、インポート</li>
            </ul>
          </SSection>
        </>
      )}
    </div>
  );
};
