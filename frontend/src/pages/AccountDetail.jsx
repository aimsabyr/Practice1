import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AccountDetail() {
  const { id } = useParams();

  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("DESC");

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/accounts/${id}/`)
      .then((response) => {
        setAccount(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Ошибка загрузки данных");
      });

    axios
      .get(`http://127.0.0.1:8000/api/accounts/${id}/transactions/`)
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Ошибка загрузки данных");
      });
  }, [id]);

  if (!account && !error) {
    return <h2>Загрузка...</h2>;
  }

  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "ALL" ||
        transaction.operation_type === filter;

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortOrder === "DESC") {
        return new Date(b.created_at) - new Date(a.created_at);
      }

      return new Date(a.created_at) - new Date(b.created_at);
    });

  const indexOfLastTransaction =
    currentPage * transactionsPerPage;

  const indexOfFirstTransaction =
    indexOfLastTransaction - transactionsPerPage;

  const currentTransactions =
    filteredTransactions.slice(
      indexOfFirstTransaction,
      indexOfLastTransaction
    );

  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage
  );

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Информация о счете</h1>

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

      {account && (
        <div
          style={{
            width: "450px",
            margin: "20px auto",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2>Информация о счете</h2>

          <p>
            <b>Номер счета:</b> {account.account_number}
          </p>

          <p>
            <b>Валюта:</b> {account.currency}
          </p>

          <p>
            <b>Баланс:</b> {account.balance}{" "}
            {account.currency}
          </p>
        </div>
      )}

      <h2>История операций</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Поиск по описанию..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid gray",
          }}
        />

        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: "10px",
            marginLeft: "10px",
            borderRadius: "8px",
          }}
        >
          <option value="ALL">Все</option>
          <option value="CREDIT">Пополнение</option>
          <option value="DEBIT">Списание</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value)
          }
          style={{
            padding: "10px",
            marginLeft: "10px",
            borderRadius: "8px",
          }}
        >
          <option value="DESC">
            Сначала новые
          </option>
          <option value="ASC">
            Сначала старые
          </option>
        </select>
      </div>

      <table
        style={{
          margin: "0 auto",
          borderCollapse: "collapse",
          width: "80%",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Дата</th>
            <th style={thStyle}>
              Тип операции
            </th>
            <th style={thStyle}>Сумма</th>
            <th style={thStyle}>Описание</th>
          </tr>
        </thead>

        <tbody>
          {currentTransactions.length > 0 ? (
            currentTransactions.map(
              (transaction) => (
                <tr key={transaction.id}>
                  <td style={tdStyle}>
                    {new Date(
                      transaction.created_at
                    ).toLocaleString()}
                  </td>

                  <td style={tdStyle}>
                    {transaction.operation_type ===
                    "CREDIT"
                      ? "Пополнение"
                      : "Списание"}
                  </td>

                  <td style={tdStyle}>
                    {transaction.amount}
                  </td>

                  <td style={tdStyle}>
                    {transaction.description}
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td
                colSpan="4"
                style={{
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                Операции не найдены
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
          disabled={currentPage === 1}
        >
          Назад
        </button>

        <span style={{ margin: "0 15px" }}>
          Страница {currentPage} из{" "}
          {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
          disabled={
            currentPage === totalPages ||
            totalPages === 0
          }
        >
          Вперед
        </button>
      </div>
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