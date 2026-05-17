document.addEventListener('DOMContentLoaded',()=>{

const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>80));

const burger=document.getElementById('navBurger');
const navList=document.getElementById('navList');
burger.addEventListener('click',()=>{burger.classList.toggle('active');navList.classList.toggle('open')});
document.querySelectorAll('.nav-list a').forEach(a=>a.addEventListener('click',()=>{burger.classList.remove('active');navList.classList.remove('open')}));

const obs=new IntersectionObserver(e=>{e.forEach(i=>{if(i.isIntersecting){i.target.classList.add('show');obs.unobserve(i.target)}})},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

document.querySelectorAll('.menu-filter').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelector('.menu-filter.active')?.classList.remove('active');
    btn.classList.add('active');
    const f=btn.dataset.filter;
    document.querySelectorAll('.menu-card').forEach(c=>{
      const match=f==='all'||c.dataset.cat===f;
      c.style.opacity='0';c.style.transform='translateY(12px)';
      setTimeout(()=>{
        if(match){c.style.display='flex';requestAnimationFrame(()=>{c.style.transition='all .4s ease';c.style.opacity='1';c.style.transform='translateY(0)'})}
        else c.style.display='none';
      },120);
    });
  });
});

const lb=document.getElementById('lightbox');
const lbImg=document.getElementById('lightboxImg');
document.querySelectorAll('.gallery-item img').forEach(img=>{img.addEventListener('click',()=>{lbImg.src=img.src;lb.classList.add('open');document.body.style.overflow='hidden'})});
lb.querySelector('.lightbox-close').addEventListener('click',()=>{lb.classList.remove('open');document.body.style.overflow=''});
lb.addEventListener('click',e=>{if(e.target===lb){lb.classList.remove('open');document.body.style.overflow=''}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){lb.classList.remove('open');document.body.style.overflow=''}});

});
