import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/clients/")
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Ошибка загрузки данных");
      });
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>


      <h1>Клиенты</h1>

      {error && (
        <p
          style={{
            color: "red",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          {error}
        </p>
      )}

      <table
        style={{
          width: "80%",
          margin: "20px auto",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>ФИО</th>
            <th style={thStyle}>ИИН</th>
            <th style={thStyle}>Телефон</th>
          </tr>
        </thead>

        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td style={tdStyle}>{client.id}</td>

              <td style={tdStyle}>
                <Link
                  to={`/client/${client.id}`}
                  style={{
                    textDecoration: "none",
                    color: "#2563eb",
                    fontWeight: "bold",
                  }}
                >
                  {client.full_name}
                </Link>
              </td>

              <td style={tdStyle}>{client.iin}</td>
              <td style={tdStyle}>{client.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



const thStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  backgroundColor: "#f4f4f4",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
};