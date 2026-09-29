const firstRow = [
  ['b0c7673ee768983a.svg', 'Rise'], ['48c313b6e48f9655.png', 'Gloog'], ['38fb9e9f61314cfa.png', 'Pretty Damn Quick'],
  ['2fd7c8e5f587488b.png', 'Kornit Digital'], ['d5fe840706e2c917.png', 'Samlat'], ['32b042d8a4e1dd7e.svg', 'Gardi'],
  ['6825b4f35b3bd99a.svg', 'Rimonim'], ['c986266e8b325f6f.svg', 'Getin'], ['6912efbcaa85858f.svg', 'Santé'],
  ['997948a7e6fba8b4.svg', 'Links'], ['d794e68573cfb925.svg', 'Shenkar'], ['3d280c70f8495976.svg', 'Israel Border Police']
];
const secondRow = [
  ['c8353f91b05add5e.svg', 'Twintera'], ['9448f90212d71d2b.svg', 'Client logo'], ['06cd123ad1e89811.svg', 'Wipe & Go'],
  ['a586ccb2669087db.svg', 'iMotion'], ['b94ba5293ed4d2ea.svg', 'Figcoms'], ['c8353f91b05add5e.svg', 'Twintera'],
  ['3837e6c5e20a2633.svg', 'Beerbazaar'], ['d87466bdc05c5461.svg', 'Strongful'], ['ec762d0b4950a2ab.svg', 'Drama'],
  ['04ab378cfec474d2.svg', 'Tea Lovers'], ['bce7099e90f77ba4.svg', 'Malka'], ['c34db5df64428885.svg', 'Israel Police']
];
for (const [name, files] of [['first', firstRow], ['second', secondRow]]) {
  const track = document.querySelector(`[data-logos="${name}"]`);
  for (const repeat of [0, 1]) for (const [file, alt] of files) {
    const image = document.createElement('img');
    image.src = `assets/${file}`;
    image.alt = alt;
    image.loading = 'lazy';
    track.append(image);
  }
}

const menu = document.querySelector('.menu-drawer');
const menuButton = document.querySelector('.menu-button');
function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-hidden', String(!open));
  document.querySelector('.close-menu').focus();
}
menuButton.addEventListener('click', () => setMenu(true));
document.querySelector('.close-menu').addEventListener('click', () => setMenu(false));
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.body.classList.contains('menu-open')) {
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    menuButton.focus();
  }
});

document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('.form-status').textContent = 'Thanks — your message is ready. This local copy is not connected to an inbox.';
});

const infoDialog = document.querySelector('#info-dialog');
const infoPages = {
  shop: ['THE ART LAB', 'Art Shop', 'For questions about original artwork and prints, get in touch.', 'Ask about artwork'],
  privacy: ['POLICY', 'Privacy', 'This local recreation stores no form entries. Submitting the contact form only shows a local confirmation.', 'Contact Pamidor Studio'],
  terms: ['POLICY', 'Terms', '© 2026 Pamidor Studio. All rights reserved.', 'Contact Pamidor Studio']
};
document.querySelector('.close-info').addEventListener('click', () => infoDialog.close());
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const destination = document.querySelector(link.getAttribute('href'));
    if (!destination) {
      const page = infoPages[link.getAttribute('href').slice(1)];
      if (!page) return;
      event.preventDefault();
      document.querySelector('#info-label').textContent = page[0];
      document.querySelector('#info-title').textContent = page[1];
      document.querySelector('#info-copy').textContent = page[2];
      document.querySelector('#info-link').textContent = `${page[3]} ↗`;
      infoDialog.showModal();
      return;
    }
    event.preventDefault();
    history.replaceState(null, '', link.getAttribute('href'));
    destination.scrollIntoView({behavior: 'smooth', block: 'start'});
  });
});
