import { useState } from 'react';

/**
 * @param {{
 *   details: {
 *     fabric?: { value: string };
 *     fit?: { value: string };
 *     embroidery?: { value: string };
 *     occasion?: { value: string };
 *     care_instructions?: { value: string };
 *   };
 * }}
 */
export function ProductCraftDetails({ details }) {
    const [isOpen, setIsOpen] = useState(true);

    if (!details) return null;

    const rows = [
        ['Fabric', details.fabric?.value],
        ['Fit', details.fit?.value],
        ['Embroidery', details.embroidery?.value],
        ['Occasion', details.occasion?.value],
        ['Care Instructions', details.care_instructions?.value],
    ];

    const hasData = rows.some(([_, value]) => !!value);
    if (!hasData) return null;

    return (
        <section className="bg-white border-t border-neutral-100">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center py-8 px-6 group"
                >
                    <h2 className="font-agatho text-2xl text-neutral-900 group-hover:text-neutral-600 transition-colors">
                        Product Details
                    </h2>
                    <span className="text-2xl font-light text-neutral-400">
                        {isOpen ? '−' : '+'}
                    </span>
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 mb-12' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        {rows.map(([label, value]) => (
                            value && (
                                <div key={label} className="flex justify-between items-start border-b border-neutral-50 py-4 last:border-0 md:last:border-b">
                                    <span className="text-neutral-400 uppercase tracking-widest text-[10px] font-bold py-1">{label}</span>
                                    <span className="text-neutral-800 max-w-[65%] text-right font-light text-base leading-relaxed">
                                        {value}
                                    </span>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
