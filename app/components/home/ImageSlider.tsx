import { Image } from '@shopify/hydrogen';

export function ImageSlider({ images }: { images: any[] }) {
    if (!images || images.length === 0) return null;

    return (
        <div className="image-slider-section py-8 overflow-x-auto">
            <div className="flex space-x-4 pl-4 min-w-max">
                {images.map((img: any, index: number) => {
                    // Handle both raw file reference or GenericFile type
                    const imgUrl = img?.url || img?.image?.url;
                    const altText = img?.altText || `Slide ${index + 1}`;

                    if (!imgUrl) return null;

                    return (
                        <div key={img.id || index} className="slider-item w-64 h-64 flex-shrink-0 relative rounded-lg overflow-hidden">
                            <Image
                                data={img}
                                sizes="300px"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
