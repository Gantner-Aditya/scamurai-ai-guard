import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  AlertOctagon,
  Archive,
  BatteryCharging,
  Bot,
  Boxes,
  Camera,
  Check,
  ChevronRight,
  CircleDot,
  Clock3,
  Download,
  DoorClosed,
  FileText,
  Fingerprint,
  Flame,
  Gauge,
  HardDrive,
  KeyRound,
  LockKeyhole,
  MapPin,
  Radio,
  ScanFace,
  Server,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Thermometer,
  UserRoundCheck,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

import evidenceImage from "@/assets/cctv-door-102.jpg";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SCAMURAI | Physical Threat Intelligence" },
      { name: "description", content: "Live AI-powered physical access security and anomaly operations dashboard." },
      { property: "og:title", content: "SCAMURAI | Physical Threat Intelligence" },
      { property: "og:description", content: "Live AI-powered physical access security and anomaly operations dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

type Severity = "critical" | "warning" | "normal";
type Alert = {
  id: string;
  title: string;
  source: string;
  location: string;
  time: string;
  severity: Severity;
  confidence: string;
  analysis: string;
};

const baseAlerts: Alert[] = [
  { id: "INC-2841", title: "5× Failed Badge Taps in 60s", source: "SALTO", location: "Door 102 · Server Wing", time: "14 sec", severity: "critical", confidence: "98.4%", analysis: "Brute force credential pattern" },
  { id: "INC-2839", title: "Serial Locker Skimming Detected", source: "GANTNER", location: "Locker Bank B · L2", time: "2 min", severity: "critical", confidence: "96.1%", analysis: "Coordinated locker probing" },
  { id: "INC-2837", title: "Tailgating Anomaly", source: "CCTV", location: "Perimeter Gate · North", time: "5 min", severity: "warning", confidence: "91.8%", analysis: "Two identities, one authorization" },
  { id: "INC-2832", title: "Blacklist Lag Infiltration", source: "SALTO SVN", location: "Door 18 · Loading Bay", time: "11 min", severity: "warning", confidence: "88.6%", analysis: "Revoked credential used offline" },
];

const attackAlert: Alert = { id: "INC-2844", title: "Coordinated Multi-Zone Intrusion", source: "FUSION AI", location: "Doors 102–106 · Server Wing", time: "now", severity: "critical", confidence: "99.2%", analysis: "Distributed credential attack" };
const defaultAlert: Alert = baseAlerts[0] ?? attackAlert;

const doors = [
  { name: "SVN-102", place: "Server Wing", battery: 94, sync: "38s ago", lag: 0, state: "Secured" },
  { name: "SVN-018", place: "Loading Bay", battery: 72, sync: "14h ago", lag: 14, state: "Lagging" },
  { name: "SVN-044", place: "Research Lab", battery: 81, sync: "2m ago", lag: 0, state: "Secured" },
  { name: "SVN-071", place: "East Stairwell", battery: 26, sync: "13h ago", lag: 13, state: "Service" },
  { name: "SVN-106", place: "Server Wing", battery: 89, sync: "1m ago", lag: 0, state: "Secured" },
  { name: "SVN-009", place: "Main Reception", battery: 99, sync: "18s ago", lag: 0, state: "Secured" },
];

const lockers = [
  { name: "B-014", state: "Occupied", temp: 23.1, solenoid: "Engaged", dwell: "2h 14m" },
  { name: "B-015", state: "Occupied", temp: 31.8, solenoid: "Fault", dwell: "9h 42m" },
  { name: "B-016", state: "Available", temp: 22.8, solenoid: "Released", dwell: "—" },
  { name: "B-017", state: "Occupied", temp: 24.2, solenoid: "Engaged", dwell: "38m" },
  { name: "B-018", state: "Available", temp: 22.9, solenoid: "Released", dwell: "—" },
  { name: "B-019", state: "Occupied", temp: 25.4, solenoid: "Engaged", dwell: "4h 06m" },
  { name: "B-020", state: "Reserved", temp: 23.5, solenoid: "Engaged", dwell: "12m" },
  { name: "B-021", state: "Occupied", temp: 23.9, solenoid: "Engaged", dwell: "1h 22m" },
];

function StatusDot({ severity }: { severity: Severity }) {
  return <span className={cn("status-dot", severity === "critical" ? "bg-critical" : severity === "warning" ? "bg-warning" : "bg-success")} />;
}

function SectionLabel({ icon: Icon, title, suffix }: { icon: typeof Activity; title: string; suffix?: string }) {
  return <div className="flex items-center gap-2 text-[11px] font-semibold uppercase text-muted-foreground"><Icon className="size-3.5 text-primary" /><span>{title}</span>{suffix && <span className="ml-auto font-mono text-[10px] text-dim">{suffix}</span>}</div>;
}

function Dashboard() {
  const [attackMode, setAttackMode] = useState(false);
  const [selected, setSelected] = useState<Alert | null>(null);
  const [tab, setTab] = useState<"doors" | "lockers">("doors");
  const [dossier, setDossier] = useState(false);
  const [resolution, setResolution] = useState<string | null>(null);
  const [assistantNote, setAssistantNote] = useState<string | null>(null);
  const alerts = useMemo(() => attackMode ? [attackAlert, ...baseAlerts] : baseAlerts, [attackMode]);

  const resolve = (action: string) => {
    setResolution(action);
    window.setTimeout(() => setSelected(null), 950);
  };

  const downloadReport = () => {
    const report = `SCAMURAI INCIDENT DOSSIER\n${selected?.id ?? "INC-2841"}\nGenerated: ${new Date().toISOString()}\n\nThreat: ${selected?.title ?? defaultAlert.title}\nConfidence: ${selected?.confidence ?? defaultAlert.confidence}\nLocation: ${selected?.location ?? defaultAlert.location}\n\nAudit trail preserved. Evidence hash: 8F3A-992C-17DB.`;
    const url = URL.createObjectURL(new Blob([report], { type: "text/plain" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `SCAMURAI-${selected?.id ?? "INC-2841"}-audit.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="command-bar">
        <div className="mx-auto flex max-w-[1800px] flex-wrap items-center gap-4 px-4 py-3 lg:px-6">
          <div className="brand-mark"><ShieldAlert className="size-5" /></div>
          <div className="mr-auto min-w-0"><h1 className="truncate text-sm font-bold uppercase tracking-normal"><span className="text-primary">SCAMURAI</span><span className="mx-2 text-border">|</span>Physical Threat Intelligence</h1><p className="mt-0.5 font-mono text-[9px] uppercase text-dim">Event correlation engine · Operational</p></div>
          <div className="hidden items-center gap-2 border-l border-border pl-4 text-xs md:flex"><MapPin className="size-3.5 text-muted-foreground" /><span className="text-muted-foreground">Active location</span><strong>HQ Server Wing</strong></div>
          <div className={cn("mode-control", attackMode && "border-critical/60 bg-critical/10")}><span className={cn("font-mono text-[10px] font-bold uppercase", attackMode ? "text-critical" : "text-success")}>{attackMode ? "Simulate attack" : "Normal mode"}</span><Switch aria-label="Live event simulation" checked={attackMode} onCheckedChange={setAttackMode} /></div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-success"><span className="status-dot animate-pulse bg-success" />LIVE · 09:42:18 UTC</div>
        </div>
      </header>

      <div className="mx-auto max-w-[1800px] p-4 lg:p-6">
        <section aria-label="Site metrics" className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border lg:grid-cols-4">
          <Metric icon={Boxes} value="142" label="Monitored nodes" note="84 doors · 58 lockers" tone="primary" />
          <Metric icon={AlertOctagon} value={attackMode ? "4" : "3"} label="Active critical threats" note={attackMode ? "+1 attack simulation" : "+2 in last hour"} tone="critical" />
          <Metric icon={Wifi} value="4" label="Blacklist sync lag" note="SVN offline >12h" tone="warning" />
          <Metric icon={Gauge} value={attackMode ? "91/100" : "78/100"} label="Overall site risk" note={attackMode ? "Severe · escalating" : "Elevated · +6 today"} tone={attackMode ? "critical" : "warning"} />
        </section>

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(420px,.85fr)]">
          <section className="panel min-w-0">
            <div className="panel-header"><SectionLabel icon={Radio} title="Real-time anomaly ticker" suffix={`${alerts.length} OPEN · AUTO REFRESH`} /></div>
            <div className="divide-y divide-border">
              {alerts.map((alert, index) => (
                <button key={alert.id} type="button" onClick={() => { setSelected(alert); setResolution(null); setAssistantNote(null); }} className={cn("alert-row group w-full text-left", index === 0 && attackMode && "bg-critical/[.06]")}>
                  <div className="flex items-center gap-3"><div className={cn("severity-rail", alert.severity === "critical" ? "bg-critical" : "bg-warning")} /><div className="relative shrink-0"><div className={cn("grid size-9 place-items-center rounded-sm border", alert.severity === "critical" ? "border-critical/30 bg-critical/10 text-critical" : "border-warning/30 bg-warning/10 text-warning")}>{alert.source === "CCTV" ? <Camera className="size-4" /> : alert.source === "GANTNER" ? <Archive className="size-4" /> : <KeyRound className="size-4" />}</div>{index === 0 && <span className={cn("absolute -right-1 -top-1 size-2 rounded-full", alert.severity === "critical" ? "bg-critical" : "bg-warning")} />}</div></div>
                  <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><strong className="text-sm">{alert.title}</strong><span className={cn("tag", alert.severity === "critical" ? "tag-critical" : "tag-warning")}>{alert.severity}</span></div><div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] text-muted-foreground"><span>{alert.source}</span><span>•</span><span>{alert.location}</span></div></div>
                  <div className="ml-auto hidden text-right sm:block"><p className="font-mono text-[11px] text-foreground">{alert.confidence}</p><p className="mt-1 text-[10px] text-dim">{alert.time} ago</p></div><ChevronRight className="size-4 shrink-0 text-dim transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[9px] uppercase text-dim"><span>Correlating 2,841 events/sec</span><span className="text-success">All ingest pipelines healthy</span></div>
          </section>

          <section className="panel overflow-hidden">
            <div className="panel-header"><SectionLabel icon={Activity} title="Site posture" suffix="LAST 30 MIN" /></div>
            <div className="grid grid-cols-[1fr_auto] gap-5 p-4">
              <div><div className="flex h-32 items-end gap-1" aria-label="Threat activity chart">{[18,22,16,28,25,34,31,40,44,37,54,49,72,58,63,78,52,47,60,42,39,35,28,32].map((h,i)=><span key={i} className={cn("flex-1 rounded-t-[1px]", i > 11 && i < 17 ? "bg-critical/60" : "bg-primary/35")} style={{height:`${h}%`}} />)}</div><div className="mt-2 flex justify-between font-mono text-[9px] text-dim"><span>09:12</span><span>09:27</span><span>NOW</span></div></div>
              <div className="flex w-32 flex-col justify-between border-l border-border pl-4 text-[10px]"><Signal label="CCTV" value="12/12" /><Signal label="SALTO" value="84/84" /><Signal label="GANTNER" value="58/58" /><Signal label="AI LATENCY" value="84ms" /></div>
            </div>
          </section>
        </div>

        <section className="panel mt-5">
          <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3"><SectionLabel icon={Server} title="Hardware telemetry & health" /><div className="ml-auto flex rounded-sm border border-border bg-muted p-0.5"><button type="button" onClick={()=>setTab("doors")} className={cn("tab-control", tab === "doors" && "tab-active")}><DoorClosed className="size-3.5" />Salto SVN doors</button><button type="button" onClick={()=>setTab("lockers")} className={cn("tab-control", tab === "lockers" && "tab-active")}><Archive className="size-3.5" />Gantner lockers</button></div></div>
          {tab === "doors" ? <DoorGrid /> : <LockerGrid />}
        </section>
      </div>

      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto border-border bg-background p-0 sm:max-w-xl">
          {selected && <Copilot alert={selected} resolution={resolution} assistantNote={assistantNote} onResolve={resolve} onAsk={setAssistantNote} onDossier={()=>setDossier(true)} />}
        </SheetContent>
      </Sheet>

      <Dialog open={dossier} onOpenChange={setDossier}>
        <DialogContent className="inset-3 left-3 top-3 h-[calc(100vh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-none translate-x-0 translate-y-0 overflow-y-auto rounded-md border-border bg-background p-0 sm:inset-6 sm:h-[calc(100vh-3rem)] sm:w-[calc(100vw-3rem)]">
          <Dossier alert={selected ?? defaultAlert} onDownload={downloadReport} />
        </DialogContent>
      </Dialog>
    </main>
  );
}

function Metric({icon:Icon,value,label,note,tone}:{icon:typeof Boxes;value:string;label:string;note:string;tone:"primary"|"critical"|"warning"}) {
  const color = tone === "critical" ? "text-critical" : tone === "warning" ? "text-warning" : "text-primary";
  return <article className="bg-card p-4"><div className="flex items-start justify-between"><div><p className="text-[10px] font-semibold uppercase text-muted-foreground">{label}</p><p className={cn("mt-2 font-mono text-3xl font-semibold",color)}>{value}</p></div><Icon className={cn("size-5",color)} /></div><p className="mt-2 font-mono text-[9px] text-dim">{note}</p></article>;
}

function Signal({label,value}:{label:string;value:string}) { return <div><div className="mb-1 flex justify-between font-mono"><span className="text-dim">{label}</span><span className="text-success">{value}</span></div><div className="h-1 overflow-hidden rounded-full bg-muted"><div className="h-full w-[92%] bg-success" /></div></div>; }

function DoorGrid() {
  return <div className="grid gap-px bg-border md:grid-cols-2 xl:grid-cols-3">{doors.map((door)=><article key={door.name} className="bg-card p-4"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><DoorClosed className={cn("size-4",door.lag ? "text-warning":"text-success")} /><strong className="font-mono text-xs">{door.name}</strong></div><span className={cn("tag",door.lag ? "tag-warning":"tag-success")}>{door.state}</span></div><p className="mt-1 text-[10px] text-muted-foreground">{door.place}</p><div className="mt-4 grid grid-cols-3 gap-3"><Telemetry icon={BatteryCharging} label="Battery" value={`${door.battery}%`} warn={door.battery<30}/><Telemetry icon={Clock3} label="Last sync" value={door.sync} warn={door.lag>0}/><Telemetry icon={Wifi} label="Blk. lag" value={`${door.lag}h`} warn={door.lag>0}/></div><div className="mt-3 h-1 bg-muted"><div className={cn("h-full",door.battery<30?"bg-warning":"bg-success")} style={{width:`${door.battery}%`}} /></div></article>)}</div>;
}

function LockerGrid() {
  return <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">{lockers.map((locker)=><article key={locker.name} className="bg-card p-4"><div className="flex items-center justify-between"><strong className="font-mono text-sm">{locker.name}</strong><span className={cn("status-dot",locker.solenoid === "Fault"?"bg-critical":locker.state === "Available"?"bg-success":"bg-primary")} /></div><p className="mt-1 text-[10px] uppercase text-muted-foreground">{locker.state}</p><div className="mt-4 space-y-2 border-t border-border pt-3"><Line icon={Thermometer} label="Internal" value={`${locker.temp}°C`} warn={locker.temp>30}/><Line icon={LockKeyhole} label="Solenoid" value={locker.solenoid} warn={locker.solenoid === "Fault"}/><Line icon={Clock3} label="Dwell" value={locker.dwell}/></div></article>)}</div>;
}

function Telemetry({icon:Icon,label,value,warn}:{icon:typeof Activity;label:string;value:string;warn?:boolean}) { return <div><Icon className={cn("mb-1 size-3",warn?"text-warning":"text-dim")} /><p className="text-[9px] uppercase text-dim">{label}</p><p className={cn("mt-0.5 font-mono text-[11px]",warn&&"text-warning")}>{value}</p></div>; }
function Line({icon:Icon,label,value,warn}:{icon:typeof Activity;label:string;value:string;warn?:boolean}) { return <div className="flex items-center gap-2 text-[10px]"><Icon className="size-3 text-dim"/><span className="text-muted-foreground">{label}</span><span className={cn("ml-auto font-mono",warn&&"text-critical")}>{value}</span></div>; }

function Copilot({alert,resolution,assistantNote,onResolve,onAsk,onDossier}:{alert:Alert;resolution:string|null;assistantNote:string|null;onResolve:(a:string)=>void;onAsk:(a:string)=>void;onDossier:()=>void}) {
  return <div><div className="border-b border-border p-5 pr-12"><div className="flex items-center gap-2"><div className="grid size-8 place-items-center rounded-sm bg-primary/10 text-primary"><Bot className="size-4"/></div><div><SheetTitle className="text-sm uppercase">AI Security Co-Pilot</SheetTitle><SheetDescription className="font-mono text-[9px]">INCIDENT {alert.id} · ACTIVE REVIEW</SheetDescription></div></div></div>
    <div className="space-y-6 p-5">
      <section><SectionLabel icon={Camera} title="A · Visual evidence" suffix="CAM-07 / LIVE"/><div className="evidence-frame mt-3"><img src={evidenceImage} alt="CCTV view of a person presenting a credential at Server Wing Door 102" width={1280} height={720}/><div className="absolute left-[57%] top-[23%] h-[62%] w-[19%] border-2 border-critical"><span className="absolute -top-5 left-0 bg-critical px-1.5 py-0.5 font-mono text-[8px] text-critical-foreground">SUBJECT 01 · 98.4%</span></div><div className="absolute bottom-2 left-2 font-mono text-[8px] text-foreground">CAM-07 · 09:41:52.481</div><div className="absolute right-2 top-2 flex items-center gap-1 bg-critical/90 px-2 py-1 font-mono text-[8px] uppercase text-critical-foreground"><CircleDot className="size-2.5 animate-pulse"/> Live</div></div><div className="mt-2 flex items-center gap-1 overflow-x-auto font-mono text-[9px] text-muted-foreground"><span className="path-node">CAM-03</span><ChevronRight className="size-3"/><span className="path-node">CAM-05</span><ChevronRight className="size-3"/><span className="path-node border-primary text-primary">CAM-07</span><span className="ml-auto whitespace-nowrap">Re-ID · 8m 24s</span></div></section>
      <section className="border-y border-border py-5"><SectionLabel icon={ScanFace} title="B · AI threat analysis"/><div className="mt-3 flex items-end justify-between"><div><p className="text-sm font-semibold">{alert.analysis}</p><p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">Cross-system correlation matched repeated credential failure, abnormal dwell, and camera identity drift.</p></div><span className="ml-4 font-mono text-xl font-bold text-critical">{alert.confidence}</span></div><div className="mt-3 h-1.5 bg-muted"><div className="h-full bg-critical" style={{width:alert.confidence}}/></div></section>
      <section><SectionLabel icon={Zap} title="C · Recommended action"/><div className="mt-3 border border-primary/30 bg-primary/[.06] p-4"><p className="text-xs leading-relaxed"><span className="font-semibold text-primary">AI recommendation:</span> Lock Salto Reader #102 and dispatch the nearest field guard.</p><div className="mt-4 grid gap-2"><Button onClick={()=>onResolve("Guard dispatched · Reader 102 locked")} className="h-10 justify-start bg-primary text-primary-foreground hover:bg-primary/90"><ShieldCheck/>Approve & dispatch guard</Button><div className="grid grid-cols-2 gap-2"><Button onClick={()=>onResolve("Lockout overridden by officer")} variant="outline" className="h-9 border-warning/40 text-warning hover:bg-warning/10"><KeyRound/>Override lockout</Button><Button onClick={()=>onResolve("Dismissed as false positive")} variant="outline" className="h-9 border-border"><X/>Dismiss false positive</Button></div></div>{resolution&&<div className="mt-3 flex items-center gap-2 border-t border-primary/20 pt-3 text-[11px] text-success"><Check className="size-3.5"/>{resolution}</div>}</div></section>
      <section><SectionLabel icon={Bot} title="D · Consult assistant"/><div className="mt-3 flex flex-wrap gap-2"><Button variant="outline" size="sm" onClick={()=>onAsk("Last 10 minutes: 7 badge attempts, 2 camera handoffs, no successful entry.")}>Show last 10m activity</Button><Button variant="outline" size="sm" onClick={()=>onAsk("Credential owner: J. Rivera · Access revoked 08:12 UTC · SOC case #442.")}>Check credential owner profile</Button></div>{assistantNote&&<p className="mt-3 border-l-2 border-primary bg-muted/50 p-3 text-[11px] leading-relaxed text-muted-foreground">{assistantNote}</p>}</section>
      <Button onClick={onDossier} variant="outline" className="w-full border-border"><FileText/>Export incident dossier</Button>
    </div>
  </div>;
}

function Dossier({alert,onDownload}:{alert:Alert;onDownload:()=>void}) {
  const logs=["09:41:18 · First rejected credential observed","09:41:42 · Third retry crossed behavioral threshold","09:41:51 · CAM-05 to CAM-07 identity handoff confirmed","09:42:03 · Fifth attempt triggered critical incident","09:42:07 · AI recommendation delivered to SOC-01"];
  return <div className="min-h-full"><header className="flex flex-wrap items-center gap-4 border-b border-border px-6 py-5 pr-14"><div className="brand-mark"><ShieldAlert className="size-5"/></div><div><DialogTitle className="text-base uppercase">Incident audit dossier</DialogTitle><DialogDescription className="font-mono text-[10px]">{alert.id} · EVIDENCE CHAIN VERIFIED</DialogDescription></div><Button onClick={onDownload} className="ml-auto"><Download/>Download PDF audit report</Button></header><div className="grid gap-6 p-6 lg:grid-cols-[1fr_1fr]"><section><SectionLabel icon={FileText} title="Incident summary"/><div className="mt-3 panel p-5"><div className="grid grid-cols-2 gap-5"><Summary label="Classification" value={alert.analysis}/><Summary label="Confidence" value={alert.confidence}/><Summary label="Location" value={alert.location}/><Summary label="Priority" value="P1 · Critical"/></div><p className="mt-5 border-t border-border pt-4 text-xs leading-6 text-muted-foreground">SCAMURAI correlated Salto credential events with CCTV re-identification telemetry and local access policy. The pattern exceeded the brute-force threshold and was elevated for immediate officer review.</p></div><SectionLabel icon={Camera} title="Camera snapshots"/><div className="mt-3 grid grid-cols-2 gap-3"><img className="aspect-video w-full object-cover opacity-80" src={evidenceImage} alt="Camera 05 evidence snapshot" width={1280} height={720}/><img className="aspect-video w-full object-cover object-right opacity-80" src={evidenceImage} alt="Camera 07 evidence snapshot" width={1280} height={720}/></div></section><section><SectionLabel icon={Clock3} title="Timestamped audit log"/><ol className="mt-3 panel p-5">{logs.map((log,i)=><li key={log} className="relative flex gap-4 pb-5 last:pb-0"><span className="relative z-10 grid size-6 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 font-mono text-[9px] text-primary">{i+1}</span>{i<logs.length-1&&<span className="absolute left-3 top-6 h-full w-px bg-border"/>}<span className="pt-1 font-mono text-[10px] text-muted-foreground">{log}</span></li>)}</ol><SectionLabel icon={UserRoundCheck} title="Actions taken by officer"/><div className="mt-3 panel divide-y divide-border"><Action icon={LockKeyhole} title="Reader 102 remote lock staged" actor="AI Co-Pilot · Awaiting approval"/><Action icon={Siren} title="Field response unit identified" actor="Guard Patel · 2m 10s ETA"/><Action icon={Fingerprint} title="Evidence chain sealed" actor="System · SHA-256 verified"/></div></section></div></div>;
}
function Summary({label,value}:{label:string;value:string}){return <div><p className="text-[9px] uppercase text-dim">{label}</p><p className="mt-1 text-xs font-semibold">{value}</p></div>}
function Action({icon:Icon,title,actor}:{icon:typeof Activity;title:string;actor:string}){return <div className="flex items-center gap-3 p-4"><Icon className="size-4 text-success"/><div><p className="text-xs font-medium">{title}</p><p className="mt-0.5 font-mono text-[9px] text-dim">{actor}</p></div></div>}