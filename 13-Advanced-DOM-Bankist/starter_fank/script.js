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
