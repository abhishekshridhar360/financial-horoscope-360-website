(function(){
  // mobile menu
  var btn=document.querySelector('.menubtn'), nav=document.getElementById('navlinks');
  if(btn&&nav){
    btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o);btn.setAttribute('aria-label',o?'Close menu':'Open menu');btn.querySelector('use').setAttribute('href',o?'#i-close':'#i-menu');});
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.querySelector('use').setAttribute('href','#i-menu');});});
  }
  // stagger indexes
  ['.qGrid','.outputs','.dreamGrid','.personaGrid','.protectGrid','.youMap','.videoGrid','.teamGrid','.steps'].forEach(function(s){
    document.querySelectorAll(s).forEach(function(g){
      g.querySelectorAll(':scope > li, :scope > article, :scope .youNode, :scope > .video').forEach(function(c,i){c.style.setProperty('--i',i);});
    });
  });
  document.querySelectorAll('.inputs').forEach(function(g){g.querySelectorAll('span').forEach(function(c,i){c.style.setProperty('--i',i);});});
  document.querySelectorAll('.tlCol').forEach(function(g){g.querySelectorAll('article').forEach(function(c,i){c.style.setProperty('--i',i);});});
  document.querySelectorAll('.path').forEach(function(g){g.querySelectorAll('li').forEach(function(c,i){c.style.setProperty('--i',i);});});

  // counters
  function count(el){
    var to=+el.dataset.to, t0=null, dur=1300;
    function step(t){if(!t0)t0=t;var p=Math.min((t-t0)/dur,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step);}
    el.textContent='0';requestAnimationFrame(step);
  }
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items=document.querySelectorAll('[data-reveal]');
  if(reduce||!('IntersectionObserver' in window)){items.forEach(function(e){e.classList.add('in');});}
  else{
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(!en.isIntersecting)return;
        var el=en.target;el.classList.add('in');io.unobserve(el);
        el.querySelectorAll('.count').forEach(count);
      });
    },{threshold:0.05,rootMargin:'0px 0px -30px 0px'});
    items.forEach(function(e){io.observe(e);});
    // safety net: anything already scrolled into or past the viewport is revealed (fast flings, menu jumps)
    var pending=false;
    function sweep(){pending=false;items.forEach(function(el){if(el.classList.contains('in'))return;if(el.getBoundingClientRect().top<innerHeight){el.classList.add('in');io.unobserve(el);el.querySelectorAll('.count').forEach(count);}});}
    addEventListener('scroll',function(){if(!pending){pending=true;setTimeout(sweep,150);}},{passive:true});
    addEventListener('beforeprint',function(){items.forEach(function(el){el.classList.add('in');});});
  }

  // video lightbox
  var lb=document.getElementById('lightbox'), frame=lb&&lb.querySelector('.lbFrame'), last=null;
  function close(){lb.hidden=true;frame.innerHTML='';document.body.style.overflow='';if(last)last.focus();}
  document.querySelectorAll('button.video').forEach(function(v){
    v.addEventListener('click',function(){
      last=v;var id=v.dataset.yt;frame.style.aspectRatio='';frame.style.background='';
      frame.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0" title="Client video story" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
      lb.hidden=false;document.body.style.overflow='hidden';lb.querySelector('.lbClose').focus();
    });
  });
  if(lb){lb.addEventListener('click',function(e){if(e.target===lb||e.target.closest('.lbClose'))close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!lb.hidden)close();});}

  // review screenshots: open enlarged in the lightbox
  document.querySelectorAll('a.review').forEach(function(a){
    a.addEventListener('click',function(e){
      e.preventDefault();last=a;var img=a.querySelector('img');
      frame.innerHTML='<div class="lbImg"><img src="'+img.getAttribute('src')+'" alt="'+img.alt+'"><a href="'+a.href+'" target="_blank" rel="noopener">See this review on Google →</a></div>';
      frame.style.aspectRatio='auto';frame.style.background='transparent';
      lb.hidden=false;document.body.style.overflow='hidden';lb.querySelector('.lbClose').focus();
    });
  });
  // hide WhatsApp button while the hero journey bar is on screen
  var wa=document.querySelector('.waFloat'),hj=document.querySelector('.heroJourney');
  if(wa&&hj&&'IntersectionObserver' in window){new IntersectionObserver(function(en){wa.classList.toggle('away',en[0].isIntersecting);}).observe(hj);}
  var y=document.getElementById('yr');if(y)y.textContent=new Date().getFullYear();
})();
