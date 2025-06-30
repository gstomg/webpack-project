import '../../node_modules/focus-visible/dist/focus-visible';
import '../index.html';
import "../styles/main.scss";
import "../components/brands/brands.scss";

let swiperInstance = null;

function initSwiper() {
  if (window.innerWidth < 768 && !swiperInstance) {
    swiperInstance = new Swiper('.brands-container__slider', {
      slidesPerView: 'auto',
      spaceBetween: 14,
      slidesOffsetBefore: 16,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      a11y: { clicked: true },
    });
  } else if (window.innerWidth >= 768 && swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;

    // Сбросить стили, которые Swiper мог добавить
    const wrapper = document.querySelector('.brands-container__wrapper');
    if (wrapper) {
      wrapper.style.transform = '';
      wrapper.style.transition = '';
    }
    document.querySelectorAll('.swiper-slide').forEach(slide => {
      slide.style.transform = '';
      slide.style.transition = '';
    });
  }
}

// Инициализация при загрузке
window.addEventListener('load', initSwiper);
// И при изменении размера окна
window.addEventListener('resize', initSwiper);


document.addEventListener('DOMContentLoaded', function() {
  const btn = document.querySelector('.brands-container__show-all-btn');
  const icon = document.querySelector('.brands-container__show-all-icon');
  const swiper = document.querySelector('.brands-container__slider');
  let expanded = false;

  function updateButton() {
    btn.textContent = expanded ? 'Скрыть' : 'Показать все';
    icon.src = expanded ? 'assets/icons/showall.svg' : 'assets/icons/icon.svg';
    icon.alt = expanded ? 'Скрыть' : 'Показать все';
  }

  btn.addEventListener('click', function() {
    expanded = !expanded;
    if (expanded) {
      swiper.classList.add('show-extra');
    } else {
      swiper.classList.remove('show-extra');
    }
    updateButton();
  });

  // cбросить состояние при изменении ширины окна
  window.addEventListener('resize', function() {
    expanded = false;
    swiper.classList.remove('show-extra');
    updateButton();
  });
});



//about кнопка читать далее

document.addEventListener('DOMContentLoaded', function() {
  const readMoreBtn = document.querySelector('.about__read-more-text');
  const secondParagraph = document.querySelector('.about__paragraph_type_second');
  const thirdParagraph = document.querySelector('.about__paragraph_type_third');
  const expandIcon = document.querySelector('.about__read-more img');

  function resetState() {
      if (secondParagraph) secondParagraph.classList.remove('active');
      if (thirdParagraph) thirdParagraph.classList.remove('active');
      if (readMoreBtn) {
          readMoreBtn.textContent = 'Читать далее';
          if (expandIcon) expandIcon.style.transform = 'rotate(0deg)';
      }
  }

  function updateVisibility() {
      const width = window.innerWidth;
      resetState();
      if (width >= 1120) {
          // на десктопе: всегда видно первый и второй параграф, третий скрыт, кнопка видна
          if (readMoreBtn) readMoreBtn.parentElement.style.display = '';
      } else {
          // на планшете и мобилке: кнопка видна
          if (readMoreBtn) readMoreBtn.parentElement.style.display = '';
      }
  }

  if (readMoreBtn) {
      readMoreBtn.style.cursor = 'pointer';
      readMoreBtn.addEventListener('click', function() {
          const width = window.innerWidth;
          const isExpanded = readMoreBtn.textContent === 'Свернуть';

          if (width < 768) {
              // мобильные: показать/скрыть второй и третий параграф
              if (secondParagraph) secondParagraph.classList.toggle('active');
              if (thirdParagraph) thirdParagraph.classList.toggle('active');
          } else {
              // планшет и десктоп: показать/скрыть только третий параграф
              if (thirdParagraph) thirdParagraph.classList.toggle('active');
              if (width >= 768 && width <= 1119) {
                  // на планшете также раскрываем второй параграф полностью
                  if (secondParagraph) secondParagraph.classList.toggle('active');
              }
          }

          // меняем текст и иконку
          const anyActive = (width < 768)
              ? (secondParagraph && secondParagraph.classList.contains('active')) || (thirdParagraph && thirdParagraph.classList.contains('active'))
              : thirdParagraph && thirdParagraph.classList.contains('active');

          readMoreBtn.textContent = anyActive ? 'Свернуть' : 'Читать далее';
          if (expandIcon) expandIcon.style.transform = anyActive ? 'rotate(180deg)' : 'rotate(0deg)';
      });
  }

  window.addEventListener('resize', updateVisibility);
  updateVisibility();
});