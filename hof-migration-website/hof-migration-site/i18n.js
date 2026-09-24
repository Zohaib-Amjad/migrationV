/**
 * Arabic localisation.
 *
 * The nav's language control swaps the whole page between English and Arabic:
 * <html> gets lang="ar" dir="rtl", every translated string is replaced in
 * place, and rtl.css handles the typeface and the mirroring.
 *
 * Strings are keyed by their English source rather than by data-i18n
 * attributes on ~100 elements: the translator walks text nodes and looks each
 * one up, keeping the original on the node so switching back is exact. Nodes
 * that aren't in the dictionary (brand names, emails, phone numbers) are left
 * alone by design.
 *
 * Several Arabic strings are deliberately tighter than a literal translation —
 * Arabic set in Noto Sans runs wider than the English here, and the card,
 * review and FAQ copy would otherwise push its containers out of shape.
 */
(function () {
  var AR = {
    /* nav */
    'HOF Migration': 'HOF Migration',
    Services: 'الخدمات',
    'Success Stories': 'قصص النجاح',
    Reviews: 'التقييمات',
    'About Us': 'من نحن',
    'Book a free consultation': 'احجز استشارة مجانية',

    /* hero */
    /* the closed-shade message; the two lines are separate <tspan>s, so each
       one is its own entry and the break is set per language */
    'Keep your window open': 'أبقِ نافذتك مفتوحة',
    'to new opportunities': 'على الفرص الجديدة',
    /* the pull tab's label */
    Open: 'فتح',
    Close: 'إغلاق',
    'ICCRC & MARA Certified': 'معتمدون من ICCRC و MARA',
    'The Gulf’s #1': 'الأولى في الخليج',
    'Trusted Immigration Consultancy': 'لاستشارات الهجرة الموثوقة',
    'Your Right Migration Starts With The Right Guidance': 'هجرتك الصحيحة تبدأ بالإرشاد الصحيح',
    'Let’s Talk': 'لنتحدث',

    /* experience */
    '6 Years of Experience in Immigration Consultancy': '6 سنوات من الخبرة في استشارات الهجرة',
    'Navigate your immigration journey with experienced consultants who provide expert, end-to-end guidance for multiple destinations.':
      'اسلك طريق هجرتك مع مستشارين ذوي خبرة يقدمون إرشادًا متكاملًا إلى وجهات متعددة.',

    /* services */
    'Immigration & Education Consultancy Services': 'خدمات استشارات الهجرة والتعليم',
    'Explore all Services': 'استكشف الخدمات',
    'Skilled Migration Canada & Australia': 'الهجرة المهارية إلى كندا وأستراليا',
    Canada: 'كندا',
    '| Express Entry & Provincial Nominee Programs (PNP)': '| الدخول السريع وبرامج الترشيح الإقليمي (PNP)',
    Australia: 'أستراليا',
    '| Skilled Independent (189), Skilled Nominated (190) & Skilled Work Regional (491)':
      '| المستقلة (189) والمرشحة (190) والعمل الإقليمي (491)',
    'See how we can help': 'اعرف كيف نساعدك',
    'Study Abroad &': 'الدراسة في الخارج',
    'Student Visas': 'وتأشيرات الطلاب',
    'Explore study opportunities worldwide, including Australia’s Subclass 500, the UK Student Visa, Canada’s Study Permit, Germany’s Student Visa, and the USA’s F-1 Visa.':
      'اكتشف فرص الدراسة حول العالم: تأشيرة أستراليا 500، وتأشيرة الطالب البريطانية، وتصريح الدراسة الكندي، وتأشيرة ألمانيا، وتأشيرة F-1 الأمريكية.',
    'Family Sponsorship & Reunification': 'كفالة الأسرة ولمّ الشمل',
    'Bring your loved ones together with expert guidance for family sponsorship and reunification.':
      'اجمع شملك بأحبائك مع إرشاد متخصص في كفالة الأسرة ولمّ الشمل.',
    'USA EB-2 NIW & Investor Visas': 'تأشيرات EB-2 NIW والمستثمرين في أمريكا',
    'EB-2 US National Interest Waiver Petitions, E-2 Investor and L-1 Transfer Visas':
      'طلبات الإعفاء للمصلحة الوطنية EB-2، وتأشيرات المستثمر E-2 ونقل الموظفين L-1.',
    'Europe Golden Visa & Visitor Visas': 'التأشيرة الذهبية وتأشيرات الزيارة في أوروبا',

    /* reviews */
    'What Our Clients Say': 'آراء عملائنا',
    'View All': 'عرض الكل',
    'Yusuf R.': 'يوسف ر.',
    '12 August 2026': '12 أغسطس 2026',
    'HOF Migration made my move to Canada seamless. Their team explained every step clearly and kept me updated throughout the entire process. I couldn’t have asked for better guidance through such a big life decision.':
      'جعل فريق HOF انتقالي إلى كندا سلسًا تمامًا. شرحوا لي كل خطوة بوضوح وأبقوني على اطلاع طوال الإجراءات. لم أكن لأتمنى إرشادًا أفضل في قرار بهذا الحجم.',
    'Read more': 'اقرأ المزيد',
    'Sara K.': 'سارة ك.',
    '2 September 2026': '2 سبتمبر 2026',
    'From our first consultation to the final visa approval, the HOF team was incredibly professional. They helped my whole family relocate to Australia without any stress at all — truly grateful for their support.':
      'من الاستشارة الأولى حتى الموافقة النهائية، كان فريق HOF على درجة عالية من الاحتراف. ساعدوا عائلتي كلها على الانتقال إلى أستراليا دون أي عناء.',
    'Michael D.': 'مايكل د.',
    '20 July 2026': '20 يوليو 2026',
    'Excellent service from start to finish. My US investor visa application was handled with real expertise — highly recommend HOF Migration to anyone considering the move.':
      'خدمة ممتازة من البداية إلى النهاية. جرى التعامل مع طلب تأشيرة المستثمر الأمريكية بخبرة حقيقية، وأنصح بهم بشدة.',
    'Fatima A.': 'فاطمة أ.',
    '5 June 2026': '5 يونيو 2026',
    'Professional, responsive, and genuinely caring about our situation. HOF Migration guided us through the UK study visa process with total clarity from day one.':
      'احترافية وسرعة استجابة واهتمام صادق بحالتنا. أرشدونا في إجراءات تأشيرة الدراسة البريطانية بوضوح تام منذ اليوم الأول.',

    /* success story */
    'Watch Ahmed’s story': 'شاهد قصة أحمد',
    'Success Story': 'قصة نجاح',
    'Ahmed’s Journey to the United States': 'رحلة أحمد إلى الولايات المتحدة',
    'Manufacturing Professional · Dubai, UAE → United States':
      'متخصص تصنيع · دبي، الإمارات ← الولايات المتحدة',
    'Ahmed had been living and working in Dubai for the past 15 years in the manufacturing industry. He had been considering moving to the United States and wanted professional guidance on the right migration pathway. HOF Migration helped him understand his options and guided him through the process.':
      'عاش أحمد وعمل في دبي 15 عامًا في قطاع التصنيع، وكان يفكر في الانتقال إلى الولايات المتحدة ويبحث عن إرشاد متخصص للمسار الأنسب. ساعدناه على فهم خياراته ورافقناه في كل خطوة.',
    'Read Full Story': 'اقرأ القصة كاملة',

    /* share your feedback */
    'Share Your Feedback': 'شاركنا رأيك',
    'Immigration is a process that takes time and effort. We make it smoother by taking the process off your hands, and we are straight with you about the parts no one controls — laws change, government policies shift, and political situations can affect an outcome after everything has been done right. What we can promise is that you come first, and that your time, your money and your effort are treated as if they were our own.':
      'الهجرة رحلة تتطلب وقتًا وجهدًا، ونحن نجعلها أسهل بتولي الإجراءات عنك. ونصارحك بما لا يملك أحد التحكم فيه: فالقوانين تتغير، والسياسات الحكومية تتبدل، وقد تؤثر الأوضاع السياسية في النتيجة بعد إتمام كل شيء على الوجه الصحيح. ما نعد به أنك أولاً، وأن وقتك ومالك وجهدك تُعامَل كأنها ملكنا.',

    /* faq */
    'Frequently Asked': 'الأسئلة',
    Questions: 'الشائعة',
    'Still have a question?': 'لا تزال لديك أسئلة؟',
    'Our team is ready to assist you with anything you need.': 'فريقنا جاهز لمساعدتك في كل ما تحتاجه.',
    'What immigration programs does HOF Migration specialize in?': 'ما البرامج التي تتخصصون فيها؟',
    'We specialize in skilled migration, study visas, family sponsorship, investor and golden visa programs, and USA EB-2 NIW petitions — covering pathways to Canada, Australia, the UK, the USA, and Europe.':
      'نتخصص في الهجرة المهارية وتأشيرات الدراسة وكفالة الأسرة وبرامج المستثمرين والتأشيرة الذهبية وطلبات EB-2 NIW، لمسارات إلى كندا وأستراليا وبريطانيا وأمريكا وأوروبا.',
    'Are you licensed immigration consultants?': 'هل أنتم مستشارو هجرة مرخصون؟',
    'Yes. Our consultants are ICCRC/CICC and MARA certified, meeting the regulatory standards required to represent clients in Canadian and Australian immigration matters.':
      'نعم. مستشارونا معتمدون من ICCRC/CICC و MARA، ويستوفون المعايير التنظيمية لتمثيل العملاء في معاملات الهجرة الكندية والأسترالية.',
    'How long does the immigration process usually take?': 'كم تستغرق إجراءات الهجرة عادةً؟',
    'Timelines vary by pathway and destination. Express Entry profiles can receive invitations within weeks, while skilled nomination and family sponsorship routes typically take 3 to 6 months. We outline a clear timeline for your specific case from the start.':
      'تختلف المدة حسب المسار والوجهة. قد تصل دعوات الدخول السريع خلال أسابيع، بينما تستغرق مسارات الترشيح وكفالة الأسرة من 3 إلى 6 أشهر. نضع لك جدولًا زمنيًا واضحًا منذ البداية.',
    'Can my spouse and family members be included in the application?': 'هل يمكن ضم الزوج والأبناء إلى الطلب؟',
    'In most programs, yes — eligible spouses, partners, and dependent children can usually be included as part of your application. We’ll confirm exactly who qualifies under your chosen pathway.':
      'في معظم البرامج نعم؛ يمكن عادةً ضم الزوج أو الشريك والأبناء المعالين. ونؤكد لك بدقة مَن تنطبق عليه الشروط في مسارك.',
    'What documents do I need to get started?': 'ما المستندات المطلوبة للبدء؟',
    'Requirements differ by program, but you’ll typically need valid identification, education and work history records, language test results, and financial documentation. We provide a personalized checklist once we understand your goals.':
      'تختلف المتطلبات بحسب البرنامج، لكنك ستحتاج عادةً إلى إثبات هوية ساري، وسجلات الدراسة والعمل، ونتيجة اختبار اللغة، ومستندات مالية. ونزوّدك بقائمة مخصصة بعد فهم أهدافك.',
    'How can I verify that HOF Migration is legitimate?': 'كيف أتحقق من موثوقيتكم؟',
    'You can verify our credentials directly with the relevant regulatory bodies (ICCRC/CICC, MARA), and we’re happy to share our registration details and client references on request.':
      'يمكنك التحقق من اعتماداتنا مباشرةً لدى الجهات التنظيمية (ICCRC/CICC و MARA)، ويسعدنا مشاركة بيانات تسجيلنا وآراء عملائنا عند الطلب.',
    'Do immigration consultants guarantee visa approval?': 'هل تضمنون الموافقة على التأشيرة؟',
    'No consultancy can guarantee a visa outcome, as final decisions rest with government authorities. What we guarantee is honest advice, a properly prepared application, and dedicated support at every step.':
      'لا يمكن لأي جهة ضمان نتيجة التأشيرة، فالقرار النهائي بيد الجهات الحكومية. ما نضمنه هو نصيحة صادقة وطلبًا مُعدًّا بإتقان ودعمًا في كل خطوة.',

    /* work with experts + form */
    'Work with': 'اعمل مع',
    'Experts to help you migrate': 'خبراء يساعدونك على الهجرة',
    'Book a Free Consultation — No Commitment Required': 'استشارة مجانية دون أي التزام',
    'Discover Your Eligible Visa Pathways': 'اكتشف مسارات التأشيرات المتاحة لك',
    'Get Matched With The Right Immigration Expert': 'تواصل مع الخبير الأنسب لحالتك',
    Name: 'الاسم',
    'Phone Number': 'رقم الهاتف',
    Email: 'البريد الإلكتروني',
    Program: 'البرنامج',
    'Select a program': 'اختر البرنامج',
    'Skilled Migration – Canada & Australia': 'الهجرة المهارية – كندا وأستراليا',
    'Study Abroad & Student Visas': 'الدراسة في الخارج وتأشيرات الطلاب',
    Submit: 'إرسال',

    /* footer */
    Newsletter: 'النشرة البريدية',
    Subscribe: 'اشترك',
    'Let’s transform your vision into results.': 'لنحوّل رؤيتك إلى نتائج.',
    Links: 'روابط',
    Home: 'الرئيسية',
    Company: 'الشركة',
    'Our Team': 'فريقنا',
    Careers: 'الوظائف',
    'Visit Us': 'زُرنا',
    'Call Us Now': 'اتصل بنا',
    'Business Bay, Dubai, UAE': 'الخليج التجاري، دبي، الإمارات',
    'Privacy Policy': 'سياسة الخصوصية',
    Terms: 'الشروط',
    Cookies: 'ملفات الارتباط',
    '© 2026. All rights reserved.': '© 2026. جميع الحقوق محفوظة.'
  };

  /* placeholders, titles and labels don't live in text nodes */
  var AR_ATTRS = {
    'Your full name': 'الاسم الكامل',
    'you@example.com': 'you@example.com',
    'Enter your email address': 'أدخل بريدك الإلكتروني',
    'Change language / region': 'تغيير اللغة أو المنطقة',
    'Close the window shade to switch the site to dark mode': 'أغلق ستارة النافذة للتبديل إلى الوضع الداكن',
    'Previous reviews': 'التقييمات السابقة',
    'Next reviews': 'التقييمات التالية',
    'Play video': 'تشغيل الفيديو',
    Primary: 'الرئيسية'
  };

  var ATTRS = ['placeholder', 'aria-label', 'title'];
  var ORIGINAL = '__enText';
  var STORE_KEY = 'hof-lang';

  function walkTextNodes(root, fn) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var p = node.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = p.nodeName;
        if (tag === 'SCRIPT' || tag === 'STYLE') return NodeFilter.FILTER_REJECT;
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var node;
    while ((node = walker.nextNode())) fn(node);
  }

  function toArabic() {
    walkTextNodes(document.body, function (node) {
      var raw = node.nodeValue;
      // the source wraps long copy across several indented lines, so a text
      // node's value carries newlines and runs of spaces that the dictionary
      // keys don't have — collapse them before looking it up
      var key = raw.trim().replace(/\s+/g, ' ');
      var hit = AR[key];
      if (!hit) return;
      if (node[ORIGINAL] === undefined) node[ORIGINAL] = raw;
      // keep whatever whitespace the source had around the string
      node.nodeValue = raw.match(/^\s*/)[0] + hit + raw.match(/\s*$/)[0];
    });

    document.querySelectorAll('[' + ATTRS.join('],[') + ']').forEach(function (el) {
      ATTRS.forEach(function (attr) {
        var val = el.getAttribute(attr);
        if (!val) return;
        var hit = AR_ATTRS[val.trim()] || AR[val.trim()];
        if (!hit) return;
        if (el.getAttribute('data-en-' + attr) === null) el.setAttribute('data-en-' + attr, val);
        el.setAttribute(attr, hit);
      });
    });
  }

  function toEnglish() {
    walkTextNodes(document.body, function (node) {
      if (node[ORIGINAL] !== undefined) node.nodeValue = node[ORIGINAL];
    });
    document.querySelectorAll('[' + ATTRS.map(function (a) { return 'data-en-' + a; }).join('],[') + ']')
      .forEach(function (el) {
        ATTRS.forEach(function (attr) {
          var saved = el.getAttribute('data-en-' + attr);
          if (saved !== null) el.setAttribute(attr, saved);
        });
      });
  }

  function apply(lang, toggle) {
    var arabic = lang === 'ar';
    var html = document.documentElement;

    if (arabic) toArabic();
    else toEnglish();

    html.setAttribute('lang', arabic ? 'ar' : 'en');
    html.setAttribute('dir', arabic ? 'rtl' : 'ltr');

    if (toggle) {
      // the control always offers the other language
      toggle.textContent = arabic ? 'English' : 'العربية';
      toggle.setAttribute('lang', arabic ? 'en' : 'ar');
      toggle.setAttribute(
        'aria-label',
        arabic ? 'Switch the site to English' : 'تغيير لغة الموقع إلى العربية'
      );
    }

    try {
      window.localStorage.setItem(STORE_KEY, arabic ? 'ar' : 'en');
    } catch (e) {
      /* private browsing — the choice just won't persist */
    }

    // flipping direction re-lays the row out around the other edge, and the
    // browser keeps the old offset — which lands the carousel at the far end.
    // Send it back to the first card so the switch doesn't move the content.
    document.querySelectorAll('.reviews__track').forEach(function (track) {
      var behavior = track.style.scrollBehavior;
      track.style.scrollBehavior = 'auto';
      track.scrollLeft = 0;
      track.style.scrollBehavior = behavior;
    });

    // let the scroll-hijack and the reviews carousel re-measure for the new
    // direction; both already re-measure on resize
    window.dispatchEvent(new Event('resize'));
  }

  function init() {
    var toggle = document.querySelector('[data-lang-toggle]');
    if (!toggle) return;

    var saved = null;
    try {
      saved = window.localStorage.getItem(STORE_KEY);
    } catch (e) {
      /* ignore */
    }
    if (saved === 'ar') apply('ar', toggle);

    toggle.addEventListener('click', function (event) {
      event.preventDefault();
      apply(document.documentElement.getAttribute('lang') === 'ar' ? 'en' : 'ar', toggle);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
