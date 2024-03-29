window.addEventListener('DOMContentLoaded', () => {
  (function fixedProductRight() {
    gsap.registerPlugin(ScrollTrigger);
    // laptop Animation
    const laptopScreen = window.matchMedia('(min-width: 992px)');

    const section = document.querySelector('.product__wrapper');
    const element = document.querySelector('.product__right');

    if (laptopScreen.matches) {
      // Product
      const tlProduct = gsap.timeline();

      ScrollTrigger.create({
        trigger: '.product__right',
        start: '-160px 0',
        pin: '.product__right',
        end: `+=${section?.offsetHeight - element?.offsetHeight - 130}`,
      });
    }
  })();

  // * ===== Mask input
  $('input[type="tel"]').mask('+7 (999) 999-99-99');

  // * ===== Nice Select
  $('select').niceSelect();

  // * ==== Counter
  (function counter() {
    const counterEl = document.querySelectorAll('.counter');

    counterEl.forEach((item) => {
      if (item) {
        item.addEventListener('click', (e) => {
          if (e.target.classList.contains('counter__btn--increase')) {
            e.target.previousElementSibling.value++;
          }

          if (e.target.classList.contains('counter__btn--decrease')) {
            if (e.target.nextElementSibling.value > 1) {
              e.target.nextElementSibling.value--;
            }
          }
        });
      }
    });
  })();

  function resizeLogo() {
    const logo = document.querySelector('.hero__logo');
    const hero = document.querySelector('.hero');
    const headerLogo = document.querySelector('.header-logo-anim');

    if (logo) {
      logo.style.transform = `scale(${1 - window.scrollY / 1000}) translateY(${
        window.scrollY / 4
      }px)`;

      if (innerHeight <= window.scrollY + 200) {
        logo.classList.add('hidden');
        headerLogo.classList.add('active');
      } else {
        logo.classList.remove('hidden');
        headerLogo.classList.remove('active');
      }
    }
  }

  window.addEventListener('scroll', resizeLogo);

  (function loadForm() {
    let inputs = document.querySelectorAll('.input-file-upload');
    Array.prototype.forEach.call(inputs, function (input) {
      let label = input.previousElementSibling,
        labelVal = label.querySelector('.custom-file-upload span').innerText;

      input.addEventListener('change', function (e) {
        let countFiles = '';
        if (this.files && this.files.length >= 1)
          countFiles = this.files.length;

        if (countFiles)
          label.querySelector('.custom-file-upload span').innerText =
            'Выбрано файлов: ' + countFiles;
        else
          label.querySelector('.custom-file-upload span').innerText = labelVal;
      });
    });
  })();

  (function closeNote() {
    const closeBtn = document.querySelector('.site-note__close');
    const content = document.querySelector('.site-note');
    const cartSide = document.querySelector('.cart-side');
    const overlay = document.querySelector('.overlay');

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        content.style.display = 'none';

        document.querySelectorAll('.dropmenu').forEach((el) => {
          el.style.top = '80px';
        });

        cartSide.style.height = '100vh';
        cartSide.style.top = '0';

        overlay.style.top = '0';
        overlay.style.height = '100vh';
      });
    }
  })();

  // * SHOW DROPDOWN
  (function showDropdown() {
    const links = document.querySelectorAll('.menu__link');
    const dropdowns = document.querySelectorAll('.dropmenu');

    links.forEach((link) => {
      if (link) {
        link.addEventListener('mouseover', (e) => {
          dropdowns.forEach((dropdown) => {
            if (link.dataset.target === dropdown.dataset.target) {
              dropdown.classList.toggle('active');
            }
          });
        });
        link.addEventListener('mouseleave', (e) => {
          dropdowns.forEach((dropdown) => {
            dropdown.classList.remove('active');
          });
        });
      }
    });
  })();

  // * ===== Slider
  (function slider() {
    const sliderEl = document.querySelectorAll('.articles-slider__slider');
    sliderEl.forEach((el) => {
      new Swiper(el, {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.articles-slider__slider .swiper-button-next',
          prevEl: '.articles-slider__slider .swiper-button-prev',
        },
      });
    });
  })();

  // * ===== Slider
  (function slider() {
    const sliderEl = document.querySelectorAll('.values__slider');
    sliderEl.forEach((el) => {
      new Swiper(el, {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.values__slider .swiper-button-next',
          prevEl: '.values__slider .swiper-button-prev',
        },
      });
    });
  })();

  // * ===== Slider
  (function slider() {
    const sliderEl = document.querySelectorAll('.products-slider__slider');
    sliderEl.forEach((el) => {
      new Swiper(el, {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.products-slider__slider .swiper-button-next',
          prevEl: '.products-slider__slider .swiper-button-prev',
        },

        breakpoints: {
          319: {
            centeredSlides: true,
            initialSlide: 2,
          },
          576: {
            centeredSlides: false,
            initialSlide: 1,
          },
        },
      });
    });
  })();

  (function handlesSlider() {
    const parent = document.querySelector('.range-slider--cost');

    if (parent) {
      const handlesSlider = parent.querySelector('#slider-handles');
      const minStep = parent.querySelector('.range-slider__min');
      const maxStep = parent.querySelector('.range-slider__max');
      const inputs = [minStep, maxStep];

      noUiSlider.create(handlesSlider, {
        start: [9000, 200000],
        connect: true,
        range: {
          min: [9000],
          max: [200000],
        },
        format: wNumb({
          decimals: 0,
          thousand: ' ',
          suffix: ' ',
        }),
      });

      handlesSlider.noUiSlider.on('update', function (values, handle) {
        inputs[handle].value = values[handle];
      });

      minStep.addEventListener('change', function () {
        handlesSlider.noUiSlider.set([this.value, null]);
      });

      maxStep.addEventListener('change', function () {
        handlesSlider.noUiSlider.set([null, this.value]);
      });
    }
  })();

  // * ===== Accordion
  const toggleAccordion = (accordionControl, accordionContent, accordion) => {
    const filters = document.querySelectorAll(accordionControl);
    filters.forEach((el) => {
      if (el) {
        el.addEventListener('click', (e) => {
          const target = e.target.closest(accordion);
          const content = target.querySelector(accordionContent);
          target.classList.toggle('active');
          if (target.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + '1px';
          } else {
            content.style.maxHeight = null;
          }
        });
      }
    });
  };
  toggleAccordion('.accordion-control', '.accordion-content', '.accordion');
  toggleAccordion('.drop-box__control', '.drop-box__content', '.drop-box');

  // * ===== Fixed Header
  (function fixedHeader() {
    function scrollHeader() {
      const nav = document.querySelector('header');
      if (this.scrollY >= 70) {
        nav.classList.add('scroll-header');
      } else {
        nav.classList.remove('scroll-header');
      }
    }

    window.addEventListener('scroll', scrollHeader);

    // ! Change
    function changeBg() {
      const header = document.querySelector('header');
      if (window.pageYOffset >= 70) {
        header.classList.add('scroll-header');
      }
    }

    changeBg();
  })();

  // * ===== Show Cart Side
  (function showCartSide() {
    const menuBtn = document.querySelector('.cart-btn');
    const menu = document.querySelector('.cart-side');
    const menuCloseBtn = document.querySelector('.cart-side__close');
    const body = document.querySelector('body');
    const overlay = document.querySelector('.overlay');

    // menuBtn.forEach((btn) => {
    menuBtn.addEventListener('click', (e) => {
      menu.classList.toggle('active');
      overlay.classList.toggle('active');
      body.classList.toggle('no-scroll');
      // });
    });

    overlay.addEventListener('click', (e) => {
      menu.classList.remove('active');
      overlay.classList.remove('active');
      body.classList.remove('no-scroll');
    });

    menuCloseBtn.addEventListener('click', (e) => {
      menu.classList.remove('active');
      overlay.classList.remove('active');
      body.classList.remove('no-scroll');
    });
  })();

  // * ===== Show Menu
  (function showMenu() {
    const menuBtn = document.querySelector('.header__toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuCloseBtn = document.querySelector('.mobile-menu__close');
    const body = document.querySelector('body');
    const overlay = document.querySelector('.overlay');

    if (menu) {
      menuBtn.addEventListener('click', (e) => {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
      });

      overlay.addEventListener('click', (e) => {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
      });

      menuCloseBtn.addEventListener('click', (e) => {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
      });
    }
  })();

  // * ===== Show Filters
  (function showFilters() {
    const menuBtn = document.querySelector('.catalog-filter__btn');
    const menu = document.querySelector('.filters');
    const menuCloseBtn = document.querySelector('.filters__close');
    const body = document.querySelector('body');

    if (menu) {
      menuBtn.addEventListener('click', (e) => {
        menu.classList.toggle('active');
        body.classList.toggle('no-scroll');
      });

      menuCloseBtn.addEventListener('click', (e) => {
        menu.classList.remove('active');
        body.classList.remove('no-scroll');
      });
    }
  })();

  // // * ===== Show Search
  // (function showSearch() {
  //   const menuBtn = document.querySelectorAll('.show-search');
  //   const menu = document.querySelector('.header-search-mobile');
  //   const menuCloseBtn = document.querySelector('.header-search-mobile__close');

  //   menuBtn.forEach((btn) => {
  //     if (btn) {
  //       btn.addEventListener('click', (e) => {
  //         menu.classList.toggle('active');
  //       });

  //       menuCloseBtn.addEventListener('click', (e) => {
  //         menu.classList.remove('active');
  //       });
  //     }
  //   });
  // })();

  // * ===== Modal
  (function modals() {
    function bindModal(openBtn, modal, close) {
      const openBtnEl = document.querySelectorAll(openBtn);
      const modalEl = document.querySelector(modal);
      const closeEl = document.querySelectorAll(close);
      const body = document.querySelector('body');
      if (modalEl) {
        openBtnEl.forEach((el) => {
          el.addEventListener('click', (e) => {
            if (e.target) {
              e.preventDefault();
            }
            modalEl.classList.add('active');
            body.classList.add('no-scroll');
          });
        });
        closeEl.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            modalEl.classList.remove('active');
            body.classList.remove('no-scroll');
          });
        });
        modalEl.addEventListener('click', (e) => {
          if (e.target === modalEl) {
            modalEl.classList.remove('active');
            body.classList.remove('no-scroll');
          }
        });
      }
    }
    bindModal('.btn-sizes', '.popup--sizes', '.popup__close');
    bindModal('.btn-reset-pas', '.popup--reset-pas', '.popup__close');
    bindModal('.btn-log-out', '.popup--log-out', '.popup__close');
  })();

  // * ===== Toggle Tabs
  function someTabs(headerSelector, tabSelector, contentSelector, activeClass) {
    const header = document.querySelectorAll(headerSelector);
    const tab = document.querySelectorAll(tabSelector);
    const content = document.querySelectorAll(contentSelector);

    header.forEach((el) => {
      if (el) {
        hideTabContent();
        showTabContent();
        function hideTabContent() {
          content.forEach((item) => {
            item.classList.remove('active');
          });
          tab.forEach((item) => {
            item.classList.remove(activeClass);
          });
        }
        function showTabContent(i = 0) {
          content[i].classList.add('active');
          tab[i].classList.add(activeClass);
        }
        header.forEach((item) => {
          if (item) {
            item.addEventListener('click', (e) => {
              const target = e.target;
              if (target.classList.contains(tabSelector.replace(/\./, ''))) {
                tab.forEach((item, i) => {
                  if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                  }
                });
              }
            });
          }
        });
      }
    });
  }
  someTabs('.news-tab', '.news-tab__top-btn', '.news-tab__content', 'active');
  someTabs(
    '.product-tabs',
    '.product-tabs__top-btn',
    '.product-tabs__content',
    'active'
  );
  someTabs('.types-tabs', '.types-tabs__btn', '.types-tabs__content', 'active');

  // * ===== Toggle Tabs
  function hoverTabs(
    headerSelector,
    tabSelector,
    contentSelector,
    activeClass
  ) {
    const header = document.querySelectorAll(headerSelector);
    const tab = document.querySelectorAll(tabSelector);
    const content = document.querySelectorAll(contentSelector);

    header.forEach((el) => {
      if (el) {
        hideTabContent();
        showTabContent();
        function hideTabContent() {
          content.forEach((item) => {
            item.classList.remove('active');
          });
          tab.forEach((item) => {
            item.classList.remove(activeClass);
          });
        }
        function showTabContent(i = 0) {
          content[i].classList.add('active');
          tab[i].classList.add(activeClass);
        }
        header.forEach((item) => {
          if (item) {
            item.addEventListener('mouseover', (e) => {
              const target = e.target;
              if (target.classList.contains(tabSelector.replace(/\./, ''))) {
                tab.forEach((item, i) => {
                  if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                  }
                });
              }
            });
          }
        });
      }
    });
  }
  hoverTabs(
    '.categories-tabs',
    '.categories-tabs-btn',
    '.categories-tabs-content',
    'active'
  );
  hoverTabs('.tabs-shop', '.tabs-shop-btn', '.tabs-shop-content', 'active');
  hoverTabs(
    '.tabs-customer',
    '.tabs-customer-btn',
    '.tabs-customer-content',
    'active'
  );

  // * ===== Slider
  (function slider() {
    const sliderEl = document.querySelectorAll('.product__slider');
    sliderEl.forEach((el) => {
      new Swiper(el, {
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        },
        slidesPerView: 1,
      });
    });
  })();
});
