import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-5xl font-extralight tracking-widest text-gray-900">
              Siyuan Song
            </h1>
            <div className="mt-3 flex items-center gap-4">
              <div className="h-px w-12 bg-gray-300"></div>
              <span className="text-2xl tracking-[0.3em] text-gray-400 font-light">
                宋思源
              </span>
            </div>
          </div>
          <nav className="flex gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors ${
                  isActive
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              Background
            </NavLink>
            <NavLink
              to="/journey"
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors ${
                  isActive
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              Journey to Performance Engineer
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <Outlet />
      </main>
    </div>
  );
}
