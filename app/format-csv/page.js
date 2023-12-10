'use client';
import { useState } from 'react'

export default function Page() {
  const [csv, setCSV] = useState("");
  const [formatted, setFormatted] = useState();
  
  const changeCSV = (e) => {
    setCSV(e.target.value);
  }

  const getJSON = () => {
    fetch('/organization-chart', {
      method: "POST",
      body: JSON.stringify({ "organizationData": csv })
    }).then(res => res.json()).then(data => setFormatted(data)).catch(err => console.error(err))
  }

  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(formatted));
  }

  return (
    <>
      <div className=''>
        <div className='flex flex-row space-x-3 mx-3 mt-5'>
          <a href='/orgchart' className='hover:underline'>Organization Table</a>
          <div className='text-slate-400'>/</div>
          <a href='/find-employee' className='hover:underline'>Find Employee</a>
        </div>
        
        <div className='flex flex-col space-y-3 mx-10 my-10'>
          <div className='flex flex-row space-x-3'>
            <textarea placeholder='Enter CSV...' className='w-[100%] h-[60vh] bg-slate-800 text-white py-3 px-3' spellCheck={false} value={csv} onChange={changeCSV} />
            <div className='flex flex-col space-y-2'>
              <button className='w-20 bg-slate-800 h-[50%] hover:bg-slate-500 hover:text-black' onClick={getJSON}>Format CSV</button>
              <button className='w-20 bg-slate-800 h-[50%] px-1 hover:bg-slate-500 hover:text-black' onClick={copyJSON}>Copy JSON</button>
            </div>
          </div>
          <pre className={`text-xs ${formatted ? "bg-slate-800" : "bg-black"}`}>{JSON.stringify(formatted, null, 2)}</pre>
        </div>
      </div>
    </>
  )
}