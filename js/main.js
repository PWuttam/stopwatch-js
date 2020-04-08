'use strict'; // キーワードで厳密なエラーチェック

{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime; // 宣言
  let timeoutId;
  let elapsedTime = 0;

  function countUp() { // カウントアップ
    const d = new Date(Date.now() - startTime + elapsedTime); // elapsedTime(経過時間も含めてタイマーに表示)
    const m = String(d.getMinutes()).padStart(2, '0'); // padStart (2 桁、 2 桁、 3 桁で表示したい)
    const s = String(d.getSeconds()).padStart(2, '0'); // 値を2桁で 満たないなら文字列の前を0で埋める
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${m}:${s}.${ms}`; // まとめてタイマーに文字列で表示

    timeoutId = setTimeout(() => { // 10 ミリ秒後にこの countUp() 自身を呼び出す
      countUp();
    }, 10);
  }

  function setButtonStateInitial() { // ボタンの有効と無効のセッティング 下の二つも
    start.classList.remove('inactive');
    stop.classList.add('inactive'); // 無効
    reset.classList.add('inactive'); // 無効
  }

  function setButtonStateRunning() {
    start.classList.add('inactive'); // 無効
    stop.classList.remove('inactive');
    reset.classList.add('inactive'); // 無効
  }

  function setButtonStateStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive'); // 無効
    reset.classList.remove('inactive');
  }

  setButtonStateInitial(); // 上記を呼び出すタイミングとして ページ読み込み時にこののInitialを呼んであげたい

  start.addEventListener('click', () => { // クリックした時に次の処理をして
    if (start.classList.contains('inactive') === true) { // ボタンの操作を無効化
      return; 
    }
    setButtonStateRunning();
    startTime = Date.now(); // 基準となる日時からの経過ミリ秒を使って計算
    countUp(); // カウントアップ
  });

  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true) { // ボタンの操作を無効化
      return; 
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime; // Stopで止まった時点から再開可能に // += timerが走っていた時間を全て足し上げ
  });

  reset.addEventListener('click', () => { // タイマーをもとの表記に戻す
    if (reset.classList.contains('inactive') === true) { // ボタンの操作を無効化
      return;
    }
    setButtonStateInitial();
    timer.textContent = '00:00.000';
    elapsedTime = 0; // Resetを押したときにはelapsedTimeもリセット
  });
}