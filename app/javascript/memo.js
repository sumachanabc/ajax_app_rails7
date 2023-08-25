const buildHTML = (XHR) => {
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  const form = document.getElementById("form");
  //getElementByIdを用いてクリックの対象となる投稿ボタンの要素を取得
  //フォームにはformというidが付与されているため、getElementByIdを用いて取得
  form.addEventListener("submit", (e) => {
    //addEventListener()メソッドとは、イベント発火の際に実行する関数を定義するためのメソッド
    //要素.addEventListener('イベント名', 関数)
    //第一引数にはsubmitイベントを指定,eを第二引数の関数の引数に指定
    e.preventDefault();
    //preventDefault()の対象をeとすることにより、「投稿ボタンをクリックした」という現象を無効化
    //デフォルトの送信をキャンセル
    const formData = new FormData(form);
    //フォームの情報を取得し、Ajaxで送信できる形へと整形しています。
    const XHR = new XMLHttpRequest();
    //このフォームの情報を非同期通信でサーバーサイドに送信するため、
    //Ajaxに利用するオブジェクトを生成しています。
    XHR.open("POST", "/posts", true);
    //Ajaxに関する情報を初期化し、URIを設定しています。
    XHR.responseType = "json";
    //レスポンスとして求めるデータ形式を指定しています。
    XHR.send(formData);
    //Ajaxで送信しています。
    XHR.onload = () => {
      //XHR.onloadは、Ajaxによる処理が終了したあとに呼び出されるイベントハンドラー
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
        //return null;を記述して今回のイベントの処理からは抜け出す
      };
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      formText.value = "";
    };
  });
};

window.addEventListener('turbo:load', post);
//ページが読み込まれることをトリガーにして、処理が実行されるように関数を定義