$(document).ready(() => {
  // eslint-disable-next-line no-undef
  $('.slider').slick({
    arrows: false,
    dots: true,
  });
});

$(() => {
  $('.btn_more').click(() => {
    $('.item-wrap:hidden').slice(0, 8).show();
    if ($('.item-wrap').length == $('.item-wrap:visible').length) {
      $('.btn_more').hide();
    }
  });
});

const orderBtn = document.querySelectorAll('.btn_order');

orderBtn.forEach((item) => {
  item.addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.classList.add('modal_active');
    document.body.style.overflow = 'hidden';

    const parent = item.parentElement;
    const parentTitle = parent.querySelector('.item__title');
    const modalTitle = document.querySelector('.modal__title');
    const inputFormTitle = document.querySelector('.form__title-input');
    modalTitle.innerText = parentTitle.textContent;
    inputFormTitle.value = parentTitle.textContent;

    const rating = parent.querySelector('.item__rating');
    const modalRating = document.querySelector('.modal__rating');
    modalRating.innerHTML = rating.innerHTML;

    const description = parent.querySelector('.item__description');
    const formDesc = document.querySelector('.form__description');
    formDesc.innerText = description.textContent;

    const price = parent.querySelector('.item__price');
    const formPrice = document.querySelector('.form__price');
    const inputFormPrice = document.querySelector('.form__price-input');
    formPrice.innerText = price.textContent;
    inputFormPrice.value = price.textContent;

    const id = parent.querySelector('.item__id');
    const inputFormId = document.querySelector('.form__title-id');
    inputFormId.value = id.textContent;

    const submit = document.querySelector('.btn_submit');
    submit.style.display = 'block';

    const success = document.querySelector('.form__success');
    success.style.display = 'none';

    const itemImgs = parent.querySelectorAll('.item__img img');
    const modalSlider = document.querySelector('.modal__slider');
    const modalSliderNav = document.querySelector('.modal__slider-nav');

    itemImgs.forEach((img) => {
      const div = document.createElement('div');
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt;
      div.append(newImg);
      const thumb = div.cloneNode(true);
      div.classList.add('modal__slide');
      thumb.classList.add('modal__thumb');
      modalSlider.append(div);
      modalSliderNav.append(thumb);
    });

    const slides = document.querySelectorAll('.modal__slide');
    const thumbs = document.querySelectorAll('.modal__thumb');

    slides[0].classList.add('active');

    for (let i = 0; i < thumbs.length; i += 1) {
      const slide = slides[i];
      const thumbItem = thumbs[i];

      thumbItem.addEventListener('click', () => {
        const parentItem = slide.parentElement;

        const previousActive = parentItem.querySelector('.active');

        if (previousActive) {
          previousActive.classList.remove('active');
        }

        slide.classList.add('active');
      });
    }
  });

  const close = document.querySelector('.btn_close');
  close.addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.classList.remove('modal_active');
    const slides = document.querySelectorAll('.modal__slider div');
    const thumbs = document.querySelectorAll('.modal__slider-nav div');
    document.body.style.overflow = 'auto';

    slides.forEach((slide) => {
      slide.remove();
    });

    thumbs.forEach((thumb) => {
      thumb.remove();
    });
  });
});

$('.modal__form').submit(function () {
  $.ajax({
    type: 'POST',
    url: 'handler.php',
    data: $(this).serialize(),
  }).success(function () {
    $(this).find('input').val('');
    $('.btn_submit').css('display', 'none');
    $('.form__success').css('display', 'block');
    $('.modal__form').trigger('reset');
  });
  return false;
});

const up = document.querySelector('.quantity__up');
const down = document.querySelector('.quantity__down');
const quantity = document.querySelector('.form__input[type="number"]');

up.addEventListener('click', (e) => {
  quantity.value = +quantity.value + 1;
  e.preventDefault();
});

down.addEventListener('click', (e) => {
  quantity.value = +quantity.value - 1;
  e.preventDefault();
});

const prev = document.querySelector('.modal__arrow_prev');
const next = document.querySelector('.modal__arrow_next');

prev.addEventListener('click', () => {
  const slider = document.querySelector('.modal__slider');
  const currentSlide = slider.querySelector('.active');

  if (currentSlide.previousElementSibling) {
    currentSlide.classList.remove('active');
    currentSlide.previousElementSibling.classList.add('active');
  }
});

next.addEventListener('click', () => {
  const slider = document.querySelector('.modal__slider');
  const currentSlide = slider.querySelector('.active');

  if (currentSlide.nextElementSibling) {
    currentSlide.classList.remove('active');
    currentSlide.nextElementSibling.classList.add('active');
  }
});
