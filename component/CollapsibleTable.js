import { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(true);

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'set' } }}>
        <TableCell className='hello'>
          <IconButton
            className='buts'
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon color='info' /> : <KeyboardArrowDownIcon color='info' />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.department}</TableCell>
        <TableCell align="left">{row.office}</TableCell>
        <TableCell align="left">{row.position}</TableCell>
        <TableCell align="left">{row.skills}</TableCell>
        <TableCell align='left'>{row.employees.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ borderTop: 0, paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Employees
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell className='heads'>Name</TableCell>
                    <TableCell className='heads'>Department</TableCell>
                    <TableCell className='heads' align="left">Office</TableCell>
                    <TableCell className='heads' align="left">Skills</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.employees.map((emp) => (
                    <TableRow key={emp.name}>
                      <TableCell component="th" scope="row">
                        {emp.name}
                      </TableCell>
                      <TableCell>{emp.department}</TableCell>
                      <TableCell align="left">{emp.office}</TableCell>
                      <TableCell align="left">
                        {emp.skills}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function CollapsibleTable({ rows }) {
  return (
    <TableContainer className='table' component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className='heads'>Name</TableCell>
            <TableCell className='heads' align="left">Department</TableCell>
            <TableCell className='heads' align="left">Office</TableCell>
            <TableCell className='heads' align="left">Position</TableCell>
            <TableCell className='heads' align="left">Skills</TableCell>
            <TableCell className='heads' align='left'>Employees</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}