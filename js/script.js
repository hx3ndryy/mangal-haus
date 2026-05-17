document.addEventListener('DOMContentLoaded',()=>{

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href');if(id==='#')return;
    const t=document.querySelector(id);if(!t)return;
    e.preventDefault();
    const o=document.getElementById('nav').offsetHeight+16;
    const top=t.getBoundingClientRect().top+window.scrollY-o;
    window.scrollTo({top,behavior:'smooth'});
  });
});

const nav=document.getElementById('nav');
const backTop=document.getElementById('backTop');
const progBar=document.getElementById('progressBar');

window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',window.scrollY>80);
  backTop.classList.toggle('visible',window.scrollY>500);
  const p=window.scrollY/(document.documentElement.scrollHeight-window.innerHeight);
  progBar.style.transform='scaleX('+Math.min(p,1)+')';
});

backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const burger=document.getElementById('navBurger');
const navList=document.getElementById('navList');
burger.addEventListener('click',()=>{burger.classList.toggle('active');navList.classList.toggle('open')});
document.querySelectorAll('.nav-list a').forEach(a=>a.addEventListener('click',()=>{burger.classList.remove('active');navList.classList.remove('open')}));

const obs=new IntersectionObserver(e=>{e.forEach(i=>{if(i.isIntersecting){i.target.classList.add('show');obs.unobserve(i.target)}})},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

const counterObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    counterObs.unobserve(e.target);
    e.target.querySelectorAll('.counter').forEach(c=>{
      const target=parseFloat(c.dataset.target);
      const decimals=parseInt(c.dataset.decimals)||0;
      const duration=1600;
      const start=performance.now();
      const step=now=>{
        const p=Math.min((now-start)/duration,1);
        const val=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
        c.textContent=decimals===1?(val*target/10).toFixed(1):Math.round(val*target);
        if(p<1)requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  });
},{threshold:.5});

document.querySelectorAll('.about-stats').forEach(el=>counterObs.observe(el));

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
