// 変数の初期化　既に打った文字列typed　まだ打つべき文字列untyped
let untyped = '';
let typed = '';
let score = 0;

 
// 必要なHTML要素の取得　HTML要素をidで取得する
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const countscore=document.getElementById('countscore');

// 複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];
// ランダムなテキストを表示
const createText = () => {
  // 正タイプした文字列をクリア　HTML要素 typedfieldのテキスト内容を現在の typed変数の内容に置き換える
  typed = '';
  typedfield.textContent = typed;

  // 配列のインデックス数からランダムな数値を生成する
  let random = Math.floor(Math.random() * textLists.length);
  // 配列からランダムにテキストを取得し画面に表示する
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

// キー入力の判定
const keyDown = e => {
   // 誤タイプの場合
   if(e.key !== untyped.substring(0, 1)) {
    wrap.classList.add('mistyped');
    // 100ms後に背景色を元に戻す
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
   return;
 } // 正タイプの場合
   // スコアのインクリメント
   score++;
   countscore.textContent = score;
 　wrap.classList.remove('mistyped');
  typed += untyped.substring(0,1);
   untyped = untyped.substring(1);
   //htmly要素に反映させる
   typedfield.textContent = typed;
   untypedfield.textContent = untyped;
   // テキストがなくなったら新しいテキストを表示
   if(untyped === '') {
    createText();
  }
 };

// タイピングスキルのランクを判定
const rankCheck = score => {
 
 // テキストを格納する変数を作る
 let text = '';
  
 // スコアに応じて異なるメッセージを変数textに格納する
 if(score < 100) {
   text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;   
  }
    // 生成したメッセージと一緒に文字列を返す
   return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`; 
 
}

// ゲームを終了
const gameOver = (id) => {
  clearInterval(id);
  const result = confirm(rankCheck(score));

   // OKボタンをクリックされたらリロードする
   if(result == true) {
    window.location.reload();
  }
};

// カウントダウンタイマー
const timer = () => {
 
  // タイマー部分のHTML要素（p要素）を取得する
  let time = count.textContent;

  const id = setInterval(() => {

    // カウントダウンする　timeの値を1減らしhtmlに表示させる
    time--;
    count.textContent = time;

    // カウントが0になったらタイマーを停止する
    if(time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {

  // カウントダウンタイマーを開始する
  timer();

  // ランダムなテキストを表示する
  createText();

  // 「スタート」ボタンを非表示にする　HTML要素.style.CSSプロパティ = 変更後の値;

  start.style.display = 'none';

  // キーボードのイベント処理
  document.addEventListener('keydown', keyDown);
});

untypedfield.textContent = 'スタートボタンで開始';

