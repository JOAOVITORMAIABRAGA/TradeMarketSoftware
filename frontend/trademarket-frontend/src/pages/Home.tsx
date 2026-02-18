import React from "react";
import SearchBar from "../components/SearchBar";
import bgHome from "../images/bg-home.jpg"; // se você colocou dentro de src/assets

const Home: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Imagem de fundo */}
      <img
        src={bgHome}
        alt="Fundo"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover", // cobre a tela toda mantendo proporção
          zIndex: -1,
        }}
      />

      {/* Conteúdo central */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            background: "rgba(30, 41, 59, 0.85)",
            padding: "3rem",
            borderRadius: 16,
            width: "100%",
            maxWidth: 700,
            textAlign: "center",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          }}
        >
          <h1 style={{ marginBottom: "1rem", fontSize: "2.5rem" }}>
            TradeMarket
          </h1>

          <p
            style={{
              color: "#94a3b8",
              marginBottom: "2rem",
              fontSize: "1.2rem",
            }}
          >
            Explore dados históricos, entenda o mercado e visualize ativos de forma profissional.
          </p>

          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Home;
