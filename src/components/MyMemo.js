import { useState } from "react"
import styled from "styled-components"

const SSection = styled.section`
  margin-top: 10px;
  background: #f6f6f6;
  padding: 16px;
  border-radius: 8px;
`
const SH2 = styled.h2`
  margin:0;
`

export const MyMemo = () => {
  const [isShow, setIsShow] = useState(false);
  const toggleShow = () =>{ setIsShow(!isShow)}
  return (
    <>
      <hr />
      <button onClick={toggleShow} className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">開発用のメモを見る</button>
      {isShow && (
        <>
          <SSection>
            <SH2>icon, tailwind</SH2>
            <ul>
              <li><a href="https://heroicons.com/">https://heroicons.com/</a></li>
              <li><a href="https://tailwindui.com/?ref=top">https://tailwindui.com/?ref=top</a></li>
              <li><a href="https://zenn.dev/knaka0209/books/9e86ccb888758c/viewer/663286">https://zenn.dev/knaka0209/books/9e86ccb888758c/viewer/663286</a></li>
            </ul>
            <SH2>説明/学習法</SH2>
            <p>TODOリストをつくってみる。ReactHooksを使う。</p>
            <dl>
              <dt>▼TODOリスト内の各TODOにほしい要素</dt>
              <dd>・<strike>ID(連番もしくはuuidを設定)</strike>年月日日時で作成</dd>
              <dd>・<strike>タイトル</strike></dd>
              <dd>・<strike>ステータス(未着手、進行中、完了 など)</strike></dd>
              <dd>・<strike>詳細</strike></dd>
              <dt>▼ほしい機能</dt>
              <dd>・<strike>TODOの追加</strike></dd>
              <dd>・<strike>TODOの削除</strike></dd>
              <dt>▼余裕があれば以下のようなカスタマイズをする</dt>
              <dd>・<strike>TODOの編集機能</strike></dd>
              <dd>・フィルター(ID、期限、ステータスで絞り込み) or ソート(ID、期限、ステータスで並べ替え)</dd>
              <dd>・要素追加（内容、作成日、更新日など）</dd>
              <dd>・<strike>ステータス変更でスタイル変更</strike></dd>
              <dd>・<strike>TODOリストを1箇所(どのパーツでもOK)コンポーネント化してみる"</strike></dd>
            </dl>
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
      </>
  )
}