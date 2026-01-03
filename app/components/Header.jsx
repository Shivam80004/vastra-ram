import { Suspense } from 'react';
import { Await, NavLink, useAsyncValue } from 'react-router';
import { useAnalytics, useOptimisticCart } from '@shopify/hydrogen';
import { useAside } from '~/components/Aside';

/**
 * @param {HeaderProps}
 */
export function Header({ header, isLoggedIn, cart, publicStoreDomain }) {
  const { shop, menu } = header;

  return (
    <header className="modern-header">
      <div className="header-container">
        {/* Logo */}
        <NavLink prefetch="intent" to="/" className="header-logo" end>
          <img
            src="https://cdn.shopify.com/s/files/1/0744/6108/5884/files/logo-main.png?v=1767261493"
            alt={shop.name}
            className="logo-image"
          />
        </NavLink>

        {/* Desktop Navigation */}
        <HeaderMenu
          menu={menu}
          viewport="desktop"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />

        {/* Header Actions */}
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </div>

      <style>{`
        .modern-header {
          position: sticky;
          top: 0;
          width: 100%;
          background: #fffcf1;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
          z-index: 1000;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.20rem 2rem;
          gap: 2rem;
        }

        .header-logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          transition: opacity 0.3s ease;
        }

        .logo-image {
          height: 65px;
          width: auto;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 0.75rem 1rem;
          }

          .logo-image {
            height: 38px;
          }

          .modern-header.scrolled .logo-image {
            height: 35px;
          }
        }
      `}</style>
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 * }}
 */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}) {
  const className = `header-menu-${viewport}`;
  const { close } = useAside();

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          // style={activeLinkStyle}
          to="/"
          className="mobile-nav-link"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className={viewport === 'mobile' ? 'mobile-nav-link' : 'desktop-nav-link'}
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            // style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}

      <style>{`
        .header-menu-desktop {
          display: none;
          align-items: center;
          gap: 2.5rem;
          font-family: sans-serif, serif;
        }

        @media (min-width: 768px) {
          .header-menu-desktop {
            display: flex;
          }
        }

        .header-menu-desktop a{
          text-decoration: none;
           font-family: sans-serif !important;
        }

        .header-menu-desktop a:hover{
          text-decoration: none;
          color: #000;
          opacity: 0.7;
        }

        .desktop-nav-link {
          position: relative;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: #1a1a1a;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .desktop-nav-link:hover {
          color: #000;
        }

        .header-menu-mobile {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-family: var(--font-agatho), serif;
        }

        .mobile-nav-link {
          padding: 1rem;
          font-size: 1rem;
          font-weight: 500;
          color: #1a1a1a;
          text-decoration: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .mobile-nav-link:hover {
          background: rgba(0, 0, 0, 0.02);
          padding-left: 1.5rem;
        }
      `}</style>
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({ isLoggedIn, cart }) {
  return (
    <nav className="header-ctas-modern" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" className="cta-link">
        <Suspense fallback={<UserIcon />}>
          <Await resolve={isLoggedIn} errorElement={<UserIcon />}>
            {(isLoggedIn) => (
              <div className="cta-item">
                <UserIcon />
                {/* <span className="cta-text">{isLoggedIn ? 'Account' : 'Sign in'}</span> */}
              </div>
            )}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />

      <style>{`
        .header-ctas-modern {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          font-family: var(--font-agatho), serif;
        }

        .cta-link {
          text-decoration: none;
          color: #1a1a1a;
          transition: opacity 0.3s ease;
        }

        .cta-link:hover {
          opacity: 0.7;
        }

        .cta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cta-text {
          font-size: 1.4rem;
          font-weight: 500;
          // font-family: sans-serif;
          letter-spacing: 0.02em;
          color: #7a5800;
        }

        @media (max-width: 768px) {
          .cta-text {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const { open } = useAside();
  return (
    <button
      className="mobile-toggle-btn"
      onClick={() => open('mobile')}
      aria-label="Open menu"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <style>{`
        .mobile-toggle-btn {
          display: none;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          color: #1a1a1a;
          transition: opacity 0.3s ease;
        }

        .mobile-toggle-btn:hover {
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .mobile-toggle-btn {
            display: flex;
          }
        }
      `}</style>
    </button>
  );
}

function SearchToggle() {
  const { open } = useAside();
  return (
    <button
      className="icon-btn"
      onClick={() => open('search')}
      aria-label="Search"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>

      <style>{`
        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          color: #1a1a1a;
          transition: opacity 0.3s ease;
        }

        .icon-btn:hover {
          opacity: 0.7;
        }
      `}</style>
    </button>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/**
 * @param {{count: number | null}}
 */
function CartBadge({ count }) {
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();

  return (
    <button
      className="cart-badge-btn"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
      aria-label={`Cart with ${count || 0} items`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {count !== null && count > 0 && (
        <span className="cart-count">{count}</span>
      )}

      <style>{`
        .cart-badge-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          color: #1a1a1a;
          transition: opacity 0.3s ease;
        }

        .cart-badge-btn:hover {
          opacity: 0.7;
        }

        .cart-count {
          position: absolute;
          top: 0;
          right: 0;
          min-width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1a1a1a;
          color: white;
          border-radius: 50%;
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0 4px;
        }
      `}</style>
    </button>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({ cart }) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({ isActive, isPending }) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? '#888' : '#1a1a1a',
  };
}

/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */

/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
