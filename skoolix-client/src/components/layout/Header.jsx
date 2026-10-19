import {useEffect, useRef, useState} from "react";
import {Bell, Building2, ChevronDown, LogOut, Menu, Moon, Sun} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "@/store/authStore";
import {useThemeStore} from "@/store/themeStore";

/**
 * @param {string} title        Page title shown on the left
 * @param {function} [onMenuClick]  Optional. When given, a menu button appears on
 *                                  small screens so the sidebar can be opened.
 */
export default function Header({title, onMenuClick}) {
   const {user, logout} = useAuthStore();
   const theme = useThemeStore((s) => s.theme);
   const toggleTheme = useThemeStore((s) => s.toggle);
   const navigate = useNavigate();

   const [open, setOpen] = useState(false);
   const menuRef = useRef(null);

   // Close the user menu on outside click or Escape
   useEffect(() => {
      if (!open) return;
      const onDown = (e) => {
         if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
      };
      const onKey = (e) => e.key === "Escape" && setOpen(false);
      document.addEventListener("mousedown", onDown);
      document.addEventListener("keydown", onKey);
      return () => {
         document.removeEventListener("mousedown", onDown);
         document.removeEventListener("keydown", onKey);
      };
   }, [open]);

   const handleLogout = () => {
      setOpen(false);
      logout();
      navigate("/login");
   };

   const displayName = user?.firstName
       ? `${user.firstName} ${user.lastName ?? ""}`.trim()
       : "Admin";
   const roleLabel = (user?.role ?? "ADMIN").replace(/_/g, " ").toLowerCase();
   const initials =
       `${user?.firstName?.[0] ?? "A"}${user?.lastName?.[0] ?? ""}`.toUpperCase();
   const isDark = theme === "dark";

   return (
       <header className="header">
          <div className="header-left">
             {onMenuClick && (
                 <button
                     type="button"
                     className="header-icon-btn header-menu-btn"
                     onClick={onMenuClick}
                     aria-label="Open navigation"
                 >
                    <Menu size={20}/>
                 </button>
             )}
             <h1 className="header-title">{title}</h1>
          </div>

          <div className="header-right">
             {user?.schoolId && (
                 <span className="header-school-badge">
                  <Building2 size={14}/> School #{user.schoolId}
               </span>
             )}

             <button
                 type="button"
                 className="header-icon-btn"
                 onClick={toggleTheme}
                 aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                 title={isDark ? "Light theme" : "Dark theme"}
             >
                {isDark ? <Sun size={20}/> : <Moon size={20}/>}
             </button>

             <button
                 type="button"
                 className="header-icon-btn"
                 aria-label="Notifications"
                 title="Notifications"
             >
                <Bell size={20}/>
                <span className="header-notif-dot"/>
             </button>

             <div className="header-user" ref={menuRef}>
                <button
                    type="button"
                    className="header-user-btn"
                    onClick={() => setOpen((o) => !o)}
                    aria-haspopup="menu"
                    aria-expanded={open}
                >
                   <span className="header-avatar">{initials}</span>
                   <span className="header-user-info">
                     <span className="header-user-name">{displayName}</span>
                     <span className="header-user-role">{roleLabel}</span>
                  </span>
                   <ChevronDown size={16} className={`header-chevron ${open ? "open" : ""}`}/>
                </button>

                {open && (
                    <div className="header-dropdown" role="menu">
                       <div className="header-dropdown-top">
                          <span className="header-avatar header-avatar--lg">{initials}</span>
                          <div className="header-dropdown-id">
                             <span className="header-dropdown-name">{displayName}</span>
                             <span className="header-dropdown-role">{roleLabel}</span>
                             {user?.schoolId && (
                                 <span className="header-dropdown-school">School #{user.schoolId}</span>
                             )}
                          </div>
                       </div>
                       <button
                           type="button"
                           role="menuitem"
                           className="header-dropdown-item header-dropdown-item--danger"
                           onClick={handleLogout}
                       >
                          <LogOut size={18}/> Sign out
                       </button>
                    </div>
                )}
             </div>
          </div>
       </header>
   );
}