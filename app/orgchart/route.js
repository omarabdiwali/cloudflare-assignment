import { NextResponse } from "next/server";

export const config = {
  runtime: 'edge'
}

const dataToFormat = (org) => {
  let totalData = [];
  let id = 1;
  let deps = org.organization.departments;

  for (let i = 0; i < deps.length; i++) {
    const dep = deps[i];
    const employees = dep.employees;
    let tree = { id: id, name: dep.managerName, department: dep.name, office: "", position: "Manager", skills: "", employees: [] };
    id += 1;

    for (let i = 0; i < employees.length; i++) {
      const emp = employees[i];
      if (emp.name !== dep.managerName) {
        let chTree = { id: id, name: emp.name, department: emp.department, office: emp.office, skills: emp.skills.join(' / ') };
        id += 1;
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