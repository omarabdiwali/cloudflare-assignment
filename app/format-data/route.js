import { NextResponse } from "next/server";
export const runtime = "edge"

const dataToFormat = (org) => {
  let totalData = [];
  let deps = org.organization.departments;

  for (let i = 0; i < deps.length; i++) {
    const dep = deps[i];
    const employees = dep.employees;
    let tree = { name: dep.managerName, department: dep.name, office: "", position: "Manager", skills: "", employees: [] };

    for (let i = 0; i < employees.length; i++) {
      const emp = employees[i];
      if (emp.name !== dep.managerName) {
        let chTree = { name: emp.name, department: emp.department, office: emp.office, skills: emp.skills.join(' / ') };
        tree.employees.push(chTree)
      } else {
        tree.office = emp.office;
        tree.skills = emp.skills.join(' / ')
      }
    }

    totalData.push(tree);
  }

  return totalData;
}

export async function GET(req) {
  const organization = await process.env.ORG.get("organization");
  const formatData = dataToFormat(JSON.parse(organization));
  return new NextResponse(JSON.stringify(formatData));
}