/* =========================================
   ALJADIDA SCHOOL
   INTERACTION ENGINE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================
       1. SPLASH SCREEN
    ===================================== */

    const splash = document.getElementById("splash");
    const progressFill = document.getElementById("splash-progress-fill");
    const splashStatus = document.getElementById("splash-status");

    if (splash && !sessionStorage.getItem("aljadida_splash_seen")) {

        let progress = 0;

        const splashTimer = setInterval(() => {

            progress += Math.random() * 14 + 5;
            progress = Math.min(progress, 100);

            if (progressFill) {
                progressFill.style.width = progress + "%";
            }

            if (splashStatus) {
                if (progress < 40) {
                    splashStatus.textContent = "أهلاً بكم...";
                } else if (progress < 80) {
                    splashStatus.textContent = "نجهز لكم تجربة مميزة";
                } else {
                    splashStatus.textContent = "مرحباً بكم في صرح التميز";
                }
            }

            if (progress >= 100) {

                clearInterval(splashTimer);

                setTimeout(() => {

                    splash.classList.add("hidden");

                    sessionStorage.setItem(
                        "aljadida_splash_seen",
                        "true"
                    );

                    setTimeout(() => {
                        splash.remove();
                    }, 900);

                }, 350);

            }

        }, 110);

    } else if (splash) {

        splash.remove();

    }


    /* =====================================
       2. EMPTY LOGO / IMAGE HANDLING
    ===================================== */

    function configureImage(img, placeholder, options = {}) {

        if (!img) return;

        const rawSource = (img.getAttribute("src") || "").trim();

        const showPlaceholder = () => {

            img.style.display = "none";

            if (placeholder) {
                placeholder.style.display = options.placeholderDisplay || "flex";
            }

        };

        const showImage = () => {

            img.style.display = options.imageDisplay || "block";

            if (placeholder) {
                placeholder.style.display = "none";
            }

        };

        if (!rawSource) {

            showPlaceholder();
            return;

        }

        img.addEventListener("load", showImage, { once: true });

        img.addEventListener("error", showPlaceholder, { once: true });

        if (img.complete && img.naturalWidth > 0) {
            showImage();
        }

    }


    document.querySelectorAll(".1792596527395.jpg").forEach(img => {

        const wrapper = img.closest(".1792596527395.jpg");

        const placeholder = wrapper
            ? wrapper.querySelector(".1792596527395.jpg")
            : null;

        configureImage(img, placeholder);

    });


    document.querySelectorAll(".1792596527395.jpg").forEach(img => {

        configureImage(
            img,
            img.parentElement.querySelector(".1792596527395.jpg")
        );

    });


    document.querySelectorAll(".news-photo").forEach(img => {

        configureImage(
            img,
            img.parentElement.querySelector(".1792596527395.jpg")
        );

    });


    document.querySelectorAll(".principal-image").forEach(img => {

        configureImage(
            img,
            img.parentElement.querySelector(".principal-placeholder")
        );

    });


    document.querySelectorAll(".teacher-image").forEach(img => {

        configureImage(
            img,
            img.parentElement.querySelector(".avatar-placeholder")
        );

    });


    /* =====================================
       3. STAFF DRAWER
    ===================================== */

    const drawer = document.getElementById("staff-drawer");
    const overlay = document.getElementById("page-overlay");
    const closeDrawerButton = document.getElementById("close-drawer");

    let lastFocusedElement = null;


    function openDrawer() {

        if (!drawer || !overlay) return;

        lastFocusedElement = document.activeElement;

        drawer.classList.add("open");
        overlay.classList.add("active");

        document.body.classList.add("drawer-open");

        if (closeDrawerButton) {
            closeDrawerButton.focus();
        }

    }


    function closeDrawer() {

        if (!drawer || !overlay) return;

        drawer.classList.remove("open");
        overlay.classList.remove("active");

        document.body.classList.remove("drawer-open");

        if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
            lastFocusedElement.focus();
        }

    }


    document.querySelectorAll("[data-open-staff]").forEach(button => {
        button.addEventListener("click", openDrawer);
    });


    const mobileMenuButton = document.getElementById("mobile-menu-trigger");

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener("click", openDrawer);
    }


    const bottomStaff = document.getElementById("bottom-staff");

    if (bottomStaff) {
        bottomStaff.addEventListener("click", openDrawer);
    }


    const bottomMenu = document.getElementById("bottom-menu");

    if (bottomMenu) {
        bottomMenu.addEventListener("click", openDrawer);
    }


    if (closeDrawerButton) {
        closeDrawerButton.addEventListener("click", closeDrawer);
    }


    if (overlay) {
        overlay.addEventListener("click", closeDrawer);
    }


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeDrawer();
            closeSearch();
        }

    });


    /* =====================================
       4. STAFF TABS
    ===================================== */

    const drawerTabs = document.querySelectorAll(".drawer-tab");

    const teachersPanel = document.getElementById("teachers-panel");
    const managementPanel = document.getElementById("management-panel");

    const drawerTitle = document.getElementById("drawer-section-title");


    drawerTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            drawerTabs.forEach(item => item.classList.remove("active"));

            tab.classList.add("active");

            const selectedTab = tab.dataset.tab;

            if (teachersPanel) {
                teachersPanel.classList.toggle(
                    "active",
                    selectedTab === "teachers"
                );
            }

            if (managementPanel) {
                managementPanel.classList.toggle(
                    "active",
                    selectedTab === "management"
                );
            }

            if (drawerTitle) {

                drawerTitle.textContent =
                    selectedTab === "teachers"
                        ? "الكادر التعليمي"
                        : "الإدارة المدرسية";

            }

        });

    });


    /* =====================================
       5. SEARCH MODAL
    ===================================== */

    const searchModal = document.getElementById("search-modal");
    const searchTrigger = document.getElementById("search-trigger");
    const searchClose = document.getElementById("search-close");
    const searchInput = document.getElementById("site-search-input");
    const searchForm = document.getElementById("site-search-form");
    const searchResults = document.getElementById("search-results");


    const searchablePages = [

        {
            title: "الرئيسية",
            url: "index.html",
            keywords: "الرئيسية الرئيسية المدرسة البداية"
        },

        {
            title: "عن المدرسة",
            url: "about.html",
            keywords: "عن المدرسة الرؤية الرسالة التاريخ الإدارة المرافق"
        },

        {
            title: "الأكاديميات والمناهج",
            url: "academics.html",
            keywords: "الأكاديميات المناهج الصف الأول الصف الثاني الصف الثالث المكتبة الكتب"
        },

        {
            title: "القبول والتسجيل",
            url: "admissions.html",
            keywords: "القبول التسجيل التقديم المستندات الطلاب"
        },

        {
            title: "الأنشطة والإنجازات",
            url: "activities.html",
            keywords: "الأنشطة الرياضة الثقافة الإنجازات المسابقات"
        },

        {
            title: "الأخبار والفعاليات",
            url: "news.html",
            keywords: "الأخبار الفعاليات الإعلانات الامتحانات"
        },

        {
            title: "اتصل بنا",
            url: "contact.html",
            keywords: "اتصل بنا التواصل الهاتف البريد العنوان"
        },

        {
            title: "بوابة النظام الداخلي",
            url: "portal.html",
            keywords: "الدخول الحساب النظام الداخلي الطلاب النتائج"
        }

    ];


    function openSearch() {

        if (!searchModal) return;

        searchModal.classList.add("open");

        document.body.classList.add("search-open");

        setTimeout(() => {
            if (searchInput) searchInput.focus();
        }, 100);

    }


    function closeSearch() {

        if (!searchModal) return;

        searchModal.classList.remove("open");

        document.body.classList.remove("search-open");

    }


    if (searchTrigger) {
        searchTrigger.addEventListener("click", openSearch);
    }


    if (searchClose) {
        searchClose.addEventListener("click", closeSearch);
    }


    if (searchModal) {

        searchModal.addEventListener("click", event => {

            if (event.target === searchModal) {
                closeSearch();
            }

        });

    }


    function renderSearchResults(query) {

        if (!searchResults) return;

        const normalizedQuery = query.trim().toLowerCase();

        searchResults.replaceChildren();

        if (!normalizedQuery) return;


        const matches = searchablePages.filter(page => {

            const combined = (
                page.title + " " + page.keywords
            ).toLowerCase();

            return combined.includes(normalizedQuery);

        });


        if (matches.length === 0) {

            const empty = document.createElement("p");

            empty.className = "search-empty";
            empty.textContent = "لم نعثر على صفحة مطابقة لبحثك.";

            searchResults.appendChild(empty);

            return;

        }


        matches.forEach(page => {

            const link = document.createElement("a");

            link.className = "search-result";
            link.href = page.url;
            link.textContent = page.title;

            const icon = document.createElement("i");

            icon.className = "fa-solid fa-arrow-left";

            link.appendChild(icon);

            searchResults.appendChild(link);

        });

    }


    if (searchInput) {

        searchInput.addEventListener("input", () => {

            renderSearchResults(searchInput.value);

        });

    }


    if (searchForm) {

        searchForm.addEventListener("submit", event => {

            event.preventDefault();

            const query = searchInput ? searchInput.value.trim() : "";

            if (!query) {

                if (searchInput) searchInput.focus();

                return;

            }

            const normalizedQuery = query.toLowerCase();

            const result = searchablePages.find(page => {

                const combined = (
                    page.title + " " + page.keywords
                ).toLowerCase();

                return combined.includes(normalizedQuery);

            });

            if (result) {

                window.location.href = result.url;

            } else {

                renderSearchResults(query);

            }

        });

    }


    /* =====================================
       6. SCROLL REVEAL
    ===================================== */

    const revealElements = document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    revealObserver.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });


        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("revealed");
        });

    }


    /* =====================================
       7. STAT COUNTERS
    ===================================== */

    const counters = document.querySelectorAll("[data-count]");


    function showCounter(counter) {

        const target = Number(counter.dataset.count || 0);
        const suffix = counter.dataset.suffix || "";

        counter.textContent = target.toLocaleString("en-US") + suffix;

    }


    counters.forEach(showCounter);


    /* =====================================
       8. BACK TO TOP
    ===================================== */

    const backToTop = document.getElementById("back-to-top");


    function updateBackToTop() {

        if (!backToTop) return;

        backToTop.classList.toggle(
            "visible",
            window.scrollY > 450
        );

    }


    window.addEventListener("scroll", updateBackToTop, {
        passive: true
    });


    updateBackToTop();


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================
       9. MOBILE NAV ACTIVE STATE
    ===================================== */

    const currentPath = (
        window.location.pathname.split("/").pop() || "index.html"
    ).toLowerCase();


    document.querySelectorAll(".bottom-nav-item[href]").forEach(link => {

        const linkPath = (
            link.getAttribute("href").split("#")[0]
        ).toLowerCase();

        link.classList.toggle(
            "active",
            linkPath === currentPath
        );

    });


    document.querySelectorAll(".desktop-nav a").forEach(link => {

        const linkPath = (
            link.getAttribute("href").split("#")[0]
        ).toLowerCase();

        link.classList.toggle(
            "active",
            linkPath === currentPath
        );

    });


    /* =====================================
       10. FOOTER YEAR
    ===================================== */

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================
       11. DISABLED PLACEHOLDER LINKS
    ===================================== */

    document.querySelectorAll("[data-placeholder-link]").forEach(link => {

        link.addEventListener("click", event => {

            if (link.getAttribute("href") === "#") {

                event.preventDefault();

                alert("ستتم إضافة رابط الحساب الرسمي لاحقاً.");

            }

        });

    });


    /* =====================================
       12. FAQ ACCORDION
       Used by internal pages.
    ===================================== */

    document.querySelectorAll(".faq-question").forEach(button => {

        button.addEventListener("click", () => {

            const item = button.closest(".faq-item");

            if (!item) return;

            item.classList.toggle("open");

            button.setAttribute(
                "aria-expanded",
                item.classList.contains("open") ? "true" : "false"
            );

        });

    });


    /* =====================================
       13. PREVENT EMPTY FORM SUBMISSIONS
       The real backend is not implemented.
    ===================================== */

    document.querySelectorAll("[data-demo-form]").forEach(form => {

        form.addEventListener("submit", event => {

            event.preventDefault();

            alert(
                "هذه الواجهة جاهزة للتصميم فقط. " +
                "إرسال البيانات وحفظها يحتاج إلى نظام خلفي وقاعدة بيانات."
            );

        });

    });

});

document.addEventListener("DOMContentLoaded", () => {
const loader = document.getElementById("pageLoader");
const drawer = document.getElementById("sideDrawer");
const overlay = document.getElementById("siteOverlay");
const menuToggle = document.getElementById("menuToggle");
const bottomMenuToggle = document.getElementById("bottomMenuToggle");
const closeDrawer = document.getElementById("closeDrawer");

// تحديث سنة حقوق النشر تلقائيًا.
document.querySelectorAll("[data-current-year]").forEach((element) => {
element.textContent = new Date().getFullYear();
});

// شاشة تحميل قصيرة، مع احترام إعداد تقليل الحركة.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

window.addEventListener("load", () => {
window.setTimeout(() => {
if (!loader) return;
loader.classList.add("loader-hidden");
window.setTimeout(() => loader.remove(), reducedMotion ? 0 : 500);
}, reducedMotion ? 0 : 450);
});

// فتح القائمة الجانبية وإغلاقها.
function openDrawer() {
if (!drawer || !overlay) return;
drawer.classList.add("drawer-open");
overlay.classList.add("overlay-visible");
document.body.classList.add("drawer-active");

if (menuToggle) menuToggle.setAttribute("aria-expanded", "true");

const firstLink = drawer.querySelector("a");
if (firstLink) firstLink.focus();

}

function closeMenu() {
if (!drawer || !overlay) return;
drawer.classList.remove("drawer-open");
overlay.classList.remove("overlay-visible");
document.body.classList.remove("drawer-active");

if (menuToggle) {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.focus();
}

}

menuToggle?.addEventListener("click", openDrawer);
bottomMenuToggle?.addEventListener("click", openDrawer);
closeDrawer?.addEventListener("click", closeMenu);
overlay?.addEventListener("click", closeMenu);

document.addEventListener("keydown", (event) => {
if (event.key === "Escape") {
closeMenu();
}
});

drawer?.querySelectorAll("a").forEach((link) => {
link.addEventListener("click", () => {
drawer.classList.remove("drawer-open");
overlay?.classList.remove("overlay-visible");
document.body.classList.remove("drawer-active");
menuToggle?.setAttribute("aria-expanded", "false");
});
});

// تحديد رابط الصفحة الحالية داخل القائمة.
const currentPage = document.body.dataset.page;
document.querySelectorAll(".desktop-nav a, .drawer-links a").forEach((link) => {
const file = link.getAttribute("href");
if (file === "${currentPage}.html") {
link.classList.add("nav-current");
link.setAttribute("aria-current", "page");
}
});

// تصفية بطاقات الأخبار حسب التصنيف.
const filterButtons = document.querySelectorAll("[data-filter]");
const newsCards = document.querySelectorAll(".news-card[data-category]");

filterButtons.forEach((button) => {
button.addEventListener("click", () => {
const selectedFilter = button.dataset.filter;

  filterButtons.forEach((item) => {
    item.classList.toggle("active", item === button);
  });

  newsCards.forEach((card) => {
    const showCard =
      selectedFilter === "all" ||
      card.dataset.category === selectedFilter;

    card.hidden = !showCard;
  });
});

});

// نموذج التواصل تجريبي فقط ولا يرسل البيانات إلى أي جهة.
const contactForm = document.getElementById("contactForm");
const contactFeedback = document.getElementById("contactFeedback");

contactForm?.addEventListener("submit", (event) => {
event.preventDefault();

if (!contactForm.reportValidity()) return;

if (contactFeedback) {
  contactFeedback.hidden = false;
  contactFeedback.textContent =
    "هذه واجهة تجريبية فقط؛ لم تُرسل الرسالة ولم تُحفظ. يجب ربط النموذج بخدمة خلفية آمنة قبل استخدامه فعليًا.";
  contactFeedback.setAttribute("role", "status");
}

});
});
