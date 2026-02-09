"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface StatusCardProps {
    status: "NORMAL" | "ABNORMAL VIBRATION!";
}

export function StatusCard({ status }: StatusCardProps) {
    const isNormal = status === "NORMAL";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative w-full overflow-hidden rounded-2xl border transition-all duration-500 glass-panel md:col-span-2 lg:col-span-3 ${isNormal
                    ? "border-cyan-900/50 shadow-[0_0_30px_rgba(6,182,212,0.1)] bg-gradient-to-br from-cyan-950/10 to-transparent"
                    : "border-red-600/50 shadow-[0_0_50px_rgba(239,68,68,0.4)] bg-gradient-to-br from-red-950/30 to-transparent animate-pulse-red"
                }`}
        >
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

            <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center h-full min-h-[220px]">

                {/* Animated Icon */}
                <motion.div
                    animate={{ scale: isNormal ? [1, 1.05, 1] : [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: isNormal ? 4 : 0.8 }}
                    className={`mb-6 p-6 rounded-full border-4 ${isNormal
                            ? "border-cyan-500/20 bg-cyan-950/30 text-cyan-400"
                            : "border-red-500/40 bg-red-950/50 text-red-500 shadow-[0_0_40px_rgba(239,68,68,0.6)]"
                        }`}
                >
                    {isNormal ? (
                        <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20" />
                    ) : (
                        <AlertTriangle className="w-16 h-16 sm:w-20 sm:h-20 animate-bounce-short" />
                    )}
                </motion.div>

                {/* Text Status */}
                <h2 className="text-secondary tracking-widest text-sm uppercase mb-2 font-mono text-gray-400">
                    System Integrity Status
                </h2>

                <div className="relative">
                    <motion.h1
                        key={status} // Animate on change
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className={`text-4xl sm:text-6xl font-black tracking-tighter uppercase font-mono drop-shadow-lg ${isNormal
                                ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400"
                                : "text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]"
                            }`}
                    >
                        {status}
                    </motion.h1>

                    {/* Subtle glow behind text */}
                    <div className={`absolute -inset-4 blur-2xl opacity-30 rounded-full z-[-1] ${isNormal ? "bg-cyan-500" : "bg-red-600 animate-pulse"
                        }`} />
                </div>

                {!isNormal && (
                    <p className="mt-4 text-red-300 font-mono text-xs sm:text-sm bg-red-950/50 px-4 py-1 rounded border border-red-900/50 animate-pulse">
                        ⚠️ IMMEDIATE INSPECTION REQUIRED
                    </p>
                )}
            </div>
        </motion.div>
    );
}
