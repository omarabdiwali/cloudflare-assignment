import { NextResponse } from 'next/server';
export const runtime = "edge"

const filterData = (a, b) => {
  let name = b.name ? b.name.toLowerCase() : "";
  let office = b.office ? b.office.toLowerCase() : "";
  let skill = b.skill ? b.toLowerCase() : "";

  let eName = a.name.toLowerCase();
  let eOffice = a.office.toLowerCase();
  let eSkills = a.skills.map(s => s.toLowerCase()).join('/');

  if (eName.includes(name) && eOffice.includes(office) && eSkills.includes(skill)) {
    let minSalary = b.minSalary ? b.minSalary : -Infinity;
    let maxSalary = b.maxSalary ? b.maxSalary : Infinity;
    if (a.salary <= maxSalary && a.salary >= minSalary) {
      return true
    }
  }
  return false;
}

// export async function GET(req) {
//   const chart = await process.env.ORG.get("organization");
//   const data = JSON.parse(chart);
//   let emps = [];
//   let dep = data.organization.departments;

//   for (let i = 0; i < dep.length; i++) {
//     emps.push(...dep[i].employees);
//   }

//   return new NextResponse(JSON.stringify({ "employees": [] }));
// }

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