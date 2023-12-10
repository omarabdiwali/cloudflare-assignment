"use client";
import { useEffect, useState } from 'react'
import CollapsibleTable from '@/component/CollapsibleTable';

export default function Home() {
  const [orgData, setOrgData] = useState([]);

  useEffect(() => {
    fetch('/org-chart').then(res => res.json())
      .then(data => setOrgData(data)).catch(err => console.error(err));
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <div className='mt-5 mb-10 mx-5 flex flex-row space-x-3'>
        <a href="/find-employee" className='hover:underline'>Find Employee</a>
        <div className='text-slate-400'>/</div>
        <a href='/format-csv' className='hover:underline'>Format CSV String</a>
      </div>
      <CollapsibleTable rows={orgData} />
    </div>
  )
}
