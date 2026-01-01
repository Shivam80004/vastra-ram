import { Image } from '@shopify/hydrogen';

interface TestimonialImage {
    url: string;
    altText?: string;
    alt?: string;
    width?: number;
    height?: number;
}

interface TestimonialData {
    id?: string;
    coustomer_name?: string; // Keeping user's typo as primary, but strictly typing it
    customer_name?: string; // Fallback
    name?: string; // Fallback
    message?: string;
    quote?: string; // Fallback
    rating?: string | number;
    image?: TestimonialImage;
    [key: string]: any;
}

export function Testimonials({ testimonials }: { testimonials: TestimonialData[] }) {
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section className="testimonials-section py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900">
                        Stories from our Community
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Hear from those who have experienced our quality firsthand.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 content-center">
                    {testimonials.map((t, index) => {
                        const name = t.coustomer_name || t.customer_name || t.name || 'Valued Customer';
                        const message = t.message || t.quote || '';
                        const rating = t.rating || 5;

                        // Image handling (fallback to placeholder if missing)
                        const imageData = t.image && t.image.url ? {
                            ...t.image,
                            altText: t.image.altText || t.image.alt || name
                        } : null;

                        return (
                            <div
                                key={t.id || index}
                                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                            >
                                {/* Quote Icon */}
                                <div className="absolute top-6 right-8 text-gray-100 group-hover:text-indigo-50 transition-colors">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                                    </svg>
                                </div>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 shrink-0 ring-2 ring-transparent group-hover:ring-indigo-500 transition-all">
                                        {imageData ? (
                                            <Image
                                                data={imageData}
                                                className="w-full h-full object-cover"
                                                sizes="56px"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xl font-bold">
                                                {name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                            {name}
                                        </h3>
                                    </div>
                                </div>

                                <blockquote className="relative z-10">
                                    <p className="text-gray-600 leading-relaxed">
                                        "{message}"
                                    </p>
                                </blockquote>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
