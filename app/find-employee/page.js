'use client';
import EmployeeTable from '@/component/EmployeeTable';
import { useState } from 'react';

export default function Page() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [office, setOffice] = useState("");
  const [skill, setSkill] = useState("");

  const [employees, setEmployees] = useState([])

  const changeData = (e) => {
    let ele = e.target.id;
    if (ele === "name") {
      setName(e.target.value);
    } else if (ele === "dep") {
      setDepartment(e.target.value);
    } else if (ele === "min") {
      setMinSalary(e.target.value);
    } else if (ele === "max") {
      setMaxSalary(e.target.value);
    } else if (ele == "office") {
      setOffice(e.target.value);
    } else {
      setSkill(e.target.value)
    }
  }

  const getEmployees = (e) => {
    e.preventDefault();

    if (parseInt(minSalary) > parseInt(maxSalary)) {
      alert("Maximum salary can not be smaller than minimum.");
      return;
    }

    let req = {
      "name": name, "department": department, "minSalary": minSalary.length > 0 ? Number(minSalary) : -Infinity,
      "maxSalary": maxSalary.length > 0 ? Number(maxSalary) : Infinity, "office": office, "skill": skill
    };

    fetch('/me', {
      method: "POST",
      body: JSON.stringify(req)
    }).then(res => res.json()).then(data => {
      setEmployees(data.employees);
    })
      .catch(err => console.error(err));
  }

  return (
    <>
      <Head>
        <title>Find Employee(s)</title>
      </Head>
      <div className='mt-8 mx-3 flex flex-row space-x-3'>
        <a href='/' className='hover:underline'>Organization Table</a>
        <div className='text-slate-600'>/</div>
        <a href='/format-csv' className='hover:underline'>Format CSV String</a>
      </div>
      <div className='mt-8 mx-3 flex flex-row space-x-5 bg-gray-800'>
        <div className="w-full md:mt-0 sm:max-w-md xl:p-0 bg-gray-800">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                Find Employee(s)
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label className="block mb-2 text-sm font-medium text-white">Name</label>
                <input value={name} onChange={changeData} id="name" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Name" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">Department</label>
                <input value={department} onChange={changeData} id="dep" placeholder="Department" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className='flex flex-row space-x-3'>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">Office</label>
                  <input value={office} onChange={changeData} id="office" placeholder="Office" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">Skill</label>
                  <input value={skill} onChange={changeData} id="skill" placeholder="Skill" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div className='flex flex-row space-x-3'>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">Minimum Salary</label>
                  <input min={0} value={minSalary} onChange={changeData} type='number' id="min" placeholder="Minimum Salary" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">Maximum Salary</label>
                  <input min={minSalary} value={maxSalary} onChange={changeData} type='number' id="max" placeholder="Maximum Salary" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <button type="submit" onClick={getEmployees} className="w-full text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Find Employee(s)</button>
            </form>
          </div>
        </div>
        <div className='w-[100%] max-w-[100%] h-[85vh]'>
          {employees.length > 0 ? <EmployeeTable employees={employees} /> : <div>No employee matches the description.</div>}
        </div>
      </div>
    </>
  )
}