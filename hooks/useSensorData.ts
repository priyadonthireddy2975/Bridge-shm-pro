"use client";

import { useEffect, useState, useRef } from "react";

export type SensorData = {
    timestamp: string; // ISO string for charts
    rx: number;
    ry: number;
    rz: number;
    fx: number;
    fy: number;
    fz: number;
    status: "NORMAL" | "ABNORMAL VIBRATION!";
};

export type LogEntry = {
    id: string;
    timestamp: string;
    message: string;
    type: "info" | "warning" | "error";
};

const POLLING_INTERVAL = 500; // ms
const CHART_HISTORY_LENGTH = 120; // 60 seconds (approx)

export function useSensorData() {
    const [data, setData] = useState<SensorData | null>(null);
    const [history, setHistory] = useState<SensorData[]>([]);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const addLog = (message: string, type: "info" | "warning" | "error") => {
        setLogs(prev => [
            {
                id: Math.random().toString(36).substring(7),
                timestamp: new Date().toLocaleTimeString(),
                message,
                type
            },
            ...prev.slice(0, 49) // Keep last 50 logs
        ]);
    };

    const fetchData = async () => {
        try {
            const res = await fetch("/api/data");
            if (!res.ok) throw new Error("Failed to fetch sensor data");

            const json = await res.json();

            const newData: SensorData = {
                timestamp: new Date().toLocaleTimeString(),
                rx: json.rx,
                ry: json.ry,
                rz: json.rz,
                fx: json.fx,
                fy: json.fy,
                fz: json.fz,
                status: json.status,
            };

            setData(newData);
            setLastUpdated(new Date());
            setError(null);

            // Log abnormal events
            if (json.status !== "NORMAL") {
                // Debounce logs slightly to avoid spamming every 500ms? 
                // For now, let's just log it. Maybe check if last log was same to dedupe.
                setLogs(prev => {
                    if (prev.length > 0 && prev[0].message === json.status && prev[0].timestamp === newData.timestamp) return prev;
                    return [
                        {
                            id: Math.random().toString(36).substring(7),
                            timestamp: newData.timestamp,
                            message: `ALERT: ${json.status} detected! (Rx:${json.rx} Ry:${json.ry})`,
                            type: "error"
                        },
                        ...prev.slice(0, 49)
                    ];
                });
            }

            setHistory((prev) => {
                const newHistory = [...prev, newData];
                if (newHistory.length > CHART_HISTORY_LENGTH) {
                    return newHistory.slice(newHistory.length - CHART_HISTORY_LENGTH);
                }
                return newHistory;
            });
        } catch (err) {
            console.error("Sensor fetch error:", err);
            setError("Connection lost. Retrying...");
            // addLog("Connection lost to ESP32", "warning"); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        addLog("System Initialized. Monitoring started.", "info");

        intervalRef.current = setInterval(fetchData, POLLING_INTERVAL);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return { data, history, logs, loading, error, lastUpdated };
}
