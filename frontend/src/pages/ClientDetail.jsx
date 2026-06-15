import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ClientDetail() {
  const { id } = useParams();

  const [client, setClient] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/clients/${id}/`)
      .then((response) => {
        setClient(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Ошибка загрузки данных");
      });

    axios
      .get(`http://127.0.0.1:8000/api/clients/${id}/accounts/`)
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Ошибка загрузки данных");
      });
  }, [id]);

  if (!client && !error) {
    return <h2>Загрузка...</h2>;
  }

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>Карточка клиента</h1>

      {error && (
        <p
          style={{
            color: "red",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          {error}
        </p>
      )}

      {client && (
        <>
          <div style={{ marginBottom: "30px" }}>
            <p>
              <b>ФИО:</b> {client.full_name}
            </p>

            <p>
              <b>ИИН:</b> {client.iin}
            </p>

            <p>
              <b>Телефон:</b> {client.phone}
            </p>
          </div>

          <h2>Банковские счета</h2>

          <table
            style={{
              width: "80%",
              margin: "20px auto",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Номер счета</th>
                <th style={thStyle}>Валюта</th>
                <th style={thStyle}>Баланс</th>
              </tr>
            </thead>

            <tbody>
              {accounts.length > 0 ? (
                accounts.map((account) => (
                  <tr key={account.id}>
                    <td style={tdStyle}>
                      <Link
                        to={`/account/${account.id}`}
                        style={{
                          textDecoration: "none",
                          color: "#2563eb",
                          fontWeight: "bold",
                        }}
                      >
                        {account.account_number}
                      </Link>
                    </td>

                    <td style={tdStyle}>
                      {account.currency}
                    </td>

                    <td style={tdStyle}>
                      {account.balance} {account.currency}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      padding: "20px",
                      textAlign: "center",
                    }}
                  >
                    Счета не найдены
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
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