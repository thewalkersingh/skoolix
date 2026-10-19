import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
   School, Users, GraduationCap, ClipboardCheck, BookOpen,
   CreditCard, BarChart3, Mail, Phone, Check, X, Sun, Moon
} from "lucide-react";
import {useThemeStore} from "@/store/themeStore";
import "./landing.css";

const STUDENTS = [
   {id: 1, name: "Aarav Sharma", roll: "01"},
   {id: 2, name: "Diya Patil", roll: "02"},
   {id: 3, name: "Kabir Singh", roll: "03"},
   {id: 4, name: "Meera Joshi", roll: "04"},
   {id: 5, name: "Rohan Desai", roll: "05"},
   {id: 6, name: "Sana Khan", roll: "06"},
];

const STEPS = [
   {n: "1", title: "Create your school", desc: "Register your institution, then add classes, sections and subjects."},
   {n: "2", title: "Add your people", desc: "Invite teachers, enroll students and link parents to their children."},
   {n: "3", title: "Run the day", desc: "Mark attendance, issue books, collect fees and read the numbers from one dashboard."},
];

const BARS = [62, 78, 70, 88, 94, 81, 90];

function AttendanceRegister() {
   const [absent, setAbsent] = useState({3: true, 5: true});
   const toggle = (id) => setAbsent((a) => ({...a, [id]: !a[id]}));
   const absentCount = Object.values(absent).filter(Boolean).length;
   const presentCount = STUDENTS.length - absentCount;

   return (
       <div className="lp-register" aria-label="Attendance register preview">
          <div className="lp-register-head">
             <div>
                <p className="lp-register-title">Class 7-B</p>
                <p className="lp-register-meta">Morning attendance</p>
             </div>
             <div className="lp-register-count">
                <strong>{presentCount}</strong>/{STUDENTS.length} present
             </div>
          </div>
          <ul className="lp-register-list">
             {STUDENTS.map((s) => {
                const isAbsent = !!absent[s.id];
                return (
                    <li key={s.id} className="lp-register-row">
                       <span className="lp-register-roll">{s.roll}</span>
                       <span className="lp-register-name">{s.name}</span>
                       <button
                           type="button"
                           className={`lp-mark ${isAbsent ? "lp-mark--absent" : "lp-mark--present"}`}
                           onClick={() => toggle(s.id)}
                           aria-pressed={isAbsent}
                           aria-label={`${s.name}: ${isAbsent ? "absent" : "present"}. Click to change.`}
                       >
                          {isAbsent ? <X size={14}/> : <Check size={14}/>}
                          {isAbsent ? "Absent" : "Present"}
                       </button>
                    </li>
                );
             })}
          </ul>
          <p className="lp-register-foot">Tap a name to try it. Parents are notified of absences.</p>
       </div>
   );
}

export default function LandingPage() {
   const navigate = useNavigate();
   const theme = useThemeStore((s) => s.theme);
   const toggleTheme = useThemeStore((s) => s.toggle);

   return (
       <div className="lp-root" data-theme={theme}>

          {/* NAV */}
          <header className="lp-nav">
             <div className="lp-nav-inner">
                <a href="/" className="lp-brand">
                   <span className="lp-brand-icon"><School size={20}/></span>
                   <span className="lp-brand-name">Skoolix</span>
                </a>
                <nav className="lp-nav-links" aria-label="Sections">
                   <a href="#features">Features</a>
                   <a href="#how">How it works</a>
                   <a href="#contact">Contact</a>
                </nav>
                <button
                    type="button"
                    className="lp-theme-toggle"
                    onClick={toggleTheme}
                    aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                >
                   {theme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}
                </button>
                <button className="lp-btn lp-btn-quiet" onClick={() => navigate("/login")}>Sign in</button>
                <button className="lp-btn lp-btn-solid lp-nav-cta" onClick={() => navigate("/register")}>
                   Register your school
                </button>
             </div>
          </header>

          <main>
             {/* HERO */}
             <section className="lp-hero">
                <div className="lp-hero-inner">
                   <div className="lp-hero-copy">
                      <p className="lp-badge">Built for Indian schools</p>
                      <h1 className="lp-hero-title">
                         Attendance, fees and the library, finally in one place.
                      </h1>
                      <p className="lp-hero-sub">
                         Skoolix replaces the registers, spreadsheets and phone calls that
                         fill a school office. Teachers mark attendance in seconds, and
                         office staff always know who has paid.
                      </p>
                      <div className="lp-hero-actions">
                         <button className="lp-btn lp-btn-solid lp-btn-large" onClick={() => navigate("/register")}>
                            Register your school
                         </button>
                         <button className="lp-btn lp-btn-ghost lp-btn-large" onClick={() => navigate("/login")}>
                            Sign in
                         </button>
                      </div>
                      <ul className="lp-hero-points">
                         <li><Check size={16}/> Students and teachers</li>
                         <li><Check size={16}/> Fees and receipts</li>
                         <li><Check size={16}/> Exams and timetable</li>
                      </ul>
                   </div>
                   <AttendanceRegister/>
                </div>
             </section>

             {/* FEATURES */}
             <section className="lp-section" id="features">
                <div className="lp-section-inner">
                   <h2 className="lp-section-title">Everything a school office does, without the paperwork</h2>
                   <p className="lp-section-lead">
                      Six tools that share one set of records, so a change in one place shows up everywhere.
                   </p>

                   <div className="lp-bento">
                      <article className="lp-tile lp-tile--ink lp-span-4">
                         <span className="lp-tile-icon"><GraduationCap size={22}/></span>
                         <h3>Student management</h3>
                         <p>Admission to graduation: profiles, class placement, guardians and a full history for every student.</p>
                         <div className="lp-chips">
                            <span>Admissions</span><span>Profiles</span><span>Promotions</span>
                         </div>
                      </article>

                      <article className="lp-tile lp-span-2">
                         <span className="lp-tile-icon"><Users size={22}/></span>
                         <h3>Teacher management</h3>
                         <p>Staff profiles, subjects and class assignments in one list.</p>
                      </article>

                      <article className="lp-tile lp-span-2">
                         <span className="lp-tile-icon"><ClipboardCheck size={22}/></span>
                         <h3>Attendance</h3>
                         <p>Mark a whole class at once and look back by date or student.</p>
                      </article>

                      <article className="lp-tile lp-span-2">
                         <span className="lp-tile-icon"><BookOpen size={22}/></span>
                         <h3>Library</h3>
                         <p>Book stock, issues and returns, with availability visible at a glance.</p>
                      </article>

                      <article className="lp-tile lp-span-2">
                         <span className="lp-tile-icon"><CreditCard size={22}/></span>
                         <h3>Fees and finance</h3>
                         <p>Set fee structures, record payments and see what is still pending.</p>
                      </article>

                      <article className="lp-tile lp-tile--sky lp-span-6 lp-tile--wide">
                         <div className="lp-tile-text">
                            <span className="lp-tile-icon"><BarChart3 size={22}/></span>
                            <h3>A dashboard that answers the principal's questions</h3>
                            <p>Attendance rate this week, fees collected this month, classes that need attention. No exporting required.</p>
                         </div>
                         <div className="lp-bars" role="img" aria-label="Weekly attendance rate bar chart">
                            {BARS.map((h, i) => (
                                <span key={i} style={{height: `${h}%`}}/>
                            ))}
                         </div>
                      </article>
                   </div>
                </div>
             </section>

             {/* HOW IT WORKS */}
             <section className="lp-section lp-section--tint" id="how">
                <div className="lp-section-inner">
                   <h2 className="lp-section-title">Up and running in an afternoon</h2>
                   <ol className="lp-steps">
                      {STEPS.map(({n, title, desc}) => (
                          <li className="lp-step" key={n}>
                             <span className="lp-step-num">{n}</span>
                             <h3>{title}</h3>
                             <p>{desc}</p>
                          </li>
                      ))}
                   </ol>
                </div>
             </section>

             {/* CTA */}
             <section className="lp-cta">
                <div className="lp-cta-inner">
                   <h2 className="lp-cta-title">Give your office its evenings back</h2>
                   <p className="lp-cta-sub">Register your school and add your first class today.</p>
                   <div className="lp-hero-actions lp-cta-actions">
                      <button className="lp-btn lp-btn-ink lp-btn-large" onClick={() => navigate("/register")}>
                         Register your school
                      </button>
                      <button className="lp-btn lp-btn-outline-ink lp-btn-large" onClick={() => navigate("/login")}>
                         Sign in
                      </button>
                   </div>
                </div>
             </section>

             {/* CONTACT */}
             <section className="lp-section" id="contact">
                <div className="lp-section-inner lp-contact-grid">
                   <div>
                      <h2 className="lp-section-title lp-contact-title">Questions? Talk to us</h2>
                      <p className="lp-section-lead">
                         Tell us about your school and we will reply with how Skoolix can fit it.
                      </p>
                   </div>
                   <div className="lp-contact-items">
                      <a className="lp-contact-item" href="mailto:skoolix@dummy.com">
                         <Mail size={18}/><span>skoolix@dummy.com</span>
                      </a>
                      <a className="lp-contact-item" href="tel:123-2567">
                         <Phone size={18}/><span>+91 90219 77961</span>
                      </a>
                   </div>
                </div>
             </section>
          </main>

          {/* FOOTER */}
          <footer className="lp-footer">
             <div className="lp-footer-inner">
                <div className="lp-brand">
                   <span className="lp-brand-icon lp-brand-icon--sm"><School size={16}/></span>
                   <span className="lp-brand-name">Skoolix</span>
                </div>
                <p className="lp-footer-copy">© {new Date().getFullYear()} Skoolix. All rights reserved.</p>
             </div>
          </footer>
       </div>
   );
}