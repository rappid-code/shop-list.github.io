'use strict';
{
  const storage = localStorage;
  const table = document.querySelector('table'); //表
  const todo = document.getElementById('todo');  // todo
  const priority = document.querySelector('select'); //優先度 selectタグを取得
  const deadline = document.querySelector('input[type="date"]'); //締切
  const submit = document.getElementById('submit'); //登録ボタン

  const addItem = (item) => {
    const tr = document.createElement('tr');
     for (const prop in item) {
      const td = document.createElement('td');
      if (prop == 'done') {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item[prop];
        td.appendChild(checkbox);
        checkbox.addEventListener('change', checkBoxListener); //追加
      } else {
        td.textContent = item[prop];
      }
      
      tr.appendChild(td);
     }
     table.appendChild(tr);
  };

  const checkBoxListener = (ev) => {
    //1-1 テーブルの全tr要素のリストを取得(&配列に変換)
    const trList = Array.from(document.getElementsByTagName('tr'));
    //1-2.チェックボックスの親(td)の親の親(tr)を取得
    const currentTr = ev.currentTarget.parentElement.parentElement;
    //1-3 配列.indexOfメソッドで何番目(インデックス)かを取得;
    const idx = trList.indexOf(currentTr) - 1;
    //2 配列listにそのインデックスでアクセスしてdoneを更新
    list[idx].done = ev.currentTarget.checked;
    //3 ストレージデータを更新
    storage.todoList = JSON.stringify(list);
  }
  
  let list = []; //TODOリストのデータ
  document.addEventListener('DOMContentLoaded', () => {
     const json = storage.todoList;
     if (json == undefined) {
      return;   //ストレージデーターがない場合は何もしない
     }

     list = JSON.parse(json);
     
     for (const item of list) {
      // console.log(item);
      addItem(item);
     }
  });
  //登録ボタンを押したら
  submit.addEventListener('click', () => {
     //tr 要素や td 要素を createElement していく前に、入力フォームの値を一旦オブジェクトにまとめておく。
     
     const item = {}
    //  item.todo = todo.value;
    //  item.priority = priority.value;
    //  item.deadline = deadline.value;
    //  item.done = false; //完了はひとまずBoolean値で設定
    // //  console.log(item); //確認用
    // //  //フォームをリセット
     
     if (todo.value != '') {
      item.todo = todo.value;
     } else {
      item.todo = "テキストが入力されていません";
     }

     item.priority = priority.value;
     

     if (deadline.value != '' ) {
      item.deadline = deadline.value;
     } else {
      const date = new Date();
      item.deadline = date.toLocaleDateString().replace(/\//g, '-'); //replace 置き換え
     }

     item.done = false;
     
     todo.value = '';
     priority.value = '中';
     deadline.value = '';
     
     addItem(item);
     

     list.push(item);
     storage.todoList = JSON.stringify(list);
  });

  //優先度の絞り込むボタンをjsで作成
 const filterButton = document.createElement('button');
 filterButton.textContent = "優先度(高)で絞り込み";
 filterButton.id = 'priority';
 const main = document.querySelector('main');
 main.appendChild(filterButton);

 

const clearTable = () => {
  const trList = Array.from(document.getElementsByTagName('tr'));
  trList.shift();
  for (const tr of trList) {
    tr.remove();
  }
};

  filterButton.addEventListener('click', () => {
  const trList = Array.from(document.getElementsByTagName('tr'));
  trList.shift();
  for (const tr of trList) {
    clearTable();
  }

     for (const item of list) {
      if (item.priority == '高') {
        addItem(item);
      }
     }
  });

  // 解除ボタンを作ってみる オリジナル仕様
  const releaseButton = document.createElement('button');
  releaseButton.textContent = "絞り込み解除"
  releaseButton.id = 'release';
  main.appendChild(releaseButton); 

  releaseButton.addEventListener('click', () => {
     location.reload();
  });

  // 削除ボタンを作成
  const remove = document.createElement('button');
  remove.textContent = "完了したお買い物を削除する";
  remove.id = 'remove';
  const br = document.createElement('br');
  main.appendChild(br);
  main.appendChild(remove);

  remove.addEventListener('click', () => {
    clearTable(); //TODOデータを一旦削除
    // 1.未完了のTODOを抽出して定数listを置き換え
    list = list.filter((item) => item.done == false);
    // 2.TODOデータをテーブルに追加
    for (const item of list) {
      addItem(item);
    }
    //3.ストレージデータを更新
    storage.todoList = JSON.stringify(list);
  });






}

