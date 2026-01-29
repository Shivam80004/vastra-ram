import { Await, useLoaderData } from 'react-router';
import { Suspense } from 'react';

import { HeroBanner } from '~/components/home/HeroBanner';
import { FeaturedCollection } from '~/components/home/FeaturedCollection';
import { ImageSlider } from '~/components/home/ImageSlider';
import { Testimonials } from '~/components/home/Testimonials';
import { VideoSlider } from '~/components/home/VideoSlider';
import { ProductItem } from '~/components/ProductItem';
import LongBanner from '~/components/home/LongBanner';
import { ShopTheOccasion } from '~/components/home/ShopTheOccasion';
import { RecommendedProducts } from '~/components/home/RecommendedProducts';
import { TrustBadge } from '~/components/home/TrustBadge';


/* ----------------------------- META ----------------------------- */

export const meta = () => [{ title: 'Home' }];

/* ---------------------------- LOADER ---------------------------- */

export async function loader({ context }) {
  const critical = await loadCriticalData({ context });
  const deferred = loadDeferredData({ context });
  return { ...critical, ...deferred };
}

/* ----------------------- CRITICAL DATA -------------------------- */

async function loadCriticalData({ context }) {
  const data = await context.storefront.query(HOME_PAGE_QUERY, {
    variables: {
      handle: {
        type: 'home_page',
        handle: 'home-page',
      },
    },
  });

  const metaobject = data?.metaobject;

  const homePageData = metaobject
    ? normalizeHomePage(metaobject)
    : EMPTY_HOME_DATA;
  return { homePageData };
}

/* ----------------------- DEFERRED DATA -------------------------- */

function loadDeferredData({ context }) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch(() => null);

  return { recommendedProducts };
}

/* ---------------------------- PAGE ------------------------------ */

export default function Homepage() {
  const { homePageData, recommendedProducts } = useLoaderData();

  const {
    heroBanners,
    featuredCollections,
    shopTheOccasion,
    imageSlider,
    testimonials,
    videoSlider,
  } = homePageData;

  return (
    <div className="home">
      {heroBanners.length > 0 && <HeroBanner banners={heroBanners} />}

      {featuredCollections.length > 0 && (
        <FeaturedCollection collections={featuredCollections} />
      )}

      <LongBanner />

      {shopTheOccasion.length > 0 && (
        <ShopTheOccasion collections={shopTheOccasion} />
      )}

      {/* {imageSlider.length > 0 && <ImageSlider images={imageSlider} />} */}

      {testimonials.length > 0 && (
        <Testimonials testimonials={testimonials} />
      )}

      {/* <VideoSlider videos={videoSlider} /> */}

      <TrustBadge />

      <RecommendedProducts products={recommendedProducts} />
    </div>
  );
}



/* ---------------------- NORMALIZATION --------------------------- */

function normalizeHomePage(metaobject) {
  const data = { ...EMPTY_HOME_DATA };

  metaobject.fields.forEach((field) => {
    const nodes = field.references?.nodes ?? [];

    // 🔹 FEATURED COLLECTIONS
    if (field.key === 'featured_collection') {
      data.featuredCollections = nodes;
      return;
    }

    // 🔹 SHOP THE OCCASION
    if (field.key === 'shop_the_occasion') {
      data.shopTheOccasion = nodes;
      return;
    }

    // 🔹 HERO BANNERS (metaobject)
    if (field.key === 'hero_banners') {
      data.heroBanners = nodes.map(parseMetaobject);
      return;
    }

    // 🔹 TESTIMONIALS (metaobject)
    if (field.key === 'testimonials') {
      data.testimonials = nodes.map(parseMetaobject);
      return;
    }

    // 🔹 MEDIA SECTIONS (image_slider, video_slider)
    data[toCamel(field.key)] = normalizeMedia(nodes);
  });

  return data;
}

function parseMetaobject(node) {
  const obj = {};

  node.fields.forEach((field) => {
    // Image field
    if (field.reference?.image?.url) {
      obj[field.key] = {
        url: field.reference.image.url,
        alt: field.reference.image.altText || '',
        width: field.reference.image.width,
        height: field.reference.image.height,
      };
    } else {
      obj[field.key] = field.value;
    }
  });

  return obj;
}

function normalizeMedia(nodes = []) {
  return nodes
    .map((node, index) => {
      // Image
      if (node.image?.url) {
        return {
          id: `media-image-${index}`,
          type: 'image',
          url: node.image.url,
          alt: node.image.altText || '',
          width: node.image.width,
          height: node.image.height,
        };
      }

      // Video
      if (node.sources?.[0]?.url) {
        return {
          id: `media-video-${index}`,
          type: 'video',
          url: node.sources[0].url,
          poster: node.previewImage?.url || '',
        };
      }

      return null;
    })
    .filter(Boolean);
}

function toCamel(str) {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

/* ----------------------- EMPTY FALLBACK ------------------------- */

const EMPTY_HOME_DATA = {
  heroBanners: [],
  featuredCollections: [],
  shopTheOccasion: [],
  imageSlider: [],
  testimonials: [],
  videoSlider: [],
};

/* ---------------------------- QUERIES --------------------------- */

const HOME_PAGE_QUERY = `#graphql
query HomePage($handle: MetaobjectHandleInput!) {
  metaobject(handle: $handle) {
    fields {
      key
      references(first: 20) {
        nodes {
          __typename

          ... on Metaobject {
            id
            type
            fields {
              key
              value
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                    width
                    height
                  }
                }
              }
            }
          }

          ... on Collection {
            id
            title
            handle
            image {
              url
              altText
              width
              height
            }
          }

          ... on MediaImage {
            image {
              url
              altText
              width
              height
            }
          }

          ... on Video {
            sources {
              url
              mimeType
            }
            previewImage {
              url
            }
          }
        }
      }
    }
  }
}
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
query RecommendedProducts {
  products(first: 4, sortKey: UPDATED_AT, reverse: true) {
    nodes {
      id
      title
      handle
      featuredImage {
        url
        altText
        width
        height
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
}
`;
