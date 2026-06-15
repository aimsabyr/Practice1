import { useEffect, useState } from "react";
import axios from "axios";

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/analytics/")
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Ошибка загрузки данных");
      });
  }, []);

  if (!stats && !error) {
    return <h2>Загрузка...</h2>;
  }

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
      }}
    >
      <h1>Аналитика</h1>

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

      {stats && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          <div style={cardStyle}>
            <h2>{stats.clients_count}</h2>
            <p>Клиенты</p>
          </div>

          <div style={cardStyle}>
            <h2>{stats.accounts_count}</h2>
            <p>Счета</p>
          </div>

          <div style={cardStyle}>
            <h2>{stats.transactions_count}</h2>
            <p>Операции</p>
          </div>

          <div style={cardStyle}>
            <h2>{stats.total_balance}</h2>
            <p>Общий баланс (KGS)</p>
          </div>
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  width: "220px",
  padding: "20px",
  borderRadius: "15px",
  backgroundColor: "#f3f4f6",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};