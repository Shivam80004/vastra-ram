import { Link } from 'react-router';
import { Image } from '@shopify/hydrogen';
import type { Image as ImageType } from '@shopify/hydrogen/storefront-api-types';

interface Collection {
    id: string;
    handle: string;
    title: string;
    image?: ImageType;
}

interface FeaturedCollectionProps {
    collections: Collection[];
}

export function FeaturedCollection({ collections }: FeaturedCollectionProps) {
    return (
        <section className="featured-collections">
            <div className="grid">
                {collections.map((collection) => (
                    <Link
                        key={collection.id}
                        to={`/collections/${collection.handle}`}
                        className="collection-card"
                    >
                        {collection.image && (
                            <Image
                                data={collection.image}
                                alt={collection.title}
                                sizes="(min-width: 45em) 20vw, 50vw"
                            />
                        )}
                        <h3>{collection.title}</h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}
