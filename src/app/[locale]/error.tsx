'use client';

import { motion } from 'framer-motion';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src="/images/states/server-error.png"
          alt="Server Error"
          className="w-64 h-64 mx-auto mb-8 object-contain"
        />

        <h1 className="text-5xl font-bold text-white mb-4">Something went wrong</h1>
        <p className="text-lg text-white/50 mb-8 max-w-md mx-auto">
          Our bear technician is already on it. Please try again.
        </p>

        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-90 transition-all"
        >
          Try Again
        </button>
      </motion.div>
    </div>
  );
}
