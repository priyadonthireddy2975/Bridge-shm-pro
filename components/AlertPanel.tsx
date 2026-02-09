"use client";

import { AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import type { LogEntry } from "@/hooks/useSensorData";

interface AlertPanelProps {
    logs: LogEntry[];
}

export function AlertPanel({ logs }: AlertPanelProps) {
    return (
        <div className="glass-panel rounded-2xl p-6 h-[400px] flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 z-10 relative">
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <Info className="w-5 h-5 text-cyan-400" />
                    System Event Log
                </h3>
                <span className="text-xs font-mono text-gray-500 bg-gray-900 px-2 py-1 rounded border border-gray-800 animate-pulse">
                    LIVE FEED
                </span>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none z-0" />

            <div className="flex-1 overflow-y-auto pr-2 space-y-3 relative z-10 custom-scrollbar">
                {logs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-600 space-y-2">
                        <CheckCircle2 className="w-8 h-8 opacity-20" />
                        <span className="font-mono text-sm">System Normal. No events.</span>
                    </div>
                ) : (
                    logs.map((log) => (
                        <div
                            key={log.id}
                            className={`p-3 rounded-lg border text-sm font-mono flex gap-3 shadow-sm transition-all hover:bg-white/5 ${log.type === "error"
                                    ? "bg-red-950/20 border-red-900/50 text-red-200"
                                    : log.type === "warning"
                                        ? "bg-yellow-950/20 border-yellow-900/50 text-yellow-200"
                                        : "bg-neutral-900/50 border-neutral-800 text-gray-300"
                                }`}
                        >
                            <div className={`mt-0.5 shrink-0 ${log.type === "error" ? "text-red-500" : "text-cyan-500"
                                }`}>
                                {log.type === "error" ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex justify-between items-start">
                                    <span className={`text-[10px] opacity-70 uppercase tracking-wider font-bold ${log.type === "error" ? "text-red-400" : "text-gray-500"
                                        }`}>
                                        {log.timestamp}
                                    </span>
                                    {log.type === "error" && (
                                        <span className="text-[9px] bg-red-900 text-red-100 px-1.5 rounded uppercase">CRITICAL</span>
                                    )}
                                </div>
                                <p className="leading-snug text-xs sm:text-sm">{log.message}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
