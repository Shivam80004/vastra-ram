import { redirect, useLoaderData } from 'react-router';
import { getPaginationVariables, Analytics } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { ProductCard } from '~/components/ProductCard';
import { Image } from '@shopify/hydrogen';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return [{ title: `Hydrogen | ${data?.collection.title ?? ''} Collection` }];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({ context, params, request }) {
  const { handle } = params;
  const { storefront } = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  const [{ collection }] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: { handle, ...paginationVariables },
      // Add other queries here, so that they are loaded in parallel
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, { handle, data: collection });

  return {
    collection,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({ context }) {
  return {};
}

export default function Collection() {
  /** @type {LoaderReturnData} */
  const { collection } = useLoaderData();
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Hero content animation
      gsap.from('.collection-hero-content > *', {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power4.out',
      });

      // Staggered product cards entrance
      ScrollTrigger.batch('.collection-product-card', {
        onEnter: (elements) => {
          gsap.fromTo(elements,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 1,
              ease: 'power3.out',
              overwrite: true
            }
          );
        },
        once: true
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="collection-page bg-[#FFFCF7] min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
        {collection.image && (
          <div className="absolute inset-0 z-0">
            <Image
              data={collection.image}
              aspectRatio="16/9"
              sizes="100vw"
              className="w-full h-full object-cover opacity-60 scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-[#FFFCF7]"></div>
          </div>
        )}

        <div ref={headerRef} className="collection-hero-content relative z-10 text-center px-4 max-w-4xl">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#D4AF37]"></div>
            <span className="text-[#D4AF37] text-sm md:text-base font-bold tracking-[0.3em] uppercase">The Collection</span>
            <div className="h-px w-12 bg-[#D4AF37]"></div>
          </div>
          <h1 className="text-5xl md:text-8xl font-agatho text-white mb-8 tracking-tight drop-shadow-2xl uppercase">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto italic">
              {collection.description}
            </p>
          )}
        </div>
      </section>

      {/* Main Grid Section */}
      <main className="container-global mx-auto py-16 md:py-24 px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-[#D4AF37]/20 pb-8">
          <div>
            <h2 className="text-[#2A2A2A] text-2xl md:text-3xl">Curated Masterpieces</h2>
            <p className="text-[#642826]/70 mt-2 font-medium tracking-wide">Showing 1 - {collection.products.nodes.length} of products</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Simplified sort/filter placeholder for UI feel */}
            <button className="px-6 py-2.5 bg-white border border-[#D4AF37]/30 text-[#2A2A2A] text-sm font-medium rounded-full hover:border-[#D4AF37] transition-all">Sort By</button>
          </div>
        </div>

        <PaginatedResourceSection
          connection={collection.products}
          resourcesClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 mb-24"
        >
          {({ node: product, index }) => (
            <div className="collection-product-card opacity-0">
              <ProductCard
                key={product.id}
                product={product}
                className=""
              />
            </div>
          )}
        </PaginatedResourceSection>
      </main>

      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />

      <style>{`
        .font-agatho { font-family: 'Agatho', serif; }
        .collection-product-card .product-card-image-wrap {
            border-radius: 40px 40px 10px 10px;
        }
      `}</style>
    </div>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
        price {
          ...MoneyProductItem
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
`;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        id
        url
        altText
        width
        height
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`;

/** @typedef {import('./+types/collections.$handle').Route} Route */
/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
