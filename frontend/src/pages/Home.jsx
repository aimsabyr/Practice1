import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/analytics/")
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!stats) {
    return <h2 style={{ textAlign: "center" }}>Загрузка...</h2>;
  }

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
      }}
    >
      <h1 style={{ fontSize: "60px" }}>🏦 Mini Bank System</h1>

      <p
        style={{
          fontSize: "24px",
          color: "#666",
          marginBottom: "40px",
        }}
      >
        Система управления банком
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "25px",
          flexWrap: "wrap",
          marginBottom: "40px",
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
    </div>
  );
}

const cardStyle = {
  width: "240px",
  padding: "25px",
  borderRadius: "15px",
  backgroundColor: "#f3f4f6",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};