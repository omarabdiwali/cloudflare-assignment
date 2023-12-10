"use client";
export default function Home() {  
  return (
    <div className="min-h-screen flex flex-row space-x-3">
      <a href="/orgchart" className="hover:underline">Organization Chart</a>
      <div className="text-slate-400">/</div>
      <a href="/find-employee" className="hover:underline">Find Employee(s)</a>
      <div className="text-slate-400">/</div>
      <a href="/format-csv" className="hover:underline">Format CSV String</a>
    </div>
  )
}
