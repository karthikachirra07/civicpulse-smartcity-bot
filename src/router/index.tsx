import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '../types';
import { useAuth } from '../context/AuthContext';

interface RouterContextType {
  pathname: string;
  navigate: (to: string, state?: any) => void;
  params: Record<string, string>;
  state: any;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const Router: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pathname, setPathname] = useState<string>(window.location.pathname || '/');
  const [navState, setNavState] = useState<any>(null);
  const [search, setSearch] = useState<string>(window.location.search || '');

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname || '/');
      setSearch(window.location.search || '');
      setNavState(window.history.state);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string, state?: any) => {
    window.history.pushState(state || null, '', to);
    const [pathPart, searchPart] = to.split('?');
    setPathname(pathPart || '/');
    setSearch(searchPart ? `?${searchPart}` : '');
    setNavState(state);
    window.scrollTo(0, 0);
  };

  return (
    <RouterContext.Provider value={{ pathname, navigate, params: {}, state: navState }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useNavigate = () => {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useNavigate must be used within Router');
  return ctx.navigate;
};

export const useLocation = () => {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useLocation must be used within Router');
  return { pathname: ctx.pathname, state: ctx.state, search: window.location.search };
};

export const useParams = () => {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useParams must be used within Router');
  return ctx.params;
};

export const Link: React.FC<{
  to: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  onClick?: () => void;
}> = ({ to, children, className, style, title, onClick }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} style={style} title={title}>
      {children}
    </a>
  );
};

export const NavLink: React.FC<{
  to: string;
  children: React.ReactNode;
  className?: string | ((props: { isActive: boolean }) => string);
  style?: React.CSSProperties;
  title?: string;
  onClick?: () => void;
}> = ({ to, children, className, style, title, onClick }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  const resolvedClass = typeof className === 'function' ? className({ isActive }) : `${className || ''} ${isActive ? 'active' : ''}`.trim();

  return (
    <Link to={to} className={resolvedClass} style={style} title={title} onClick={onClick}>
      {children}
    </Link>
  );
};

interface RouteProps {
  path: string;
  element: React.ReactNode;
}

export const Route: React.FC<RouteProps> = () => null;

function matchPath(routePath: string, currentPath: string): { matches: boolean; params: Record<string, string> } {
  const currentPathOnly = currentPath.split('?')[0];
  if (routePath === '*' || routePath === currentPathOnly) {
    return { matches: true, params: {} };
  }

  const routeSegments = routePath.split('/').filter(Boolean);
  const pathSegments = currentPathOnly.split('/').filter(Boolean);

  if (routeSegments.length !== pathSegments.length) {
    return { matches: false, params: {} };
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < routeSegments.length; i++) {
    const routeSeg = routeSegments[i];
    const pathSeg = pathSegments[i];

    if (routeSeg.startsWith(':')) {
      const paramName = routeSeg.slice(1);
      params[paramName] = decodeURIComponent(pathSeg);
    } else if (routeSeg !== pathSeg) {
      return { matches: false, params: {} };
    }
  }

  return { matches: true, params };
}

export const Routes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ctx = useContext(RouterContext);
  if (!ctx) return null;
  const { pathname } = ctx;

  const childArray = React.Children.toArray(children) as React.ReactElement<RouteProps>[];

  let matchedElement: React.ReactNode = null;
  let matchedParams: Record<string, string> = {};

  for (const child of childArray) {
    if (!child || !child.props) continue;
    const { path, element } = child.props;
    const match = matchPath(path, pathname);

    if (match.matches) {
      matchedElement = element;
      matchedParams = match.params;
      break;
    }
  }

  if (matchedElement) {
    return (
      <RouterContext.Provider value={{ ...ctx, params: matchedParams }}>
        {matchedElement}
      </RouterContext.Provider>
    );
  }

  return <div>Page Not Found</div>;
};

// Route Protection wrapper
export const ProtectedRoute: React.FC<{
  allowedRoles?: UserRole[];
  element: React.ReactNode;
}> = ({ allowedRoles, element }) => {
  const { user, role, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4 font-sans text-[#1D2939]">
        <div className="card-base p-8 max-w-md w-full shadow-card text-center space-y-4">
          <div className="w-12 h-12 bg-[#E6F6F5] text-[#0F9D91] rounded-full flex items-center justify-center mx-auto text-xl font-bold">
            🔒
          </div>
          <h2 className="text-xl font-bold text-[#142B4A]">Authentication Required</h2>
          <p className="text-xs text-[#667085] leading-relaxed">
            Please sign in or register an account to access this municipal portal resource.
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => navigate('/login')}
              className="btn-primary w-full py-2.5 text-xs font-semibold"
            >
              Sign In to Your Account
            </button>
            <button
              onClick={() => navigate('/register')}
              className="btn-secondary w-full py-2.5 text-xs font-semibold"
            >
              Create New Citizen Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4 font-sans text-[#1D2939]">
        <div className="card-base p-8 max-w-md w-full shadow-card text-center space-y-4">
          <div className="w-12 h-12 bg-[#FEF7EC] text-[#B7791F] rounded-full flex items-center justify-center mx-auto font-bold text-xl">
            ⚠️
          </div>
          <h2 className="text-xl font-bold text-[#142B4A]">Access Restricted</h2>
          <p className="text-xs text-[#667085] leading-relaxed">
            You are logged in as <strong>{user.name}</strong> ({role.toUpperCase()}). This page requires authorized <strong>{allowedRoles.join(' or ').toUpperCase()}</strong> authority.
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => navigate(role === 'citizen' ? '/citizen/dashboard' : role === 'officer' ? '/officer/dashboard' : '/admin/dashboard')}
              className="btn-primary w-full py-2.5 text-xs"
            >
              Go to Your Dashboard
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-secondary w-full py-2.5 text-xs"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{element}</>;
};
