"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface AxisCardProps {
    axis: "X" | "Y" | "Z";
    rms: number;
    freq: number;
}

const AXIS_CONFIG = {
    X: { color: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/10", bar: "bg-blue-500" },
    Y: { color: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/10", bar: "bg-purple-500" },
    Z: { color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10", bar: "bg-emerald-500" },
};

export function AxisCard({ axis, rms, freq }: AxisCardProps) {
    const config = AXIS_CONFIG[axis];
    const percentage = Math.min((rms / 2.0) * 100, 100); // 2.0g max scale

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative overflow-hidden rounded-xl border ${config.border} bg-neutral-900/40 backdrop-blur-sm p-6 group hover:border-opacity-100 transition-colors`}
        >
            <div className={`absolute top-0 right-0 p-4 opacity-10 font-black text-6xl ${config.color}`}>
                {axis}
            </div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex flex-col">
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">RMS Acceleration</span>
                    <div className="flex items-baseline gap-1">
                        <h2 className={`text-4xl font-bold font-mono ${config.color} tabular-nums tracking-tighter`}>
                            {rms.toFixed(3)}
                        </h2>
                        <span className="text-gray-500 text-sm">g</span>
                    </div>
                </div>

                <div className={`p-2 rounded-lg ${config.bg} ${config.color}`}>
                    <TrendingUp className="w-5 h-5" />
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-800 rounded-full h-1.5 mb-4 overflow-hidden relative">
                <motion.div
                    className={`h-full ${config.bar} shadow-[0_0_10px_currentColor]`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                />
            </div>

            {/* Secondary Metrics */}
            <div className="flex items-center justify-between text-xs font-mono text-gray-500 border-t border-gray-800 pt-3">
                <div className="flex items-center gap-2">
                    <ArrowUpRight className="w-3 h-3 text-gray-600" />
                    <span>Peak Freq</span>
                </div>
                <span className={`font-bold ${config.color}`}>{freq} Hz</span>
            </div>
        </motion.div>
    );
}
