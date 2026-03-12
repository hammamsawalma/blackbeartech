'use client';

import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src="/images/states/404-bear.png"
          alt="404 - Lost Bear"
          className="w-64 h-64 mx-auto mb-8 object-contain"
        />

        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-white/50 mb-8 max-w-md mx-auto">
          Looks like this page wandered off into the digital wilderness...
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#00D4FF] to-[#00A3CC] hover:opacity-90 transition-all"
        >
          ← Go Home
        </Link>
      </motion.div>
    </div>
  );
}
