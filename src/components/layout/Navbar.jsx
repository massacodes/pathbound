import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const navigation = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/about", label: "About Us" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const linkClassName = ({ isActive }) =>
    `text-base font-semibold transition-colors duration-200 ${
      isActive
        ? "text-primary font-bold border-b-2 border-primary pb-0.5"
        : "hover:text-ink"
    }`;

  const mobileLinkClassName = ({ isActive }) =>
    `rounded-2xl px-4 py-3 text-base font-semibold transition-colors duration-200 ${
      isActive
        ? "bg-primary text-accent"
        : "text-slate-700 hover:bg-primary/10 hover:text-primary"
    }`;

  return (
    <>
      <nav className="fixed z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="cursor-pointer text-2xl font-black tracking-tighter text-primary">
            PathBound
          </div>

          <div className="hidden items-center gap-8 font-medium text-slate-600 md:flex">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClassName}>
                {item.label}
              </NavLink>
            ))}
            <button className="rounded-full bg-primary px-6 py-2.5 text-accent transition-all hover:bg-[#053629]">
              Book a Trip
            </button>
          </div>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-primary shadow-sm transition-colors hover:bg-primary/5 md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="sr-only">Toggle navigation menu</span>
            <svg
              className={`h-5 w-5 transition-transform duration-300 ${
                isMenuOpen ? "rotate-90" : "rotate-0"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {isMenuOpen ? (
                <path d="M6 6L18 18M6 18L18 6" />
              ) : (
                <path d="M4 7H20M4 12H20M4 17H20" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-ink/35 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          className={`absolute right-4 top-24 w-[min(24rem,calc(100%-2rem))] rounded-3xl border border-slate-100 bg-white p-5 shadow-2xl transition-all duration-300 ${
            isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Menu
            </span>
            <button
              type="button"
              className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Close
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={mobileLinkClassName}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <button className="mt-2 rounded-2xl bg-primary px-5 py-3 text-base font-semibold text-accent transition-colors hover:bg-[#053629]">
              Book a Trip
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
