import React, { useState } from "react";
import axios from "axios";

function Upload({ token }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (e) => {
    const chosenFile = e.target.files[0];
    setFile(chosenFile);
    setFileName(chosenFile ? chosenFile.name : "No file chosen");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please choose a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(`File uploaded with code: ${response.data.code}`);
      setFile(null);
      setFileName("No file chosen");
    } catch (error) {
      alert("File upload failed");
    }
  };

  const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "400px",
      margin: "2rem auto",
    },
    title: {
      marginBottom: "1.5rem",
      color: "#6200ea",
      fontSize: "1.5rem",
    },
    input: {
      display: "none",
    },
    fileNameDisplay: {
      maxWidth: "300px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      marginBottom: "1rem",
      color: "#333",
      fontSize: "0.9rem",
      textAlign: "center",
    },
    label: {
      fontWeight: "500",
      padding: "0.5rem 1rem",
      borderRadius: "4px",
      backgroundColor: "#6200ea",
      color: "#fff",
      cursor: "pointer",
      textAlign: "center",
      marginBottom: "1rem",
      transition: "background-color 0.3s",
    },
    labelHover: {
      backgroundColor: "#3700b3",
    },
    button: {
      padding: "0.7rem 2rem",
      backgroundColor: "#6200ea",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#3700b3",
    },
  };

  return (
    <div style={styles.form}>
      <h2 style={styles.title}>Upload File</h2>
      <input
        type="file"
        id="file-input"
        style={styles.input}
        onChange={handleFileChange}
      />
      <label
        htmlFor="file-input"
        style={styles.label}
        onMouseOver={(e) =>
          (e.target.style.backgroundColor = styles.labelHover.backgroundColor)
        }
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = styles.label.backgroundColor)
        }
      >
        Choose File
      </label>
      <div style={styles.fileNameDisplay}>{fileName}</div>
      <button
        type="submit"
        onClick={handleSubmit}
        style={styles.button}
        onMouseOver={(e) =>
          (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
        }
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = styles.button.backgroundColor)
        }
      >
        Upload
      </button>
    </div>
  );
}

export default Upload;
