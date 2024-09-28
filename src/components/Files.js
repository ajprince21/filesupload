import React, { useState, useEffect } from "react";
import axios from "axios";

function Files({ token }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/files", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFiles(response.data);
      } catch (error) {
        alert("Error fetching files");
      }
    };

    fetchFiles();
  }, [token]);

  const handleDownload = async (file) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/download",
        { code: file.code }, // Assume there's a way to get the code if needed
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // Response is a blob (file)
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Error downloading file");
    }
  };

  const styles = {
    container: {
      padding: "2rem",
      maxWidth: "600px",
      margin: "2rem auto",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
    header: {
      color: "#6200ea",
      marginBottom: "1.5rem",
      textAlign: "center",
    },
    fileList: {
      listStyleType: "none",
      paddingLeft: "0",
    },
    listItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "1rem",
      padding: "0.5rem",
      borderRadius: "4px",
      border: "1px solid #ddd",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    },
    fileName: {
      flex: "1",
      marginRight: "1rem",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    button: {
      padding: "0.5rem 1rem",
      backgroundColor: "#6200ea",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "0.9rem",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#3700b3",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Your Files</h2>
      <ul style={styles.fileList}>
        {files.length === 0 ? (
          <li style={styles.listItem}>No files uploaded.</li>
        ) : (
          files.map((file) => (
            <li key={file._id} style={styles.listItem}>
              <span style={styles.fileName}>{file.filename}</span>
              <button
                style={styles.button}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor =
                    styles.buttonHover.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor =
                    styles.button.backgroundColor)
                }
                onClick={() => handleDownload(file)}
              >
                Download
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Files;
