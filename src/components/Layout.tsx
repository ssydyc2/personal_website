import { NavLink, Outlet } from 'react-router-dom';
import geekAvatar from '../assets/avatars/geek-avatar.png';

export default function Layout() {
  return (
    <div className="min-h-screen text-[#20231f]">
      <header className="border-b border-[#958979] bg-[#fffdf7]/80">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="mb-8 flex items-center gap-4 sm:gap-5">
            <img
              src={geekAvatar}
              alt="Pixel avatar of Siyuan Song"
              className="h-20 w-20 shrink-0 object-contain [image-rendering:pixelated] sm:h-24 sm:w-24"
            />
            <div>
              <h1 className="font-serif text-4xl font-normal tracking-tight text-[#20231f] sm:text-5xl">
                Siyuan Song
              </h1>
              <div className="mt-3 flex items-center gap-4">
                <div className="h-px w-12 bg-[#958979] sm:w-14"></div>
                <span className="font-mono text-lg tracking-[0.24em] text-[#61685f] sm:text-xl">
                  宋思源
                </span>
              </div>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                  isActive
                    ? 'text-[#0f766e]'
                    : 'text-[#61685f] hover:text-[#20231f]'
                }`
              }
            >
              About Me
            </NavLink>
            <NavLink
              to="/reading-list"
              className={({ isActive }) =>
                `font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                  isActive
                    ? 'text-[#0f766e]'
                    : 'text-[#61685f] hover:text-[#20231f]'
                }`
              }
            >
              Reading List
            </NavLink>
            <NavLink
              to="/study-plans"
              className={({ isActive }) =>
                `font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                  isActive
                    ? 'text-[#0f766e]'
                    : 'text-[#61685f] hover:text-[#20231f]'
                }`
              }
            >
              Study Plans
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-12">
        <Outlet />
      </main>
    </div>
  );
}
