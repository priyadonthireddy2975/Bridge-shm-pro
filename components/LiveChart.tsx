"use client";

import { useRef, useMemo } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { type SensorData } from "@/hooks/useSensorData";
import { Maximize2, Minimize2, Radio } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LiveChartProps {
    data: SensorData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-neutral-900 border border-neutral-700 p-3 rounded-lg shadow-xl text-xs font-mono">
                <p className="text-gray-400 mb-2 border-b border-gray-800 pb-1">{label}</p>
                {payload.map((entry: any) => (
                    <div key={entry.name} className="flex items-center gap-2 mb-1" style={{ color: entry.color }}>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="font-bold">{entry.name}:</span>
                        <span>{Number(entry.value).toFixed(3)}g</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export function LiveChart({ data }: LiveChartProps) {
    const [fullscreen, setFullscreen] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);

    // Subsample data for performance if needed, or just slice last 60 points
    const dispData = useMemo(() => data.slice(-60), [data]);

    return (
        <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`glass-panel rounded-2xl p-6 relative flex flex-col ${fullscreen ? "fixed inset-4 z-50 bg-neutral-950/95 backdrop-blur-xl border border-neutral-800" : "h-[400px]"
                }`}
        >
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <Radio className="w-5 h-5 text-indigo-400 animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white tracking-tight">Real-Time Vibrations</h3>
                        <p className="text-xs text-gray-400 font-mono">RMS Acceleration (g) • Last 60s</p>
                    </div>
                </div>

                <button
                    onClick={() => setFullscreen(!fullscreen)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                    {fullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>
            </div>

            <div className="flex-1 w-full relative min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dispData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRx" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorRy" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorRz" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />

                        <XAxis
                            dataKey="timestamp"
                            stroke="#666"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            padding={{ left: 10, right: 10 }}
                            interval="preserveStartEnd"
                            minTickGap={30}
                        />

                        <YAxis
                            stroke="#666"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            padding={{ top: 20, bottom: 20 }}
                            domain={['auto', 'auto']}
                        />

                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />

                        <Area
                            type="monotone"
                            dataKey="rx"
                            name="Axis X"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorRx)"
                            isAnimationActive={false} // Performance
                        />
                        <Area
                            type="monotone"
                            dataKey="ry"
                            name="Axis Y"
                            stroke="#a855f7"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorRy)"
                            isAnimationActive={false}
                        />
                        <Area
                            type="monotone"
                            dataKey="rz"
                            name="Axis Z"
                            stroke="#10b981"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorRz)"
                            isAnimationActive={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
