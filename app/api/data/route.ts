
import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate sensor data
  // RMS values (Random vibration + gravity on Z)
  const rx = Number((Math.random() * 0.2).toFixed(3));
  const ry = Number((Math.random() * 0.2).toFixed(3));
  // Z-axis usually has gravity (~1.0g) plus noise
  const rz = Number((0.9 + Math.random() * 0.2).toFixed(3));

  // Peak frequencies (simulated 10-50Hz)
  const fx = Math.floor(10 + Math.random() * 40);
  const fy = Math.floor(10 + Math.random() * 40);
  const fz = Math.floor(10 + Math.random() * 40);

  // Status simulation: 1 in 20 chance of abnormal vibration
  // Or force it every N seconds based on time? 
  // For demo, let's keep it mostly NORMAL but occasionally spike.
  const isAbnormal = Math.random() > 0.95; 

  const data = {
    rx: isAbnormal ? rx + 0.5 : rx,
    ry: isAbnormal ? ry + 0.5 : ry,
    rz: rz,
    fx, fy, fz,
    status: isAbnormal ? "ABNORMAL VIBRATION!" : "NORMAL"
  };

  return NextResponse.json(data);
}
