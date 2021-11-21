import styles from 'styles/privacy.module.scss';

export default function Privacy() {
  return (
    <div className={styles.link}>
      <p className="text-2xl">プライバシーポリシー</p>
      <div className="my-2">
        <p className="text-2xl">アクセス解析ツールについて</p>
        <p>当ブログでは、Google社の「Google Analytics」を用いてアクセス解析をしています。データ収集のためにCookieを使用しますが、このデータは匿名で収集されており、個人を特定するものではありません。収集された情報は、Google社によって同社のプライバシーポリシーに基づいて管理されます。詳しくは、<a href="https://policies.google.com/technologies/partner-sites?hl=ja">こちら</a>をご確認ください。。</p>
        <p>Google社が提供する<a href="https://tools.google.com/dlpage/gaoptout?hl=ja">Google アナリティクス オプトアウト アドオン</a>をダウンロードおよびインストールすることで、本ブログや他のサイトでのGoogle Analyticsによる情報の収集を停止することができます。詳しくは、<a href="https://support.google.com/analytics/answer/181881?hl=ja">こちら</a>をご確認ください。</p>
      </div>
    </div>
  );
}