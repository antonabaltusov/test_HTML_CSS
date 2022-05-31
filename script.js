(function (e) {
  e.closest =
    e.closest ||
    function (css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
})(Element.prototype);
// анимирование при прокрутке
const animItems = document.querySelectorAll(".anim-items");

if (animItems.length > 0) {
  window.addEventListener("scroll", animOnSroll);
  function animOnSroll() {
    animItems.forEach((animItem) => {
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 100;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        let animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }
      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("active");
      }
    });
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  animOnSroll();
}
//слайдер в 1 блоке
let numberCurrentImg = 0;
const buttonsOnSlider = document.querySelectorAll(".slider__button");
const changeImg = (button) => {
  const nuvOnSlider = document.querySelectorAll(".nav__item");
  const imgs = document.querySelectorAll(".slider__img");
  imgs[numberCurrentImg].classList.remove("show");
  nuvOnSlider[numberCurrentImg].classList.remove("show");
  if (button.id == "left") {
    numberCurrentImg =
      numberCurrentImg - 1 >= 0 ? numberCurrentImg - 1 : imgs.length - 1;
  } else if (button.id == "right") {
    numberCurrentImg =
      numberCurrentImg + 1 < imgs.length ? numberCurrentImg + 1 : 0;
  }
  nuvOnSlider[numberCurrentImg].classList.add("show");
  imgs[numberCurrentImg].classList.add("show");
};

buttonsOnSlider.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const el = e.target.closest(".slider__button");
    if (el) {
      changeImg(el);
    }
  });
});

//слайдер в 3 блоке
const buttonsBlock3 = document.querySelectorAll(".nuv__button");
const moove = (direction) => {
  const listWidth = document.querySelector(".block_3__list").offsetWidth;
  const items = document.querySelectorAll(".block_3__item");
  const marginRight = parseInt(getComputedStyle(items[1]).marginRight);
  const fullWidthItem = items[1].offsetWidth + marginRight;
  const countUnViewItems =
    items.length - Math.floor((listWidth + marginRight) / fullWidthItem);
  const currentMarginLeft = parseInt(getComputedStyle(items[0]).marginLeft);
  if (
    direction == "right" &&
    currentMarginLeft / fullWidthItem < countUnViewItems
  ) {
    const newMargin = currentMarginLeft - fullWidthItem;
    items[0].style.marginLeft = newMargin + "px";
    setTimeout(() => {
      if (countUnViewItems * fullWidthItem <= -newMargin) {
        buttonsBlock3[1].disabled = true;
        buttonsBlock3[0].disabled = false;
      } else {
        buttonsBlock3[1].disabled = false;
      }
    }, 1500);
  }
  if (direction == "left" && currentMarginLeft < 0) {
    const newMargin = currentMarginLeft + fullWidthItem;
    items[0].style.marginLeft = newMargin + "px";
    setTimeout(() => {
      if (newMargin >= 0) {
        buttonsBlock3[1].disabled = false;
        buttonsBlock3[0].disabled = true;
      } else {
        buttonsBlock3[0].disabled = false;
      }
    }, 1500);
  }
};

buttonsBlock3.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const el = e.target.closest(".nuv__button");
    if (el) {
      el.disabled = true;
      moove(el.id);
    }
  });
});

//меню в мобайл

const burgerButton = document.querySelector(".info_type_burger");
const closeButton = document.querySelector(".menu__close");
const menu = document.querySelector(".menu__wrapper");
const openCloseMenu = () => {
  menu.classList.toggle("show");
};
closeButton.addEventListener("click", openCloseMenu);
burgerButton.addEventListener("click", openCloseMenu);
