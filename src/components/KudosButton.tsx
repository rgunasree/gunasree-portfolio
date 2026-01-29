import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function KudosButton() {
    const [count, setCount] = useState(0);
    const [clicks, setClicks] = useState<number[]>([]);

    useEffect(() => {
        const savedCount = localStorage.getItem('portfolio_kudos');
        if (savedCount) {
            setCount(parseInt(savedCount, 10));
        }
    }, []);

    const handleClick = () => {
        const newCount = count + 1;
        setCount(newCount);
        localStorage.setItem('portfolio_kudos', newCount.toString());

        // Add a click timestamp for particle effect
        const now = Date.now();
        setClicks((prev) => [...prev, now]);

        // Remove the click after animation
        setTimeout(() => {
            setClicks((prev) => prev.filter((t) => t !== now));
        }, 1000);
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <div className="relative">
                <AnimatePresence>
                    {clicks.map((id) => (
                        <motion.div
                            key={id}
                            initial={{ opacity: 1, y: 0, x: 0 }}
                            animate={{
                                opacity: 0,
                                y: -100,
                                x: (Math.random() - 0.5) * 50
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute -top-8 left-1/2 transform -translate-x-1/2 pointer-events-none"
                        >
                            <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                        </motion.div>
                    ))}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClick}
                    className="group relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
                >
                    <motion.div
                        animate={clicks.length > 0 ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <Heart className={`w-8 h-8 text-white transition-colors ${clicks.length > 0 ? 'fill-white' : ''}`} />
                    </motion.div>

                    <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md min-w-[24px] text-center">
                        {count}
                    </div>
                </motion.button>
            </div>
        </div>
    );
}
