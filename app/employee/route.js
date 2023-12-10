import { NextResponse } from 'next/server';
export const runtime = "edge"

const filterData = (a, b) => {
  let name = a.name.toLowerCase();
  let office = a.office.toLowerCase();
  let skills = a.skills.map(s => s.toLowerCase()).join("/");

  if (name.includes(b.name.toLowerCase()) && office.includes(b.office.toLowerCase()) && skills.includes(b.skill.toLowerCase())) {
    let minSalary = b.minSalary ? b.minSalary : -Infinity;
    let maxSalary = b.maxSalary ? b.maxSalary : Infinity;
    if (a.salary <= maxSalary && a.salary >= minSalary) {
      return true
    }
  }
  return false;
}

export async function GET(req) {
  return new NextResponse(JSON.stringify({ "employees": [] }));
}

export async function POST(req) {
  const employee = await req.json();
  const data = await process.env.ORG.get("organization");
  const orgChart = JSON.parse(data);
  
  let dep = orgChart.organization.departments;
  let emps = [];

  for (let i = 0; i < dep.length; i++) {
    const name = dep[i].name.toLowerCase();
    if (name.includes(employee.department.toLowerCase())) {
      emps.push(...dep[i].employees);
    }
  }

  emps = emps.filter(d => filterData(d, employee));
  let res = { "employees": emps };
  return new NextResponse(JSON.stringify(res));
}