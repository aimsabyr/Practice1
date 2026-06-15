import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>404</h1>

      <h2>Страница не найдена</h2>

      <p>
        Запрашиваемая страница не существует.
      </p>

      <Link to="/">
        <button
          style={{
            padding: "12px 25px",
            fontSize: "16px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            backgroundColor: "#2563eb",
            color: "white",
            marginTop: "20px",
          }}
        >
          Вернуться на главную
        </button>
      </Link>
    </div>
  );
}