// initialize page
function jsInit() {
  // collect DOM elements
  var navLabels = document.getElementsByClassName("header__nav__item"),
      navToggleBtn = document.getElementsByClassName("nav-toggle-btn")[0],
      sections = document.getElementsByClassName("main-section"),
      prevSectionIndex,
      filters = document.getElementsByClassName("filters__label"),
      projects = document.getElementsByClassName("portfolio__project");

  // helper callback
  function removeClass(classString) {
    return function(el) {
      el.classList.remove(classString);
    };
  }

  function updateNavLabels() {
    for(var i = 0; i < sections.length; i++) {
      // check which section is in viewport
      if((prevSectionIndex != i) && ( (sections[i].getBoundingClientRect().top < window.innerHeight/3 && sections[i].getBoundingClientRect().top >= 0) || (sections[i].getBoundingClientRect().bottom > 3*window.innerHeight/4 && sections[i].getBoundingClientRect().bottom < sections[i].getBoundingClientRect().height ) ) ) {
        // update labels consequently
        [].forEach.call(navLabels, removeClass("is-active"));
        navLabels[i].classList.add("is-active");

        prevSectionIndex = i;
      }
    }

  }

  function navToggle() {
    var navToggleWrap = this.parentNode;
    //expand nav
    navToggleWrap.classList.toggle("expand");
    // close nav when clicking on a link
    [].forEach.call(navLabels, function(el) {
      el.addEventListener("click", collapseNav);
    });

    function collapseNav() {
      navToggleWrap.classList.remove("expand");
      [].forEach.call(navLabels, function(el) {
        el.removeEventListener("click", collapseNav);
      });
    }
  }

  function filterProjects() {

    var category = this.getAttribute("data-cat");

    // update active state for category labels
    updateFilterLabel(this);

    // display or hide elements depending on selected category
    if(!category) {
      // display all projects if "all" is selected
      [].forEach.call(projects, displayEl);
    } else {
      [].forEach.call(projects, function(el) {
        if(el.getAttribute("data-cat") !== category) {
          hideEl(el);
        } else {
          displayEl(el);
        }
      });
    }

    // utility
    function updateFilterLabel (activeEl) {
      [].forEach.call(filters, removeClass("is-active"));
      activeEl.classList.add("is-active");
    }
    function displayEl(el) {
      el.style.display = "block";
    }
    function hideEl(el) {
      el.style.display = "none";
    }

  }


  // display all js-dependent elements
  var jsEl = document.getElementsByClassName("js-dis");
  [].forEach.call(jsEl, removeClass("js-dis"));

  // display current section state in nav
  updateNavLabels();

  /** event listeners: **/
  // change current section label in nav when scrolling
  window.addEventListener("scroll", updateNavLabels);
  // toggle navigation when collapsed on smaller screens
  navToggleBtn.addEventListener("click", navToggle);
  // filtering function
  [].forEach.call(filters, function(el) {
    el.addEventListener("click", filterProjects)
  });

}

jsInit();


