// ── 1. NAVBAR: highlight the active link as user scrolls ──
    var sections  = document.querySelectorAll('section[id]');
    var navLinks  = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;

      sections.forEach(function (section) {
        var top    = section.offsetTop - 80;   // 80px offset for the fixed navbar
        var bottom = top + section.offsetHeight;
        var id     = section.getAttribute('id');

        if (scrollY >= top && scrollY < bottom) {
          // Remove "active" from all links, then add it to the matching one
          navLinks.forEach(function (link) { link.classList.remove('active'); });
          var match = document.querySelector('.nav-links a[href="#' + id + '"]');
          if (match) { match.classList.add('active'); }
        }
      });
    });


    // ── 2. HAMBURGER MENU: open/close on mobile ──
    function toggleMenu() {
      var menu = document.getElementById('navLinks');
      menu.classList.toggle('open');
    }

    // Close the mobile menu when a link is clicked
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        document.getElementById('navLinks').classList.remove('open');
      });
    });


    // ── 3. SCROLL ANIMATION: fade elements in as they appear ──
    var fadeItems = document.querySelectorAll('.fade-up');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);   // animate once only
        }
      });
    }, { threshold: 0.15 });

    fadeItems.forEach(function (item) { observer.observe(item); });


    // ── 4. TOAST NOTIFICATION: small popup message ──
    function showToast(message) {
      var toast = document.getElementById('toast');
      toast.textContent = message;
      toast.classList.add('show');

      // Automatically hide it after 3.5 seconds
      setTimeout(function () {
        toast.classList.remove('show');
      }, 3500);
    }


    // ── 5. APPLY MODAL: open and close ──
    function openApplyModal() {
      document.getElementById('applyModal').classList.add('open');
    }

    function closeApplyModal() {
      document.getElementById('applyModal').classList.remove('open');
    }

    // Click outside the white box to close
    document.getElementById('applyModal').addEventListener('click', function (e) {
      if (e.target === this) { closeApplyModal(); }
    });

    // "Contact Us First" button inside modal → scroll to contact section
    function goToContact() {
      closeApplyModal();
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }


    // ── 6. CONTACT FORM: validate and submit ──
    function handleFormSubmit(event) {
      event.preventDefault();   // stop the page from refreshing

      // Get the field values and trim whitespace
      var fname   = document.getElementById('fname').value.trim();
      var lname   = document.getElementById('lname').value.trim();
      var email   = document.getElementById('email').value.trim();
      var message = document.getElementById('message').value.trim();

      var isValid = true;   // we'll set this to false if any field is wrong

      // --- Check First Name ---
      if (fname === '') {
        document.getElementById('fnameError').style.display = 'block';
        isValid = false;
      } else {
        document.getElementById('fnameError').style.display = 'none';
      }

      // --- Check Last Name ---
      if (lname === '') {
        document.getElementById('lnameError').style.display = 'block';
        isValid = false;
      } else {
        document.getElementById('lnameError').style.display = 'none';
      }

      // --- Check Email (must have @ and a dot) ---
      var emailOK = email.includes('@') && email.includes('.');
      if (!emailOK) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
      } else {
        document.getElementById('emailError').style.display = 'none';
      }

      // --- Check Message ---
      if (message === '') {
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
      } else {
        document.getElementById('messageError').style.display = 'none';
      }

      // If all fields are correct, show the success screen
      if (isValid) {
        document.getElementById('contactFormWrap').style.display = 'none';
        document.getElementById('formSuccess').style.display    = 'block';
        showToast('✅ Message sent successfully!');
      }
    }

    // Reset form so user can send another message
    function resetForm() {
      document.getElementById('contactForm').reset();
      document.getElementById('contactFormWrap').style.display = 'block';
      document.getElementById('formSuccess').style.display    = 'none';
    }