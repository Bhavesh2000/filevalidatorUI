import React, {useEffect, useState} from "react";
import FlexBox from "../../components/FlexBox";
import { Box, Container, Paper, Typography } from "@mui/material";
import DataTable from "../../components/Table";
import axios from "axios";


const extractKeys = (data) => {
  // Get all object keys (excluding special properties) using Object.keys and filter
  const keys = Object.keys(data[0]).filter(
    (key) =>
      !key.startsWith("_") &&
      key !== "__v" &&
      key !== "updatedAt" &&
      key !== "createdAt" &&
      key !== "fileBelong"
  );

  return keys;
};



function Dashboard() {
  const [data, setData] = useState([]);
  const [invalidData, setInValidData] = useState([]);
  const [invalidheaders, setInvalidheaders] = useState([]);
  const [validheaders, setValidheaders] = useState([]);
  const [validData, setValidData] = useState([]);
  const[summaryData, setSummaryData] = useState([
    {
      label: "Total Records",
      value: 0,
    },
    {
      label: "Validated Records",
      value: 0,
    },
    {
      label: "Errored Records",
      value: 0,
    },
  ])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileId = sessionStorage.getItem("fileId");


  const fetchInvalidData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://filevaildationbackend-1.onrender.com/getInValidDataByFileId/${fileId}`);
      const data1 = response.data;
      console.log(data1.data);
      const keys = extractKeys(data1.data);
      console.log(keys);
      setInvalidheaders(keys);
      setInValidData(data1.data);
    } catch (error) {
      setError(error);
    } finally {
    }
  };

  const fetchValidData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://filevaildationbackend-1.onrender.com/getValidDataByFileId/${fileId}`);
      const data1 = response.data;
      console.log(data1.data);
      const keys = extractKeys(data1.data);
      console.log(keys);
      setValidheaders(keys);
      setValidData(data1.data);
    } catch (error) {
      setError(error);
    } finally {
    }
  };

  const fetchSummaryData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://filevaildationbackend-1.onrender.com/getSummaryDataById/${fileId}`);
      const data = response.data;
      console.log(data);
      setData(data);
      setSummaryData([
        {
          label: "Total Records",
          value: data.data.totalEntries,
        },
        {
          label: "Validated Records",
          value: data.data.validEntries,
        },
        {
          label: "Errored Records",
          value: data.data.inValidEntries,
        },
      ])
      
    } catch (error) {
      setError(error);
    } finally {
      
    }
  };

  useEffect(()=>{   
    fetchSummaryData();
    fetchValidData();
    fetchInvalidData();
    setLoading(false);
  },[])
 
  return (
    loading ? (<div></div>) : 
    (<Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "auto",
        padding: ".8rem 1.4rem",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {summaryData.map((rec) => (
          <Container key={rec.label} maxWidth="xl">
            <Paper
              elevation={2}
              sx={{
                padding: "1.2rem 1.2rem",
                width: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                height: "auto",
              }}
            >
              <Typography variant="h3">{rec.label}</Typography>
              <Typography variant="h3" sx={{ mt: 2 }}>
                {rec.value}
              </Typography>
            </Paper>
          </Container>
        ))}
      </Box>
      <Container maxWidth="xl" >
        <Box
          sx={{
            mt: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box >
          {validData &&  <DataTable data={validData} headers={validheaders} tableName={"Valid Record Table"}/>}
          </Box>

          <Box >
          {invalidData &&  <DataTable data={invalidData} headers={invalidheaders} tableName={"InValid Record Table"}/>}
          </Box>

        </Box>
      </Container>
    </Box>)
  );
}

export default Dashboard;
