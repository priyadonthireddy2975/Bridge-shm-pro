import { Activity, Radio, Wifi, Clock, CloudOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface HeaderProps {
    lastUpdated: string;
    isConnected: boolean;
}

export function Header({ lastUpdated, isConnected }: HeaderProps) {
    const [currentTime, setCurrentTime] = useState<string>("");

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('en-US', {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-50">
            {/* Left: Title & Branding */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Activity className="w-8 h-8 text-cyan-400" />
                    <div className="absolute inset-0 animate-ping opacity-20 bg-cyan-500 blur-sm rounded-full"></div>
                </div>
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
                        Bridge SHM <span className="text-cyan-500">PRO</span>
                    </h1>
                    <p className="text-xs text-gray-500 font-mono">Live Structural Monitoring System</p>
                </div>
            </div>

            {/* Right: Status Indicators */}
            <div className="flex items-center gap-6 text-sm font-mono">
                {/* Clock */}
                <div className="flex items-center gap-2 text-gray-400 bg-gray-900/50 px-3 py-1.5 rounded-md border border-gray-800">
                    <Clock className="w-4 h-4 text-cyan-600" />
                    <span>{currentTime || "--:--:--"}</span>
                </div>

                {/* Connection Status */}
                <div className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors duration-300",
                    isConnected
                        ? "bg-emerald-950/30 border-emerald-900 text-emerald-400"
                        : "bg-red-950/30 border-red-900 text-red-500"
                )}>
                    {isConnected ? (
                        <Wifi className="w-4 h-4 animate-pulse" />
                    ) : (
                        <CloudOff className="w-4 h-4" />
                    )}
                    <span className="uppercase text-xs font-bold">
                        {isConnected ? "Scale Connected" : "Link Lost"}
                    </span>
                </div>

                {/* Last Updated */}
                <div className="flex flex-col items-end text-xs text-gray-600">
                    <span>Packet RX</span>
                    <span className="text-gray-400">{lastUpdated}</span>
                </div>
            </div>
        </header>
    );
}
