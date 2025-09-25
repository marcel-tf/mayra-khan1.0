
// Header shrink + scrollspy + mobile nav + reveal animations + smooth offset scrolling
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelectorAll('.nav-link');

function onScroll(){
  if(window.scrollY > 10){ header.classList.add('scrolled'); } else { header.classList.remove('scrolled'); }
  const sections = [...document.querySelectorAll('section[id]')];
  const offset = header.offsetHeight + 8;
  const pos = window.scrollY + offset + 1;
  let active = null;
  for(const s of sections){
    if(pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight){ active = s.id; break; }
  }
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + active));
}
window.addEventListener('scroll', onScroll);
onScroll();

if(toggle){
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', e => { if(e.target.matches('.nav a')) nav.classList.remove('open'); });
}

links.forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if(id.startsWith('#')){
      e.preventDefault();
      const target = document.querySelector(id);
      if(target){
        const y = target.getBoundingClientRect().top + window.scrollY - (header.offsetHeight + 8);
        window.scrollTo({top:y, behavior:'smooth'});
      }
    }
  });
});

const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); io.unobserve(entry.target);} });
},{threshold:.15});
revealEls.forEach(el => io.observe(el));

const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
