
import { ShieldCheck, Lock, HandHeart, Trophy } from 'lucide-react';

const trustValues = [
    {
        icon: <Trophy strokeWidth={1.5} size={32} />, // Placeholder for "Made in India" / Lion until we have the specific asset
        label: "MADE IN INDIA",
    },
    {
        icon: <ShieldCheck strokeWidth={1.5} size={32} />,
        label: "ASSURED QUALITY",
    },
    {
        icon: <Lock strokeWidth={1.5} size={32} />,
        label: "SECURE PAYMENTS",
    },
    {
        icon: <HandHeart strokeWidth={1.5} size={32} />, // Symbolizing empowerment
        label: "EMPOWERING WEAVERS",
    },
];

export function TrustBadge() {
    return (
        <section className="bg-[#FAF9F6] py-12 border-t border-b border-[#EAEaea]">
            <div className="container-global mx-auto max-w-7xl px-4 md:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {trustValues.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center space-y-3 group"
                        >
                            <div className="text-[#642826] transition-transform duration-300 group-hover:-translate-y-1">
                                {item.icon}
                            </div>
                            <span className="text-[#642826] text-xs md:text-sm font-medium tracking-widest uppercase">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
