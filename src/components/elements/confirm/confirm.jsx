import style from "./confirmation.module.css";
const handleDelete = (employeeId) => {
  const confirmation = window.confirm(
    "Are you sure you want to delete this item?"
  );
  if (confirmation) {
    // Lakukan penghapusan item
    fetch(`http://localhost:5000/employee/${employeeId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Menghapus item dengan ID: ${employeeId}`);
          // Refresh halaman setelah penghapusan berhasil
          window.location.reload();
        } else {
          console.error("Gagal menghapus item.");
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
      });
  }
};

const ConfirmationPopup = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "300px",
        padding: "20px",
        textAlign: "center",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ color: "red", fontSize: "18px" }}>!</div>
      <div style={{ fontSize: "18px", marginTop: "10px" }}>Are you sure?</div>
      <div style={{ fontSize: "14px", marginTop: "10px", color: "#777" }}>
        Are you sure you want to delete this item?
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          style={{
            backgroundColor: "#da3e33f7",
            color: "white",
            padding: "8px 16px",
            margin: "0 10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleDelete}
        >
          Yes
        </button>
        <button style={{ backgroundColor: "#ccc" }}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
