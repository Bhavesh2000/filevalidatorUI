import {
  Box,
  Button,
  Container,
  FormControl,
  Paper,
  Typography,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import React from "react";
import FlexBox from "../../components/FlexBox";
import axios from "axios";
import { useSnackbar } from "notistack";
import {useNavigate} from "react-router-dom";

function Fileupload() {
  const [layoutFile, setLayoutFileValue] = React.useState([]);
  const [dataFile, setDataFileValue] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleLayoutFileChange = (newValue) => {
    setLayoutFileValue(newValue);
  };
  const handleDataFileChange = (newValue) => {
    setDataFileValue(newValue);
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();

    const formData = new FormData();

    formData.append("files", layoutFile);
    formData.append("files", dataFile);

    try {
      const response = await axios.post(
        "https://filevaildationbackend-1.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      sessionStorage.setItem("fileId", response?.data?.fileId);
      console.log("Success!", response.data);
      enqueueSnackbar("Files uploaded successfully.", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        
      });
      setTimeout(() => {
        navigate("/dashboard")
      }, 5000);
    } catch (error) {
      console.error("Error uploading files:", error);
      enqueueSnackbar("Could not upload files", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
      // Handle error logic here (e.g., show error message)
    }
  };

  return (
    <>
      <FlexBox
        sx={{
          pt: 6,
        }}
      >
        <FormControl onSubmit={handleSubmit}>
          <Paper
            sx={{
              width: "40vw",
              height: "40vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2,
            }}
            elevation={2}
          >
            <Container maxWidth="xl">
              <Typography variant="h5">Upload layout file</Typography>
              <MuiFileInput
                value={layoutFile}
                onChange={handleLayoutFileChange}
                name="layout"
                sx={{ width: "100%" }}
              />
            </Container>
            <Container maxWidth="xl">
              <Typography variant="h5">Upload data file</Typography>
              <MuiFileInput
                value={dataFile}
                onChange={handleDataFileChange}
                name="data"
                sx={{ width: "100%" }}
              />
            </Container>
            <Container>
              <Button
                variant="contained"
                type="Submit"
                onClick={handleSubmit}
                fullWidth
              >
                Upload
              </Button>
            </Container>
          </Paper>
        </FormControl>
      </FlexBox>
    </>
  );
}

export default Fileupload;
