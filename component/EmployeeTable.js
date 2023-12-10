import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function EmployeeTable({ employees }) {
  return (
    <TableContainer sx={{maxHeight: "85vh" }}>
      <Table stickyHeader className='etable' sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Role</TableCell>
            <TableCell align="left">Department</TableCell>
            <TableCell align="left">Office</TableCell>
            <TableCell align="left">Skills</TableCell>
            <TableCell align="left">Salary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <TableRow
              key={emp.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {emp.name}
              </TableCell>
              <TableCell align="left">{emp.isManager ? "Manager" : "Employee"}</TableCell>
              <TableCell align="left">{emp.department}</TableCell>
              <TableCell align="left">{emp.office}</TableCell>
              <TableCell align="left">{emp.skills.join(' / ')}</TableCell>
              <TableCell align="left">{emp.salary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}