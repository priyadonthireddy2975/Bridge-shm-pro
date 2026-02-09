"use client";

import { useSensorData } from "@/hooks/useSensorData";
import { Header } from "@/components/Header";
import { StatusCard } from "@/components/StatusCard";
import { AxisCard } from "@/components/AxisCard";
import { LiveChart } from "@/components/LiveChart";
import { AlertPanel } from "@/components/AlertPanel";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data, history, logs, lastUpdated, error } = useSensorData();

  // Loading state skeleton logic could go here, but for now we render placeholders or null
  // If data is null, use default zero values to keep layout stable
  const safeData = data || {
    rx: 0, ry: 0, rz: 0,
    fx: 0, fy: 0, fz: 0,
    status: "NORMAL" as const, // Default safe status
    timestamp: new Date().toLocaleTimeString()
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white selection:bg-cyan-500/30">

      <Header
        lastUpdated={lastUpdated.toLocaleTimeString()}
        isConnected={!error}
      />

      <main className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">

        {/* Error Banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/20 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-center justify-center gap-3 backdrop-blur-sm"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
            <span className="font-mono text-sm tracking-wide">CONNECTION LOST — ATTEMPTING RECONNECT...</span>
          </motion.div>
        )}

        {/* Top Section: Status & KPIs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Status Indicator - Full Width on Mobile, Span 3 on Desktop if desired, or let it be the hero */}
          <div className="lg:col-span-3">
            <StatusCard status={safeData.status} />
          </div>

          {/* Axis Cards Row */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <AxisCard axis="X" rms={safeData.rx} freq={safeData.fx} />
            <AxisCard axis="Y" rms={safeData.ry} freq={safeData.fy} />
            <AxisCard axis="Z" rms={safeData.rz} freq={safeData.fz} />
          </div>
        </div>

        {/* Bottom Section: Charts & Logs */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Live Chart - Takes up 2/3 width on large screens */}
          <div className="xl:col-span-2 min-h-[400px]">
            <LiveChart data={history} />
          </div>

          {/* Alert Panel - Takes up 1/3 width */}
          <div className="xl:col-span-1 min-h-[400px]">
            <AlertPanel logs={logs} />
          </div>
        </div>

      </main>
    </div>
  );
}
