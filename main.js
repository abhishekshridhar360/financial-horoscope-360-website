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
  var mb=document.querySelector('.mBar');if(hj&&'IntersectionObserver' in window){new IntersectionObserver(function(en){var on=en[0].isIntersecting;if(wa)wa.classList.toggle('away',on);if(mb)mb.classList.toggle('away',on);}).observe(hj);}

  // roadmap labels: pin each label to its icon on the hero image (object-fit: cover aware)
  var hero=document.querySelector('.hero'), art=hero&&hero.querySelector('.heroArt'), pinBox=hero&&hero.querySelector('.pins'), copy=hero&&hero.querySelector('.heroContent');
  function placePins(){
    if(!art||!pinBox||!art.naturalWidth)return;
    var W=hero.clientWidth,H=hero.clientHeight,iw=art.naturalWidth,ih=art.naturalHeight,s=Math.max(W/iw,H/ih),rw=iw*s,rh=ih*s;
    var pos=getComputedStyle(art).objectPosition.split(' '),px=parseFloat(pos[0])/100,py=parseFloat(pos[1]||'50%')/100;
    var ox=(W-rw)*px,oy=(H-rh)*py,hr=hero.getBoundingClientRect(),narrow=W<700;
    var textRects=[];copy.querySelectorAll('.kicker,h1,.heroSub,.btn,.trustMini').forEach(function(t){var rg=document.createRange();rg.selectNodeContents(t);[].forEach.call(rg.getClientRects(),function(r){textRects.push(r)});textRects.push(t.classList.contains('btn')?t.getBoundingClientRect():{left:0,right:0,top:0,bottom:0});});
    pinBox.querySelectorAll('.pin').forEach(function(el){
      var dx=narrow&&el.dataset.mx?el.dataset.mx:el.dataset.x,dy=narrow&&el.dataset.my?el.dataset.my:el.dataset.y;
      var x=ox+rw*parseFloat(dx)/100,y=oy+rh*parseFloat(dy)/100;
      el.style.left=x+'px';el.style.top=y+'px';el.hidden=false;el.classList.remove('side');
      function hits(r){return textRects.some(function(c){return c.right>c.left&&!(r.right<c.left-14||r.left>c.right+14||r.bottom<c.top-10||r.top>c.bottom+10);});}
      var r=el.getBoundingClientRect(),hide=(narrow&&!el.classList.contains('here'))||r.left<hr.left+4||r.right>hr.right-4||r.top<hr.top+4;
      if(narrow&&el.classList.contains('here')&&hits(r)){var bb=hero.querySelector('.heroJourney').getBoundingClientRect();el.style.top=(bb.top-hr.top-34)+'px';el.style.left=(W*0.62)+'px';r=el.getBoundingClientRect();hide=hits(r);}
      if(!hide&&!narrow&&hits(r)){el.classList.add('side');r=el.getBoundingClientRect();hide=hits(r)||r.right>hr.right-4;}
      var bar=hero.querySelector('.heroJourney');if(!hide&&bar&&!(narrow&&el.classList.contains('here'))){var b=bar.getBoundingClientRect();if(r.bottom>b.top-6&&r.top<b.bottom)hide=true;}
      el.hidden=hide;
    });
    pinBox.classList.add('ready');
  }
  if(art){if(art.complete)placePins();else art.addEventListener('load',placePins);
    var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(placePins,120);});
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(placePins);}

  // ---------- 60-second health check ----------
  var hcForm=document.getElementById('hcForm');
  if(hcForm){
    var names=['ef','lc','hi','sr','emi'];
    var msgs={danger:'Several basics need attention, such as emergency savings, protection or debt. A complete Financial Horoscope™ shows exactly where to start.',
      caution:'Some foundations are in place, but there are clear gaps. Your Financial Horoscope™ shows which gaps matter most for your goals.',
      stable:'A solid base. The next step is checking whether your investments are on track for each of your goals.',
      growth:'Strong fundamentals. A Financial Horoscope™ can confirm your goals are fully funded and show how to grow with confidence.'};
    hcForm.addEventListener('change',function(){
      var total=0,done=0;names.forEach(function(n){var c=hcForm.querySelector('input[name="'+n+'"]:checked');if(c){done++;total+=parseFloat(c.value);}});
      if(done<names.length){document.getElementById('hcZone').textContent=(names.length-done)+' question'+(names.length-done>1?'s':'')+' left';return;}
      var s=Math.round(total*10)/10,zone=s<4?'danger':s<6?'caution':s<8?'stable':'growth',label={danger:'Danger Zone',caution:'Caution Zone',stable:'Stable Zone',growth:'Growth Zone'}[zone];
      document.getElementById('hcScore').textContent=s%1?s.toFixed(1):s;
      var z=document.getElementById('hcZone');z.textContent=label;z.className='zone '+zone;
      document.getElementById('hcMsg').textContent=msgs[zone];
      document.getElementById('hcArc').style.strokeDashoffset=157*(1-s/10);
      document.getElementById('hcArc').style.stroke={danger:'#c2412f',caution:'#d99a2b',stable:'#c7a04c',growth:'#1d8655'}[zone];
      document.getElementById('hcResult').classList.add('done');
    });
  }

  // ---------- dream calculator ----------
  var calc=document.getElementById('calc');
  if(calc){
    var $=function(id){return document.getElementById(id)};
    function inr(v){if(v>=1e7)return '₹'+(v/1e7).toFixed(v>=1e9?0:2).replace(/\.?0+$/,'')+' Cr';if(v>=1e5)return '₹'+(v/1e5).toFixed(2).replace(/\.?0+$/,'')+' L';return '₹'+Math.round(v).toLocaleString('en-IN');}
    function load(){var p=$('cGoal').value.split('|');$('cCost').value=p[0];$('cYears').value=p[1];$('cInf').value=p[2];upd();}
    function upd(){
      var c=+$('cCost').value,y=+$('cYears').value,i=+$('cInf').value/100,r=+$('cRet').value/100;
      $('oCost').textContent=inr(c);$('oYears').textContent=y+(y>1?' years':' year');$('oInf').textContent=(+$('cInf').value)+'%';$('oRet').textContent=(+$('cRet').value)+'% p.a.';
      var fv=c*Math.pow(1+i,y),rm=Math.pow(1+r,1/12)-1,n=y*12,sip=fv/(((Math.pow(1+rm,n)-1)/rm)*(1+rm)),lump=fv/Math.pow(1+r,y);
      $('rFuture').textContent=inr(fv);$('rSip').textContent=inr(sip)+' /month';$('rLump').textContent=inr(lump);
    }
    $('cGoal').addEventListener('change',load);['cCost','cYears','cInf','cRet'].forEach(function(id){$(id).addEventListener('input',upd);});load();
  }

  // ---------- hero: labels appear in journey order, a gold spark travels the road ----------
  var order=['You Are Here','Dream Home','Children’s Education','Travel & Experiences','Children’s Marriage','Financial Freedom','Retirement','Legacy'];
  var heroAnimated=false;
  function animateHero(){
    if(heroAnimated||!pinBox||reduce)return;heroAnimated=true;
    var pins=[].slice.call(pinBox.querySelectorAll('.pin')).filter(function(p){return !p.hidden;});
    pins.sort(function(a,b){return order.indexOf(a.textContent.trim())-order.indexOf(b.textContent.trim());});
    pins.forEach(function(p,k){p.style.opacity='0';p.style.transition='opacity .5s ease, transform .5s ease';setTimeout(function(){p.style.opacity='1';},400+k*380);});
    if(pins.length<2||!pins[0].animate)return;
    var spark=document.createElement('i');spark.className='spark';pinBox.appendChild(spark);
    var pts=pins.map(function(p){return {left:p.style.left,top:p.style.top};});
    var kf=pts.map(function(pt,k){return {left:pt.left,top:pt.top,opacity:k===0?0:1,offset:k/(pts.length-1)};});kf[kf.length-1].opacity=0;
    spark.animate(kf,{duration:380*pins.length,delay:400,easing:'ease-in-out',fill:'forwards'});
  }
  if(pinBox&&pinBox.classList.contains('ready'))animateHero();
  else if(pinBox){var mo=new MutationObserver(function(){if(pinBox.classList.contains('ready')){animateHero();mo.disconnect();}});mo.observe(pinBox,{attributes:true,attributeFilter:['class']});}
  var y=document.getElementById('yr');if(y)y.textContent=new Date().getFullYear();
})();
