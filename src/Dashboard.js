import React, { useState } from 'react'
// import PatientDashboard from './Components/PatientDashboard'
import Box from '@mui/material/Box';
import { usePatientData } from './CustomHooks';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableHead, TableCell, TableRow, TableContainer, Avatar } from '@mui/material';
import { debounce, isEmpty } from 'lodash';
import { styled } from '@mui/system';
import { cyan, green, orange, red, pink, blue } from '@mui/material/colors';

const Header = styled(TableCell)({
  fontSize:'16px'
});

const Dashboard = () => {
    const [ageRange, setAgeRange] = useState([15, 32]);

    const patientInfo = usePatientData(ageRange);
    const avatarColor = (i) => {
        const colors = [orange, green, red, cyan, pink, blue]
        return colors[i % colors.length][300]
    }

    return (
        <Box p={8}>
            <Box mb={4} sx={{ fontColor: '#444242', display: 'flex' }}>
                <Typography variant="h5" mr={1}>Filter by age </Typography>
                <Slider
                    sx={{ width: 300 }}
                    value={ageRange}
                    onChange={debounce((e, value) => setAgeRange(value), 100)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                    step={2}
                    marks={[{ value: 0, label: '0' },
                    { value: 100, label: '100' }]} />
            </Box>
            <TableContainer sx={{ boxShadow: '2px 3px 5px grey', borderRadius: '10px' }}>
                <Table>
                    <TableHead sx={{bgcolor:'aliceblue'}}>
                        <TableRow>
                            <Header></Header>
                            <Header>ID</Header>
                            <Header>Name</Header>
                            <Header>Gender</Header>
                            <Header >BirthDate</Header>
                            <Header>Address</Header>
                            <Header>Phone</Header>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ bgcolor: 'white' }}>
                        {!isEmpty(patientInfo) && patientInfo.map((patient, index) => (
                            <TableRow key={patient.id}>
                                <TableCell><Avatar sx={{ bgcolor: avatarColor(index), fontSize: '14px' }}>{`${(patient.name && patient.name[0].given && patient.name[0].given[0][0]) || ''}${patient.name && patient.name[0]?.family ? patient.name[0]?.family[0] : ''}`}</Avatar></TableCell>
                                <TableCell>{patient.id}</TableCell>
                                <TableCell>{patient.name && (patient.name[0].text || patient.name[0].given[0] || '')} {patient.name && patient.name[0]?.family}</TableCell>
                                <TableCell>{patient.gender}</TableCell>
                                <TableCell>{patient.birthDate}</TableCell>
                                <TableCell>{patient.address && patient.address[0].text || patient.address && patient.address[0].line || ''}</TableCell>
                                <TableCell>{patient.telecom && patient.telecom[0].value || ''}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {isEmpty(patientInfo) && <Typography mt={4} mb={4} variant="h4" sx={{ display: 'flex', justifyContent: 'center' }}> Data is not available</Typography>}
            </TableContainer>

        </Box>
    );
};

export default Dashboard