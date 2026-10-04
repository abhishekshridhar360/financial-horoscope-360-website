"use client";

import { useState } from "react";
import {
  ArrowRight, Menu, X, ChevronDown, Compass, Home, GraduationCap, Car, Plane,
  HeartHandshake, Trophy, Sunset, TreePine, ShieldCheck, HeartPulse, Siren,
  Users, BriefcaseBusiness, Landmark, BadgeCheck, Target, Route, Sparkles,
  Play, Star, Phone, Mail, MapPin, Youtube, Facebook, Linkedin, MessageCircle, ExternalLink,
  WalletCards, House, Banknote, Umbrella, CircleDollarSign, ChartNoAxesCombined
} from "lucide-react";

const QUICK_SCAN = "https://bni.financialhoroscope360.com/";
const CLIENT_LOGIN = "https://myshubhnivesh.midasx.in/pages/auth/login";
const YOUTUBE = "https://www.youtube.com/@MyShubhNivesh-com";
const FACEBOOK = "https://www.facebook.com/MyShubhNivesh/";
const LINKEDIN = "https://www.linkedin.com/company/myshubhnivesh/";
const MAPS = "https://maps.app.goo.gl/9593Mjn7iVxs2MVc7";
const WHATSAPP = "https://wa.me/918607777320";

const goals = [
  [Home,"Dream Home"],[GraduationCap,"Children's Education"],[Car,"Car / Lifestyle"],
  [Plane,"Travel & Experiences"],[HeartHandshake,"Children's Marriage"],
  [Trophy,"Financial Freedom"],[Sunset,"Retirement"],[TreePine,"Legacy"]
];

const videos = [
  ["Dr. Abhishek Khurana","Doctor","XsJ45wzk1-0"],
  ["Col. Somvir Singh Mundalia","Defence Personnel","ZuwFJrcT5sY"],
  ["Mr. Vikas Aggarwal","Business / Professional","8n6MlojWU2c"]
];

const team = [
  ["Rubal Shridhar","Founder & Chief Financial Planner","Ex–Wealth Manager, ICICI Bank | MBA (Finance) | IIM Calcutta (EP) | NISM • APMI • AAFM India • IRDA • TRPS","/assets/rubal.png"],
  ["Abhishek Shridhar","Financial Horoscope™ Specialist","M-Tech | NISM | IRDA | AAFM India (AFGP, CRGP)","/assets/abhishek.png"],
  ["Monika Shridhar","Operations Head & Financial Planner","MBA (Marketing) | NISM | IRDA","/assets/monika.png"],
  ["Manisha Shridhar","Administrator & Financial Planner","M-Tech (IT) | NISM | IRDA","/assets/manisha.png"]
];

const faq = [
  ["What exactly is Financial Horoscope™?","Financial Horoscope™ is a structured financial planning and diagnostic concept that brings your life goals, financial resources, protection and future requirements into one comprehensive view."],
  ["Is Financial Horoscope™ related to astrology?","No. It is not astrology or fortune-telling. The name is a brand metaphor for a comprehensive view of your financial life and future planning requirements."],
  ["Who should get one?","It can be useful for professionals, business owners, families, HNIs, defence personnel, pre-retirees and retirees who want greater clarity about their financial journey."],
  ["What information will I need to provide?","The complete exercise may consider family and life-stage information, income and expenses, assets and liabilities, investments and protection, and your important goals and aspirations."],
  ["Is my information confidential?","Confidentiality is a core design principle of the Financial Horoscope™ journey. Information should be shared only through the designated secure workflow."],
  ["Are future values or projections guaranteed?","No. Future values, inflation and return assumptions are planning estimates and not guarantees of future outcomes. Actual outcomes can differ."],
  ["How long does it take?","The time required depends on the completeness of the information provided and the depth of the analysis. The process is designed to move from information gathering to financial clarity in a structured way."],
  ["Does Financial Horoscope™ recommend financial products?","Financial Horoscope™ begins with your life, goals, resources and gaps. Any action considered afterward should follow from the roadmap and your individual suitability rather than starting with a product."],
  ["How often should it be reviewed?","A financial roadmap should be revisited when life, income, goals, markets or other important circumstances materially change, and periodically as part of an ongoing planning process."]
];

export default function Page(){
  const [menu,setMenu]=useState(false);
  return <main>
    <header className="nav">
      <a className="brand" href="#home"><Compass/><span><b>FINANCIAL HOROSCOPE™</b><small>A ROADMAP FOR YOUR WEALTH JOURNEY</small></span><em>360</em></a>
      <nav className={menu ? "navlinks open":"navlinks"}>
        <a href="#why" onClick={()=>setMenu(false)}>Why</a>
        <a href="#how" onClick={()=>setMenu(false)}>How It Works</a>
        <a href="#benefits" onClick={()=>setMenu(false)}>Benefits</a>
        <a href="#for-whom" onClick={()=>setMenu(false)}>For Whom</a>
        <a href="#stories" onClick={()=>setMenu(false)}>Real Stories</a>
        <a href="#about" onClick={()=>setMenu(false)}>About</a>
        <a href="#faq" onClick={()=>setMenu(false)}>FAQ</a>
        <a className="login" href={CLIENT_LOGIN} target="_blank" rel="noreferrer">Client Login</a>
        <a className="navcta" href={QUICK_SCAN}>Discover My Financial Horoscope™</a>
      </nav>
      <button className="menubtn" aria-label="Toggle menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
    </header>

    <section id="home" className="hero">
      <img src="/assets/hero-approved.png" alt="" className="heroArt"/>
      <div className="heroShade"/>
      <div className="heroContent">
        <div className="kicker light"><Sparkles/> YOUR DREAMS HAVE DESTINATIONS</div>
        <h1>You Know Where You Want to Go.<span>But Do You Know Whether Your Money Will Take You There?</span></h1>
        <p>Financial Horoscope™ transforms dreams into measurable wealth milestones.</p>
        <a className="primary" href={QUICK_SCAN}>Discover My Financial Horoscope™ <ArrowRight/></a>
        <div className="trustMini"><span>Personalized</span><i/> <span>Comprehensive</span><i/> <span>Confidential</span></div>
      </div>
      <div className="heroJourney">
        <div><Compass/><span>Know Your<br/><b>Current Position</b></span></div><ArrowRight/>
        <div><ChartNoAxesCombined/><span>Discover<br/><b>Your Gaps</b></span></div><ArrowRight/>
        <div><Route/><span>Get Your<br/><b>Personalized Roadmap</b></span></div><ArrowRight/>
        <div><Target/><span>Pursue<br/><b>Your Dreams</b></span></div>
      </div>
    </section>

    <section id="why" className="why section">
      <div className="whyCopy">
        <div className="kicker">WHY?</div>
        <h2>You are earning.<br/>Saving. Investing.</h2>
        <h3>But are you actually <em>on course?</em></h3>
        <p>Having investments is not the same as knowing whether your goals are adequately funded—or whether every part of your financial life is working together.</p>
      </div>
      <div className="orbit">
        <div className="question">?</div>
        {[[Banknote,"Income"],[WalletCards,"Investments"],[ShieldCheck,"Protection"],[House,"Property"],[Landmark,"Loans"],[CircleDollarSign,"Savings"]].map(([I,t],i)=><div key={t} className={`orbitItem o${i+1}`}><I/><span>{t}</span></div>)}
      </div>
    </section>

    <section className="aspiration section">
      <div className="kicker center">A DIFFERENT STARTING POINT</div>
      <h2 className="centerText">From <span className="mutedText">obligation</span> to <span className="goldText">aspiration.</span></h2>
      <div className="split">
        <div className="splitCard obligation"><small>TRADITIONAL STARTING POINT</small><h3>Obligations</h3><p>Pay Tax • Pay EMI • Buy Insurance • Start SIP • Save for Retirement</p></div>
        <div className="splitArrow"><ArrowRight/></div>
        <div className="splitCard dream"><small>FINANCIAL HOROSCOPE™</small><h3>Aspirations</h3><p>Dream Home • Education • Lifestyle • Experiences • Marriage • Financial Freedom • Retirement • Legacy</p></div>
      </div>
      <blockquote>“Don’t start with money. Start with the life you want.”<span>Because money isn’t the destination. The life you want is.</span></blockquote>
    </section>

    <section className="begins section">
      <div className="kicker center">PERSONAL BY DESIGN</div>
      <h2 className="centerText">Financial Horoscope™ begins with <span className="goldText">YOU.</span></h2>
      <p className="lead centerText">Because your financial future depends on much more than just your investments.</p>
      <div className="youMap">
        <div className="youCore"><Users/><b>YOU</b><small>Your life. Your priorities.</small></div>
        {["Profession & Experience","Family & Life Stage","Income & Expenses","Assets & Liabilities","Investments & Protection","Goals & Dreams"].map((x,i)=><div className={`youNode y${i+1}`} key={x}>{x}</div>)}
      </div>
      <p className="signature">Different Lives. Different Priorities. Different Dreams. <b>Different Financial Horoscopes™.</b></p>
    </section>

    <section className="questions section dark">
      <div className="kicker light">QUESTIONS WORTH KNOWING</div>
      <div className="questionLayout">
        <div><h2>Do you know the answers to <span>these questions?</span></h2><p>You already have a financial future. The question is—do you know what it looks like?</p></div>
        <div className="questionList">
          {["What is my Financial Health Score?","Which Wealth Zone Am I In?","How much wealth will my life actually require?","How much of my goals are funded today?","What is my wealth gap?","Is my family adequately protected?","Where will my current financial journey take me?","What should I change today?"].map((q)=><div key={q}><span>{q}</span></div>)}
        </div>
      </div>
    </section>

    <section id="benefits" className="what section">
      <div className="kicker center">WHAT IS FINANCIAL HOROSCOPE™?</div>
      <h2 className="centerText">See your financial life as <span className="goldText">one complete picture.</span></h2>
      <div className="engine">
        <div className="inputs"><b>YOUR LIFE</b><span>Family • Profession • Aspirations</span><b>YOUR NUMBERS</b><span>Income • Expenses • Assets • Investments</span></div>
        <ArrowRight/>
        <div className="engineCore"><Compass/><b>FINANCIAL<br/>HOROSCOPE™</b><small>PROPRIETARY ANALYSIS</small></div>
        <ArrowRight/>
        <div className="outputs">{["Financial Health","Current Position","Required Wealth","Goal Gaps","Protection Gaps","Future Journey","Personalized Roadmap"].map(x=><span key={x}><BadgeCheck/>{x}</span>)}</div>
      </div>
    </section>

    <section id="how" className="how section soft">
      <div className="kicker center">HOW DOES IT WORK?</div>
      <h2 className="centerText">A simple 4-step journey to <span className="goldText">clarity.</span></h2>
      <div className="steps">
        {[
          ["01","Tell Us About You","Life • Family • Finances • Goals • Aspirations"],
          ["02","Financial Horoscope™ Analysis","Your information is brought together and analysed."],
          ["03","Discover Your Financial Reality","Position • Health • Requirements • Gaps • Future Journey"],
          ["04","Get Your Personalized Roadmap","Priorities • Actions • Timelines • Review"]
        ].map(([n,t,d])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}
      </div>
      <p className="signature">Not just a report. <b>A roadmap for your entire wealth journey.</b></p>
    </section>

    <section className="reveal section">
      <div className="kicker center">THE BIG REVEAL</div>
      <h2 className="centerText">Where are you <span className="goldText">headed?</span></h2>
      <div className="journeyCompare">
        <div className="journeyCard current"><small>WHAT IF NOTHING CHANGES?</small><h3>Current Wealth Journey</h3>{["Financial Health Score","Wealth Zone","Current Corpus","Required Corpus","Goals Funded","Projected Wealth Gap"].map(x=><span key={x}><i/> {x}</span>)}</div>
        <div className="transform"><Compass/><b>FINANCIAL<br/>HOROSCOPE™</b><ArrowRight/></div>
        <div className="journeyCard recommended"><small>WITH A STRUCTURED ROADMAP</small><h3>Recommended Wealth Journey</h3>{["Recommended Corpus","Goals Funded","Potential Surplus","Growth Zone","Financial Freedom"].map(x=><span key={x}><i/> {x}</span>)}</div>
      </div>
      <h3 className="bigStatement">Same Dreams. <span>A Better-Designed Journey.</span></h3>
      <div className="revealCta"><a className="primary" href={QUICK_SCAN}>See What Your Financial Horoscope™ Says <ArrowRight/></a></div>
    </section>

    <section className="dreams section soft">
      <div className="kicker center">EVERY DREAM BECOMES MEASURABLE</div>
      <h2 className="centerText">Dreams become goals when they have a <span className="goldText">number and a timeline.</span></h2>
      <div className="goalGrid">{goals.map(([I,t])=><div key={t}><I/><span>{t}</span></div>)}</div>
    </section>

    <section className="protect section">
      <div className="protectVisual"><div className="familyGlow"><ShieldCheck/></div></div>
      <div className="protectCopy"><div className="kicker">PROTECT WHAT MATTERS</div><h2>Building wealth is only <span className="goldText">half the journey.</span></h2><p>Protecting what you’re building matters too.</p><div className="protectGrid">{[[ShieldCheck,"Life Protection"],[HeartPulse,"Health Protection"],[Siren,"Emergency Preparedness"],[Users,"Family Financial Security"]].map(([I,t])=><div key={t}><I/><span>{t}</span></div>)}</div></div>
    </section>

    <section className="action section dark">
      <div className="kicker light center">FROM INSIGHT TO ACTION</div>
      <h2 className="centerText">Knowing the gap is only the beginning.<br/><span>Clarity → Action → Progress</span></h2>
      <div className="actionTable">
        <div className="thead"><b>WHAT TO DO</b><b>PRIORITY</b><b>WHEN</b><b>EXPECTED OUTCOME</b></div>
        {[["Portfolio Optimization","High","0–3 months","Better risk-adjusted structure"],["Investment Requirements","High","0–3 months","Address goal-funding gaps"],["Protection Review","High","0–3 months","Adequate family cover"],["Asset Allocation","Medium","3–6 months","Balanced portfolio"],["Goal Prioritization","Medium","3–6 months","Focus on key goals"],["Future Cash-Flow Plan","Medium","6–12 months","Stay on long-term track"]].map(r=><div className="trow" key={r[0]}>{r.map(c=><span key={c}>{c}</span>)}</div>)}
      </div>
    </section>

    <section id="for-whom" className="audience section">
      <div className="kicker center">WHO IS IT FOR?</div>
      <h2 className="centerText">Different lives. Different responsibilities. Different dreams.</h2>
      <div className="audienceGrid">{["Doctors","Defence Personnel","Bankers & Professionals","Business Owners","Families","HNIs","Pre-Retirees","Retirees"].map((x)=><div key={x}><b>{x}</b></div>)}</div>
      <p className="signature">One important question: <b>Are you financially on course?</b></p>
    </section>

    <section id="stories" className="stories section soft">
      <div className="kicker center">REAL PEOPLE. REAL EXPERIENCES.</div>
      <h2 className="centerText">Hear it from the people who have <span className="goldText">experienced the journey.</span></h2>
      <div className="videoGrid">
        {videos.map(([name,type,id])=><a key={id} className="videoCard" href={`https://youtu.be/${id}`} target="_blank" rel="noreferrer"><div className="thumb"><img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={`${name} testimonial video thumbnail`}/><span><Play/></span></div><h3>{name}</h3><p>{type}</p></a>)}
      </div>
      <div className="storiesCta"><a className="secondaryBtn" href={YOUTUBE} target="_blank" rel="noreferrer">Watch More Client Stories <ExternalLink/></a></div>
      <h3 className="reviewTitle">What clients say on Google</h3>
      <div className="reviewGrid">{["review-haresh.png","review-himmat.png","review-meenakshi.png"].map((x,i)=><a key={x} href={MAPS} target="_blank" rel="noreferrer"><img src={`/assets/${x}`} alt={`Google review ${i+1}`}/></a>)}</div>
    </section>

    <section className="different section">
      <div className="kicker center">HOW IS IT DIFFERENT?</div>
      <h2 className="centerText">Start with your <span className="goldText">life.</span> Then design the money around it.</h2>
      <div className="differentGrid">
        <div><small>TRADITIONAL STARTING POINT</small><h3>Product-Centric</h3><p>Products → Investments → Returns → Hopefully Goals</p></div>
        <div className="vs">VS</div>
        <div className="featured"><small>FINANCIAL HOROSCOPE™</small><h3>Life-Centric</h3><p>YOU → Aspirations → Numbers → Gaps → Roadmap → Action → Review</p></div>
      </div>
      <blockquote>Financial Horoscope™ doesn’t begin with a financial product.<span>It begins with your life.</span></blockquote>
    </section>

    <section id="about" className="about section dark">
      <div className="kicker light center">THE PEOPLE BEHIND THE ROADMAP</div>
      <h2 className="centerText">Experience. Planning. <span>Human understanding.</span></h2>
      <div className="teamGrid">{team.map(([name,role,cred,img])=><article key={name}><div className="teamPhoto"><img src={img} alt={name}/></div><h3>{name}</h3><b>{role}</b><p>{cred}</p></article>)}</div>
      <div className="trustStrip"><b>Trusted Financial Services Since 2009</b><span>Among Haryana’s Top 3</span><span>₹300+ Cr AUM</span><span>1,000+ Families</span><span>Serving Clients Across India</span></div>
      <p className="specialism">Portfolio Management Specialists | MF • SIF • PMS • AIF | Financial Horoscope™</p>
    </section>

    <section id="faq" className="faq section">
      <div><div className="kicker">FAQ & TRUST</div><h2>Before you <span className="goldText">begin.</span></h2><p>Clear answers to the questions people naturally ask before starting their Financial Horoscope™.</p></div>
      <div className="faqList">{faq.map(([q,a])=><details key={q}><summary>{q}<ChevronDown/></summary><p>{a}</p></details>)}</div>
    </section>

    <section className="final section dark">
      <div className="finalCompass"><Compass/></div>
      <div className="kicker light center">YOUR DESTINATION</div>
      <h2>You Have Only One Financial Life.<span>Don’t Navigate It Blindly.</span></h2>
      <div className="finalPoints"><span><BadgeCheck/>Know where you are.</span><span><BadgeCheck/>Know where you want to go.</span><span><BadgeCheck/>Know what needs to change.</span></div>
      <a className="primary large" href={QUICK_SCAN}>Discover My Financial Horoscope™ <ArrowRight/></a>
      <p className="finalSign">Your Dreams. Our Expertise. A Clearer Tomorrow.</p>
    </section>

    <footer>
      <div className="footerGrid">
        <div><a className="brand footerBrand" href="#home"><Compass/><span><b>FINANCIAL HOROSCOPE™</b><small>A ROADMAP FOR YOUR WEALTH JOURNEY</small></span><em>360</em></a><p>Trusted Financial Services Since 2009</p></div>
        <div><h4>Explore</h4><a href="#why">Why</a><a href="#how">How It Works</a><a href="#for-whom">For Whom</a><a href="#stories">Real Stories</a><a href="#about">About</a></div>
        <div><h4>Contact</h4><a href="tel:+918607777320"><Phone/>8607777320</a><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle/>WhatsApp Us</a><a href="mailto:helpdesk@myshubhnivesh.com"><Mail/>helpdesk@myshubhnivesh.com</a><a href={MAPS} target="_blank" rel="noreferrer"><MapPin/>282, 2nd Floor, Sector 9-11, Hisar, Haryana - 125005</a></div>
        <div><h4>Connect</h4><div className="social"><a href={YOUTUBE} target="_blank" rel="noreferrer"><Youtube/></a><a href={FACEBOOK} target="_blank" rel="noreferrer"><Facebook/></a><a href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin/></a></div><a className="footerLogin" href={CLIENT_LOGIN} target="_blank" rel="noreferrer">Client Login <ExternalLink/></a></div>
      </div>
      <div className="disclaimer"><p>Important: Financial Horoscope™ is a financial planning and diagnostic concept and is not astrology or a guarantee of future outcomes. Future values, inflation and expected-return assumptions are estimates used for planning. Actual investment outcomes can vary and investments are subject to market and other risks. Individual suitability, tax and regulatory circumstances should be considered before acting.</p></div>
      <div className="copyright"><span>© 2026 My Shubh Nivesh. All rights reserved.</span><span>Privacy Policy &nbsp; | &nbsp; Terms & Conditions &nbsp; | &nbsp; Disclaimer</span><b>Your Vision, Our Mission.</b></div>
    </footer>
  </main>
}
