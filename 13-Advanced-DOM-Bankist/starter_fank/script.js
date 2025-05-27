'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

document.getElementsByClassName('btn');

const message = document.createElement('div');
message.classList.add('cookie-message'); // 使用 program 的方式加入類型
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it</button>';

// 將 子元素(message) 添加到 母元素(header) 的的第一個位置
// header.prepend(message);
// 將 子元素(message) 移動(若同一個元素已經添加過)到 母元素(header) 的最後一個位置
header.append(message);
// header.append(message.cloneNode(true));
// 將元素添加到指定元素的前面, 作為他的 sibling
// header.before(message);
// 將元素添加到指定元素的後面, 作為他的 sibling
// header.after(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // Element.remove() 是 JavaScript 比較新支援的方法
    message.remove();
    // 在還沒有 Element.remove() 方法可用之前, 必須要先獲取想要刪除元素的父元素,
    // 然後再從父元素刪除他的子元素(也就是我們想要刪除的那個元素)
    message.parentElement.removeChild(message);
  });

// Styles
// 以下這兩種樣式的設定稱為內聯樣式設定(inline style), 此樣式是在程式內透過程式碼內生成的, 直接在 DOM 中做設定, 而不是先在樣式設定檔(.css)中先定義好, 所以稱作內聯樣式.
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// 那麼我們能否使用 Element.style.~ 來讀取指定元素的樣式屬性呢?
// 答案是, 必須要我們有使用過內聯樣式設定過的屬性, 才能直接使用 Element.style.theProperty 去讀取它的值
console.log(message.style.backgroundColor); // This will show: rgb(55, 56, 61)
console.log(message.style.width); // This will show: 120%
console.log(message.style.height); // This will show: nothing
console.log(message.style.color); // This will show: nothing

// 那我們要如何取得元素當前的樣式(style)或樣式屬性設定值呢? 必需要透過 getComputedStyle() method
console.log(getComputedStyle(message)); // This will get the style(CSSStyleDeclaration) of the Element
console.log(getComputedStyle(message).color); // This will show: rgb(187, 187, 187)
// 雖然我們沒有在樣式設定檔與內聯樣式中定義 height 屬性, 但是 message 被顯示在網頁上就一定會有一個程式內部計算過的樣式高度屬性值, 我們都能透過 getComputedStyle() method 來取得
console.log(getComputedStyle(message).height); // This will show: 49px

// 將 message banner 的高度增加 30px
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';
console.log(message.style.height);

// CSS自定義屬性, 又稱 CSS變量, 如下方 -- 開頭的那些屬性, 即為自定義屬性
// CSS變量與 JavaScript 中的變量很像, 我們可以透過更改 CSS變量, 來讓 CSS 文件中, 有引用到此 CSS變量的地方都同步做更改
// 我們也可以從 JavaScript 中改變 CSS變量
// CSS變量 需要被定義在 :root 中, :root 在 JavaScript 中等價於文檔, 基本上它在 CSS 中就是文檔元素
/*
:root {
  --color-primary: #5ec576;
  --color-secondary: #ffcb03;
  --color-tertiary: #ff585f;
  --color-primary-darker: #4bbb7d;
  --color-secondary-darker: #ffbb00;
  --color-tertiary-darker: #fd424b;
  --color-primary-opacity: #5ec5763a;
  --color-secondary-opacity: #ffcd0331;
  --color-tertiary-opacity: #ff58602d;
  --gradient-primary: linear-gradient(to top left, #39b385, #9be15d);
  --gradient-secondary: linear-gradient(to top left, #ffb003, #ffcb03);
}
*/

// 在 JavaScript 中存取 CSS自定義屬性(CSS變量)
// document.documentElement.style.setProperty('--color-primary', 'orangered');
// 另外, 前面的樣式屬性也都能透過 setProperty() method 來設定
message.style.setProperty('height', '69px');
console.log(message.style.height);

// Attributes
// alt, src 為 img element 的標準屬性, 所以可以直接存取
// 若自己在 element 中定義了非原生的標準屬性, 是無法存取的, 若要存取, 需要使用 getAttribute() method
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); // This will show: Bankist logo
// logo.src will get the absolute URL path
console.log(logo.src); // This will show: http://127.0.0.1:8080/13-Advanced-DOM-Bankist/starter_fank/img/logo.png
// 要取得 img元素 的 src 原始值, 需要使用 getAttribute() method
console.log(logo.getAttribute('src')); // This will show: img/logo.png
// 超連結元素<a> 的 href 屬性也是與 img元素 的 src 屬性相同性質
const link = document.querySelector('.nav__link--btn');
console.log(link.href); // This will show: http://127.0.0.1:8080/13-Advanced-DOM-Bankist/starter_fank/#
console.log(link.getAttribute('href')); // This will show: #
console.log(logo.className); // This will show: nav__logo

logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt); // This will show: Beautiful minimalist logo

// Non-standard attributes
// 存取非原生的標準屬性需要使用 getAttribute() method
console.log(logo.designer); // This will show: undefined
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'TSMC');
console.log(logo.getAttribute('company')); // This will show: TSMC

// Data attributes
// 當我們在使用/設計 UI 時, Data attributes 很常被使用, 特別是當我們需要在用戶界面中儲存數據時
// Data attributes 是一種特殊屬性, 在 html element 中, 只要是 data- 開頭的屬性名稱, 都是 data attribute
// Data attribute 始終存在於元素的 dataset 物件中
// 存取 data attribute 時, 使用的屬性名稱必需要使用 data- 後面的字串, 並且要將 - 連接的字母轉換成大寫, 也就是轉換成 camel case
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('test-class01', 'test-class02');
console.log(logo.className); // This will show: nav__logo test-class01 test-class02
logo.classList.remove('test-class01', 'test-class02');
console.log(logo.className); // This will show: nav__logo
// DOMTokenList介面的toggle()方法從清單中刪除一個給定的標記並傳回false。如果標記不存在，則新增且函數傳回true
logo.classList.toggle('test-class01');
console.log(logo.className); // This will show: nav__logo test-class01
console.log(logo.classList.contains('test-class01')); // This will show: true
// 盡量避免使用下面這個方式設定 class, 因為這個設定方式會將此元素的 class 全部替換成你給的設定值
// 使用 Element.classList.add / Element.classList.remove 來增刪元素類型, 避免影響到已存在的類型
logo.className = 'Fank_Hung';
console.log(logo.className);

/////////////////////////////////
// Implementing Smooth Scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // 1. 先取得我們想要滾動到的元素的座標
  // letf 等義於 x, top 等義於 y
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords); // This will show:
  /**
    bottom: 2382.2999877929688
    height: 1405.5
    left: 0
    right: 1114.4000244140625
    top: 976.7999877929688
    width: 1114.4000244140625
    x: 0
    y: 976.7999877929688
   */

  console.log(e.target.getBoundingClientRect());

  // 取得當前滾動條的 x 與 y 座標值
  // window.scrollY 表示當前滾動條頂端與頁面最上方的距離
  console.log('Current scroll (X/Y): ', window.scrollX, window.scrollY);

  // 取得當前可視視窗的高與寬
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //--- 傳統做法 ---
  // Scrolling
  // window.scrollTo(s1coords.left, s1coords.top + window.scrollY);

  // Scrolling (讓滾動動畫變得漂亮與平滑), 原理就是我們改成傳入一個物件
  // window.scrollTo({
  //   left: s1coords.left,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  //--- 現代做法(只適用於比較新的瀏覽器版本) ---
  // 不需要自己再去計算座標(x, y)
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////
// Types of Events and Event Handlers
// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');

//   // 在觸發 alert function 後移除此監聽器功能, 讓它不再觸發
//   h1.removeEventListener('mouseenter', alertH1);
// };

// addEventListener() 事件監聽器做法的主要好處有二：
// 1. 它允許我們對同一個事件添加多個事件監聽器
// 2. 當我們不需要的時候, 可以刪除一個事件處理程序
// h1.addEventListener('mouseenter', alertH1);

// 這種 event listener 作法是比較舊的做法, 現在的做法都使用 addEventListener()
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// };

/////////////////////////////////
// Event Propagation in Practice

// rgb(255, 255, 255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

// <a class="nav__link"> --> <ul class="nav__links"> --> <nav class="nav">
// 當點擊 Features 的時候, 其兩個父元素的背景顏色也會跟著改變, 這就是冒泡機制
// 當點擊 <ul class="nav__links"> 的時候, Features 的背景顏色不變,
// 但其父元素 <nav class="nav"> 會改變, 這也是冒泡機制.
// 當點擊 Features 的時候, 上面三個元素的 e.target 都會是 <a class="nav__link">,
// 因為 taget 總是代表事件發生的地方
// 事件傳播是可以阻止的, 透過使用 e.stopPropagation(), 但通常情況下, 停止事件傳播通常不是一個好主意
// 冒泡階段對於所謂的事件委託非常有用, 所以事件監聽器才默認處理事件目標與冒泡階段
// 在 addEventListener() 中使用第三個參數, 把它設為 true (預設為 false), 代表令這個事件監聽器不再監聽冒泡階段, 而是監聽捕獲階段
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   // 在一個事件處理程序中, this 關鍵字永遠指向該事件處理程序所指向的元素
//   this.style.backgroundColor = randomColor();
//   // target 就是事件發生的地方, currentTarget 就是該事件處理程序所指向的元素, 所以 currentTarget === this
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   // Stop propagation
//   e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//   },
//   true
// );

//////////////////////////////////////////////////
// Event Delegation: Implementing Page Navigation

// Page Navigation
// 先在不使用事件委託的情況下實現這個功能, 以便我們可以看到這個方法中的問題
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     // 因為 .nav__link 指向的元素為一個 anker, 並且他有設定 href 屬性,
//     // 所以點擊該元素的默認行為就會導航到對應的 section,
//     // 因此我們要實作自己的平滑導航, 就必須要先停掉預設行為
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 上面的方法已經成功對三個同為 .nav__link 類型的元素實現了平滑導航的功能,
// 但這個實作方法隱含了一個問題,
// 也就是一個相同的事件監聽器分別在三個元素各自附加了一次, 共附加了三次, 但其實這是不必要的.
// 現在 .nav__link 類型的元素只有三個, 那如果遇到大型專案,
// 某個類型的元素有 1000 個甚至 10000個, 那這種方法就會對這些元素附加上 1000 個, 10000個相同的事件監聽器, 實際上就是創建了 1000個, 10000個相同函式副本, 這樣對系統/程式效能的影響就會很大.

// 上面功能的更好的實作方法是使用"事件委託". 在事件委託中,
// 我們利用事件冒泡的機制, 通過將 eventListener 放在我們感興趣的所有元素的公共父元素上來實現

// Page Navigation (事件委託)
// 事件委託法的實現基本上有兩個步驟,
// 1. 將事件監聽器添加到我們感興趣的所有元素的公共父元素中
// 2. 在事件監聽器中確定引發事件的元素
// 事件委託還有一個更重要的用例,也就是在系統頁面運行時, 我們正在處理那些還沒有在頁面上的元素. 也就是頁面加載的時候
// 一個很好的例子是, 當我們要處理那些系統/應用程式運行時才加載的動態按鈕, 不可能為這些按鈕添加事件監聽器,
// 因為它們都還不存在. 但我們能然可以通過使用事件委託來處理在一開始不存在的元素上的事件
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching Strategy (單點擊事件是我們感興趣的元素(類型)才觸發)
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//////////////////
// DOM Traversing
const h1 = document.querySelector('h1');

// 向下選擇元素 (選擇子元素)
// 注意:
// 1. 若其他地方還有 highlight 類型的元素, 這邊不會去選到, 因為他們不是 h1 的子元素
// 2. 不管 h1 的 highlight 子元素有多深都會選到
console.log(h1.querySelectorAll('.highlight'));
// 一次取得 h1 的所有子元素
console.log(h1.childNodes);
// 選出 h1 的直屬子元素
console.log(h1.children);
// 選擇 h1 的第一個子元素並且改變它的顏色
// h1.firstElementChild.style.color = 'white';
// 選擇 h1 的最後一個子元素並且改變它的顏色
// h1.lastElementChild.style.color = 'orangered';

// 向上選擇元素 (選擇父元素)
console.log(h1.parentNode);
console.log(h1.parentElement);
// 選擇離 h1 元素最接近的指定的父元素
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// 選擇離 h1 元素最接近的 h1 父元素, 若沒有, 則就是自己
// h1.closest('h1').style.background = 'var(--gradient-secondary)';

// 向側邊選擇元素 (選擇兄弟姐妹元素)
// JavaScript 中, 只能訪問直接關係的兄弟姐妹, 基本上就是上一個與下一個
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// 取得 h1 的所有兄弟姐妹
console.log(h1.parentElement.children);
// Do something
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

///////////////////////////////
// Building a Tabbed Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// 使用事件委託法來替三個標籤按鈕元素附加事件監聽器
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  // Guard Clause
  // 因為 tabsContainer 沒有 operations__tab 類型的父元素, 所以會拿到 null,
  // 因此透過一個保護子句(guard clause) 來實現忽略不必要的元素的點擊事件, 或是沒有被點擊的元素時, 則提早結束這個函式功能.
  if (!clicked) return;
  // 使所有選項標籤下移(即 un-active)
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  // 使被點擊的選項標籤上移
  clicked.classList.add('operations__tab--active');
  // 在顯示被點擊的選項標籤的內容前, 先移除所有選項標籤被激活的內容
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  // Activate Content Area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Passing Arguments to Event Handlers

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el != link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
const nav = document.querySelector('nav');
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });
// 上面的寫法還可以再利用 .bind 方法來重構的更簡潔
// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
