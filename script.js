const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.getElementById('primary-nav');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

const fileInputs = document.querySelectorAll('input[type="file"][name="files"]');

if (fileInputs.length) {
  const maxBytes = 1073741824;
  const maxFiles = 10;

  fileInputs.forEach((input) => {
    input.addEventListener('change', () => {
      const files = Array.from(input.files || []);
      const totalBytes = files.reduce(
        (sum, file) => sum + file.size,
        0
      );

      if (files.length > maxFiles) {
        alert('Please select up to 10 files.');
        input.value = '';
        return;
      }

      if (totalBytes > maxBytes) {
        alert('Please keep uploads under 1 GB total.');
        input.value = '';
      }
    });
  });
}

const referralSelects = document.querySelectorAll('select[name="referral"]');

if (referralSelects.length) {
  referralSelects.forEach((select) => {
    const form = select.closest('form');
    const otherReferral = form ? form.querySelector('.other-referral') : null;
    const otherInput = otherReferral ? otherReferral.querySelector('input') : null;

    if (!otherReferral) {
      return;
    }

    const toggleOther = () => {
      const isOther = select.value === 'Other';
      otherReferral.classList.toggle('is-visible', isOther);
      if (otherInput) {
        otherInput.required = isOther;
        if (!isOther) {
          otherInput.value = '';
        }
      }
    };

    select.addEventListener('change', toggleOther);
    toggleOther();
  });
}

const mapTarget = document.getElementById('service-map');

if (mapTarget && window.L) {
  const seabrook = [42.8945, -70.8712];
  const map = L.map(mapTarget, { scrollWheelZoom: false }).setView(seabrook, 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.circle(seabrook, {
    radius: 40234,
    color: '#0f5066',
    fillColor: '#f4b340',
    fillOpacity: 0.2
  }).addTo(map);

  L.marker(seabrook).addTo(map).bindPopup('Seabrook, NH');
}

const reviewsTrack = document.querySelector('.reviews-track');

if (reviewsTrack && !reviewsTrack.dataset.cloned) {
  const items = Array.from(reviewsTrack.children);
  items.forEach((item) => reviewsTrack.appendChild(item.cloneNode(true)));
  reviewsTrack.dataset.cloned = 'true';
}
