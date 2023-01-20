import styled from "styled-components"

const SSection = styled.section`
  background: #f6f6f6;
  padding: 16px;
  border-radius: 8px;
`
const SH2 = styled.h2`
  margin:0;
`

export const Rule = () => {
  return (
    <SSection>
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
  )
}