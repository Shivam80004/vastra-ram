import { useState } from 'react';

/**
 * @param {{
 *   descriptionHtml: string;
 * }}
 */
export function ProductDescription({ descriptionHtml }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!descriptionHtml) return null;

    return (
        <section className="bg-white border-t border-neutral-100">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center py-8 px-6 group"
                >
                    <h2 className="font-agatho text-2xl text-neutral-900 group-hover:text-neutral-600 transition-colors">
                        Description
                    </h2>
                    <span className="text-2xl font-light text-neutral-400">
                        {isOpen ? '−' : '+'}
                    </span>
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 mb-12' : 'max-h-0 opacity-0'}`}>
                    <div
                        className="px-6 prose prose-neutral max-w-none text-neutral-600 leading-relaxed font-light text-base"
                        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                    />
                </div>
            </div>
        </section>
    );
}
