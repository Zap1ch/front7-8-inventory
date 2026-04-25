import { useState } from "react";

function InventoryForm({
  initialValues = { name: "", description: "" },
  onSubmit,
  submitText = "Зберегти",
  withPhoto = false,
}) {
  const [name, setName] = useState(initialValues.name || "");
  const [description, setDescription] = useState(
    initialValues.description || ""
  );
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Назва обов’язкова");
      return;
    }

    setError("");

    onSubmit({
      name,
      description,
      photo,
    });
  }

  return (
    <form className="inventory-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}

      <label>
        Назва *
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Опис
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      {withPhoto && (
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
      )}

      <button className="primary-btn">{submitText}</button>
    </form>
  );
}

export default InventoryForm;