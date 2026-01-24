import { ScanLine, HeartPulse, BrainCircuit } from "lucide-react";

export default function BiometricSyncHUD() {
  return (
    <>
      {/* Top Left HUD */}
      <div className="absolute top-12 left-12 text-primary font-code text-lg">
        <div className="flex items-center gap-3">
          <ScanLine className="w-8 h-8" />
          <p>STATUS: ONLINE</p>
        </div>
        <p className="mt-2 ml-11">SYS_ID: AV-LX-001</p>
        <p className="ml-11">MODE: ABSOLUTE_SCALING</p>
      </div>

      {/* Bottom Right HUD */}
      <div className="absolute bottom-12 right-12 text-primary font-code text-lg text-right">
        <p>BIOMETRIC SYNC</p>
        <div className="flex items-center justify-end gap-4 mt-2">
            <p>98.6° F</p>
            <div className="w-24 h-1 bg-primary/30"><div className="w-[90%] h-full bg-primary"></div></div>
        </div>
        <div className="flex items-center justify-end gap-4 mt-2">
            <HeartPulse className="w-5 h-5"/>
            <p>72 BPM</p>
        </div>
        <div className="flex items-center justify-end gap-4 mt-2">
            <BrainCircuit className="w-5 h-5"/>
            <p>SYNC: 98%</p>
        </div>
      </div>
       {/* Corner Brackets */}
       <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-primary/50"></div>
       <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-primary/50"></div>
       <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-primary/50"></div>
       <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-primary/50"></div>
    </>
  );
}
