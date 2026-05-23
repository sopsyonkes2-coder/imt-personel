import { useState } from "react";

export default function App() {

  const [showResult, setShowResult] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    pangkat: "",
    nrp: "",
    jabatan: "",
    tb: "",
    bb: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setShowResult(false);
  };

  const hitungIMT = () => {

    if (!form.tb || !form.bb) return 0;

    return (
      form.bb /
      ((form.tb / 100) * (form.tb / 100))
    ).toFixed(2);
  };

  const klasifikasi = () => {

    const imt = parseFloat(hitungIMT());

    if (imt < 18.5) return "UNDERWEIGHT";
    if (imt <= 24.5) return "NORMAL";
    if (imt <= 30) return "OVERWEIGHT";

    return "OBESITAS";
  };

  const status = () => {

    const klas = klasifikasi();

    if (klas === "NORMAL") return "MEMENUHI";
    if (klas === "OVERWEIGHT") return "PEMBINAAN";

    return "PROGRAM PENURUNAN BB";
  };

  const handleSubmit = () => {

    const formElement = document.getElementById("imtForm");

    formElement.submit();

    setShowResult(true);
  };

  return (
    <div style={styles.body}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          APLIKASI IMT PERSONEL
        </h1>

        <p style={styles.subtitle}>
          YONKES 2/YBH/2 KOSTRAD
        </p>

        <form
          id="imtForm"
          action="https://script.google.com/macros/s/AKfycbztod5urUj4ol4IUqDFgQ4tl7xuW-lE_laMzc8YHr5UAdNGGKSTYMq5YCFwu9dTke4p5A/exec"
          method="POST"
          target="hidden_iframe"
        >

          <div style={styles.grid}>

            <input
              name="nama"
              placeholder="Nama"
              value={form.nama}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="pangkat"
              placeholder="Pangkat"
              value={form.pangkat}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="nrp"
              placeholder="NRP"
              value={form.nrp}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="jabatan"
              placeholder="Jabatan"
              value={form.jabatan}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="number"
              name="tb"
              placeholder="Tinggi Badan (cm)"
              value={form.tb}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="number"
              name="bb"
              placeholder="Berat Badan (kg)"
              value={form.bb}
              onChange={handleChange}
              style={styles.input}
            />

          </div>

        </form>

        <iframe
          name="hidden_iframe"
          style={{ display: "none" }}
        />

        <button
          onClick={handleSubmit}
          style={styles.button}
        >
          CEK IMT
        </button>

        {showResult && (

          <div style={styles.resultBox}>

            <div style={styles.resultItem}>
              <h3>IMT</h3>
              <p>{hitungIMT()}</p>
            </div>

            <div style={styles.resultItem}>
              <h3>KLASIFIKASI</h3>
              <p>{klasifikasi()}</p>
            </div>

            <div style={styles.resultItem}>
              <h3>STATUS</h3>
              <p>{status()}</p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

const styles = {

  body: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#07140d,#10271b,#183c29)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial"
  },

  card: {
    width: "100%",
    maxWidth: "900px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(14px)",
    borderRadius: "30px",
    padding: "40px",
    border: "1px solid rgba(255,255,255,0.08)"
  },

  title: {
    color: "white",
    fontSize: "36px"
  },

  subtitle: {
    color: "#8dc59d",
    marginBottom: "30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  },

  input: {
    padding: "18px",
    borderRadius: "15px",
    border: "none",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    fontSize: "15px"
  },

  button: {
    width: "100%",
    marginTop: "30px",
    padding: "18px",
    borderRadius: "18px",
    border: "none",
    background: "#1f7a4f",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  resultBox: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px"
  },

  resultItem: {
    background: "rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "20px",
    color: "white",
    textAlign: "center"
  }
};