import { Suspense } from 'react';
import { Await, NavLink } from 'react-router';

/**
 * @param {FooterProps}
 */
export function Footer({ footer: footerPromise, header, publicStoreDomain }) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="modern-footer">
            <div className="footer-container">
              {/* Footer Top Section */}
              <div className="footer-top">
                {/* Brand Section */}
                <div className="footer-brand">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0744/6108/5884/files/logo-main.png?v=1767261493"
                    alt={header.shop.name}
                    className="footer-logo"
                  />
                  <p className="footer-tagline">
                    Discover timeless elegance and quality craftsmanship
                  </p>

                  {/* Social Links */}
                  <div className="social-links">
                    <a href="#" aria-label="Facebook" className="social-link">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a href="#" aria-label="Instagram" className="social-link">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a href="#" aria-label="Twitter" className="social-link">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                  <h3 className="footer-heading">Quick Links</h3>
                  <ul className="footer-links">
                    <li><NavLink to="/collections" prefetch="intent">Shop All</NavLink></li>
                    <li><NavLink to="/pages/about" prefetch="intent">About Us</NavLink></li>
                    <li><NavLink to="/pages/contact" prefetch="intent">Contact</NavLink></li>
                    <li><NavLink to="/blogs/journal" prefetch="intent">Blog</NavLink></li>
                  </ul>
                </div>

                {/* Customer Service */}
                <div className="footer-section">
                  <h3 className="footer-heading">Customer Service</h3>
                  <ul className="footer-links">
                    <li><NavLink to="/account" prefetch="intent">My Account</NavLink></li>
                    <li><NavLink to="/pages/shipping" prefetch="intent">Shipping Info</NavLink></li>
                    <li><NavLink to="/pages/returns" prefetch="intent">Returns</NavLink></li>
                    <li><NavLink to="/pages/faq" prefetch="intent">FAQ</NavLink></li>
                  </ul>
                </div>

                {/* Policy Links */}
                {footer?.menu && header.shop.primaryDomain?.url && (
                  <div className="footer-section">
                    <h3 className="footer-heading">Legal</h3>
                    <FooterMenu
                      menu={footer.menu}
                      primaryDomainUrl={header.shop.primaryDomain.url}
                      publicStoreDomain={publicStoreDomain}
                    />
                  </div>
                )}
              </div>

              {/* Footer Bottom */}
              <div className="footer-bottom">
                <p className="copyright">
                  © {new Date().getFullYear()} {header.shop.name}. All rights reserved.
                </p>
                <div className="payment-methods">
                  <span className="payment-text">We accept:</span>
                  <div className="payment-icons">
                    <svg width="38" height="24" viewBox="0 0 38 24" fill="none" className="payment-icon">
                      <rect width="38" height="24" rx="3" fill="#1434CB" />
                      <text x="19" y="16" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">VISA</text>
                    </svg>
                    <svg width="38" height="24" viewBox="0 0 38 24" fill="none" className="payment-icon">
                      <rect width="38" height="24" rx="3" fill="#EB001B" />
                      <circle cx="14" cy="12" r="7" fill="#FF5F00" />
                      <circle cx="24" cy="12" r="7" fill="#F79E1B" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <style>{`
              .modern-footer {
                background: #1a1a1a;
                color: #e5e5e5;
                font-family: var(--font-agatho), serif;
                margin-top: auto;
                padding: 3rem 0 1.5rem;
              }

              .footer-container {
                max-width: 1400px;
                margin: 0 auto;
                padding: 0 2rem;
              }

              .footer-top {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr 1fr;
                gap: 3rem;
                padding-bottom: 2.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
              }

              @media (max-width: 1024px) {
                .footer-top {
                  grid-template-columns: 1fr 1fr;
                  gap: 2.5rem;
                }
              }

              @media (max-width: 640px) {
                .footer-top {
                  grid-template-columns: 1fr;
                  gap: 2rem;
                }

                .footer-container {
                  padding: 0 1rem;
                }
              }

              .footer-brand {
                display: flex;
                flex-direction: column;
                gap: 1rem;
              }

              .footer-logo {
                height: 50px;
                width: auto;
                object-fit: contain;
                align-self: flex-start;
                filter: brightness(0) invert(1);
              }

              .footer-tagline {
                font-size: 0.95rem;
                line-height: 1.6;
                color: #b0b0b0;
                max-width: 280px;
                margin: 0;
              }

              .social-links {
                display: flex;
                gap: 1rem;
                margin-top: 0.5rem;
              }

              .social-link {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.05);
                color: #e5e5e5;
                transition: all 0.3s ease;
                text-decoration: none;
              }

              .social-link:hover {
                background: rgba(255, 255, 255, 0.15);
                transform: translateY(-2px);
              }

              .footer-section {
                display: flex;
                flex-direction: column;
                gap: 1rem;
              }

              .footer-heading {
                font-size: 1.1rem;
                font-weight: 600;
                color: #fff;
                margin: 0;
                letter-spacing: 0.02em;
              }

              .footer-links {
                list-style: none;
                padding: 0;
                margin: 0;
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
              }

              .footer-links li {
                margin: 0;
              }

              .footer-links a {
                color: #b0b0b0;
                text-decoration: none;
                font-size: 0.95rem;
                transition: all 0.3s ease;
                display: inline-block;
              }

              .footer-links a:hover {
                color: #fff;
                transform: translateX(4px);
              }

              .footer-bottom {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 2rem;
                gap: 1.5rem;
              }

              @media (max-width: 640px) {
                .footer-bottom {
                  flex-direction: column;
                  text-align: center;
                  gap: 1.5rem;
                }
              }

              .copyright {
                font-size: 0.875rem;
                color: #888;
                margin: 0;
              }

              .payment-methods {
                display: flex;
                align-items: center;
                gap: 1rem;
              }

              .payment-text {
                font-size: 0.875rem;
                color: #888;
              }

              .payment-icons {
                display: flex;
                gap: 0.5rem;
                align-items: center;
              }

              .payment-icon {
                opacity: 0.7;
                transition: opacity 0.3s ease;
              }

              .payment-icon:hover {
                opacity: 1;
              }

              @media (max-width: 640px) {
                .payment-methods {
                  flex-direction: column;
                  gap: 0.75rem;
                }
              }
            `}</style>
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

/**
 * @param {{
 *   menu: FooterQuery['menu'];
 *   primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
 *   publicStoreDomain: string;
 * }}
 */
function FooterMenu({ menu, primaryDomainUrl, publicStoreDomain }) {
  return (
    <ul className="footer-links" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return (
          <li key={item.id}>
            {isExternal ? (
              <a href={url} rel="noopener noreferrer" target="_blank">
                {item.title}
              </a>
            ) : (
              <NavLink
                end
                prefetch="intent"
                to={url}
              >
                {item.title}
              </NavLink>
            )}
          </li>
        );
      })}
    </ul>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

/**
 * @typedef {Object} FooterProps
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {string} publicStoreDomain
 */

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
