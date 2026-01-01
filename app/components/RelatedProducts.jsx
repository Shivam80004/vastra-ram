/**
 * @param {{
 *   product: any;
 * }}
 */
export function RelatedProducts({ product }) {
    return (
        <section className="py-20 bg-[#f6f3ee]">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="font-serif text-3xl mb-12">Complete the Look</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Placeholder products for now */}
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="aspect-[3/4] bg-neutral-200 mb-4 overflow-hidden relative">
                                <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-colors duration-500" />
                            </div>
                            <h3 className="text-sm uppercase tracking-wider text-neutral-600">Discover More</h3>
                            <p className="font-light text-neutral-900 mt-1">₹ Coming Soon</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
