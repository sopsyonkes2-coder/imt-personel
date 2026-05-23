import { useState } from "react";

export default function App() {
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

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
    return (form.bb / ((form.tb / 100) * (form.tb / 100))).toFixed(2);
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

  const kataPenyemangat = () => {
    const klas = klasifikasi();
    switch (klas) {
      case "NORMAL":
        return "LUAR BIASA! PERTAHANKAN FISIK PRIMA ANDA UNTUK SELALU SIAP MENJALANKAN TUGAS POKOK SATUAN!";
      case "UNDERWEIGHT":
        return "TETAP SEMANGAT! TINGKATKAN ASUPAN NUTRISI DAN LATIHAN BEBAN AGAR MENCAPAI BERAT BADAN IDEAL PRAJURIT.";
      case "OVERWEIGHT":
        return "SIAP BINA FISIK! TINGKATKAN INTENSITAS KARDIO, KURANGI PORSINYA, DAN KEMBALIKAN POSTUR IDEALMU.";
      case "OBESITAS":
        return "PERINTAH KOMANDO: JAGA KESEHATAN, JALANKAN PROGRAM PENURUNAN BB SECARA DISIPLIN DAN TERUKUR. ANDA PASTI BISA!";
      default:
        return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    const SPREADSHEET_URL = "https://script.google.com/macros/s/AKfycbztod5urUj4ol4IUqDFgQ4tl7xuW-lE_laMzc8YHr5UAdNGGKSTYMq5YCFwu9dTke4p5A/exec";

    try {
      await fetch(SPREADSHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: form.nama.toUpperCase(),
          pangkat: form.pangkat,
          nrp: form.nrp,
          jabatan: form.jabatan.toUpperCase(),
          tb: form.tb,
          bb: form.bb,
          imt: hitungIMT(),
          status: status()
        })
      });

      setShowResult(true);
    } catch (error) {
      console.error("Gagal mengirim data:", error);
      alert("TERJADI KESALAHAN JARINGAN! DATA GAGAL TERKIRIM.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.card}>
        
        <img 
          src="/logo.png" 
          alt="Logo Yonkes 2" 
          style={styles.logo} 
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />

        <h1 style={styles.title}>APLIKASI IMT PERSONEL</h1>
        <p style={styles.subtitle}>SOPS YONKES 2/YBH/2 KOSTRAD</p>

        <form id="imtForm" onSubmit={handleSubmit}>
          <div style={styles.grid}>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>NAMA LENGKAP *</label>
              <input
                name="nama"
                type="text"
                placeholder="Nama Lengkap"
                value={form.nama}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>PANGKAT *</label>
              <select
                name="pangkat"
                value={form.pangkat}
                onChange={handleChange}
                style={styles.select}
                required
              >
                <option value="">-- Pilih Pangkat --</option>
                <option value="JENDERAL">JENDERAL</option>
                <option value="LETJEN">LETJEN</option>
                <option value="MAYJEN">MAYJEN</option>
                <option value="BRIGJEN">BRIGJEN</option>
                <option value="KOLONEL">KOLONEL</option>
                <option value="LETKOL">LETKOL</option>
                <option value="MAYOR">MAYOR</option>
                <option value="KAPTEN">KAPTEN</option>
                <option value="LETTU">LETTU</option>
                <option value="LETDA">LETDA</option>
                <option value="PELTU">PELTU</option>
                <option value="PELDA">PELDA</option>
                <option value="SERMA">SERMA</option>
                <option value="SERKA">SERKA</option>
                <option value="SERTU">SERTU</option>
                <option value="SERDA">SERDA</option>
                <option value="KOPKA">KOPKA</option>
                <option value="KOPTU">KOPTU</option>
                <option value="KOPDA">KOPDA</option>
                <option value="PRAKA">PRAKA</option>
                <option value="PRATU">PRATU</option>
                <option value="PRADA">PRADA</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>NRP *</label>
              <input
                name="nrp"
                type="text"
                placeholder="NRP"
                value={form.nrp}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>JABATAN *</label>
              <input
                name="jabatan"
                type="text"
                placeholder="Jabatan"
                value={form.jabatan}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>TINGGI BADAN (CM) *</label>
              <input
                type="number"
                name="tb"
                placeholder="Tinggi Badan (cm)"
                value={form.tb}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>BERAT BADAN (KG) *</label>
              <input
                type="number"
                name="bb"
                placeholder="Berat Badan (kg)"
                value={form.bb}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "MENGIRIM DATA..." : "CEK IMT & SIMPAN DATA"}
          </button>
        </form>

        {showResult && (
          <div>
            <div style={styles.resultBox}>
              <div style={styles.resultItem}>
                <h3 style={styles.resultHeader}>IMT</h3>
                <p style={styles.resultText}>{hitungIMT()}</p>
              </div>

              <div style={styles.resultItem}>
                <h3 style={styles.resultHeader}>KLASIFIKASI</h3>
                <p style={styles.resultText}>{klasifikasi()}</p>
              </div>

              <div style={{
                ...styles.resultItem,
                background: klasifikasi() === "NORMAL" ? "rgba(31, 122, 79, 0.4)" : "rgba(196, 43, 43, 0.4)",
                border: klasifikasi() === "NORMAL" ? "1px solid #1f7a4f" : "1px solid #c42b2b"
              }}>
                <h3 style={styles.resultHeader}>STATUS</h3>
                <p style={styles.resultText}>{status()}</p>
              </div>
            </div>

            <div style={{
              ...styles.motivationBox,
              borderLeft: klasifikasi() === "NORMAL" ? "4px solid #1f7a4f" : "4px solid #d4af37"
            }}>
              <span style={styles.motivationLabel}>PESAN/REKOMENDASI:</span>
              <p style={styles.motivationText}>"{kataPenyemangat()}"</p>
            </div>
          </div>
        )}

        <div style={styles.footer}>
          © 2026 SOPS YONKES 2/YBH/2 KOSTRAD. ALL RIGHTS RESERVED.
        </div>

      </div>
    </div>
  );
}

const styles = {
  body: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a120d, #13281c, #1f3d2b, #0b1710)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "4vw 20px", 
    fontFamily: '"Courier New", Courier, monospace, sans-serif',
    boxSizing: "border-box"
  },
  card: {
    width: "100%",
    maxWidth: "850px",
    background: "rgba(15, 27, 20, 0.92)",
    borderRadius: "20px",
    padding: "clamp(20px, 4vw, 40px)", 
    border: "2px solid #3c6346",
    boxShadow: "0 0 25px rgba(0, 255, 80, 0.15)",
    boxSizing: "border-box"
  },
  logo: {
    width: "clamp(75px, 12vw, 100px)", 
    height: "auto",
    display: "block",
    margin: "0 auto 15px auto",
    filter: "drop-shadow(0 0 8px rgba(212, 175, 55, 0.4))"
  },
  title: {
    color: "#d4af37", 
    fontSize: "clamp(20px, 3.5vw, 32px)", 
    textAlign: "center",
    margin: "0 0 5px 0",
    fontWeight: "bold",
    letterSpacing: "1px"
  },
  subtitle: {
    color: "#8dc59d",
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "clamp(12px, 2vw, 16px)",
    letterSpacing: "1px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", 
    gap: "20px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  label: {
    color: "#8dc59d",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "1px"
  },
  input: {
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #3c6346",
    background: "#0d1812",
    color: "white",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    width: "100%"
  },
  select: {
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #3c6346",
    background: "#0d1812",
    color: "white",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    width: "100%",
    cursor: "pointer"
  },
  button: {
    width: "100%",
    marginTop: "30px",
    padding: "16px",
    borderRadius: "8px",
    border: "none",
    background: "#d4af37", 
    color: "#0a120d",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    letterSpacing: "1px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    transition: "background 0.2s"
  },
  resultBox: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
    gap: "20px"
  },
  resultItem: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "20px",
    borderRadius: "12px",
    color: "white",
    textAlign: "center",
    boxSizing: "border-box"
  },
  resultHeader: {
    margin: "0 0 10px 0",
    fontSize: "13px",
    color: "#8dc59d",
    letterSpacing: "1px"
  },
  resultText: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold"
  },
  motivationBox: {
    marginTop: "20px",
    background: "rgba(20, 38, 26, 0.6)",
    padding: "18px 20px",
    borderRadius: "8px",
    boxSizing: "border-box"
  },
  motivationLabel: {
    color: "#8dc59d",
    fontSize: "11px",
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
    letterSpacing: "1px"
  },
  motivationText: {
    color: "#ffffff",
    fontSize: "14px",
    margin: 0,
    lineHeight: "1.5",
    fontStyle: "italic",
    letterSpacing: "0.5px"
  },
  footer: {
    color: "#55725c",
    textAlign: "center",
    marginTop: "40px",
    fontSize: "11px",
    letterSpacing: "1px",
    borderTop: "1px solid #1a3022",
    paddingTop: "15px"
  }
};