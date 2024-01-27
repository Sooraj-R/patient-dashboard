import { useState, useEffect } from 'react';


export const usePatientData = (age) => {
    const [data, setData] = useState([]);
    const current = new Date();
    const year = current.getFullYear();
    const month = ("0" + (current.getMonth() + 1)).slice(-2)
    const day = ("0" + current.getDate()).slice(-2)
    let to = `${year - age[0]}-${month}-${day}`
    let from = `${year - age[1]}-${month}-${day}`
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://hapi.fhir.org/baseR4/Patient?birthdate=ge${from}&birthdate=le${to}`);
                const data = await response.json();
                setData(data.entry.map(entry => entry.resource));
            } catch (error) {
                console.error('Error in fetching data => ', error);
            }
        };

        fetchData();
    }, [age]);

    return data;
};
