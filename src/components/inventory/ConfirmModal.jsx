function ConfirmModal({ item, onConfirm, onCancel }) {
  if (!item) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Підтвердження видалення</h2>

        <p>
          Ви дійсно хочете видалити інвентар:
          <strong> {item.inventory_name}</strong>?
        </p>

        <div className="modal-actions">
          <button onClick={onCancel} className="secondary-btn">
            Скасувати
          </button>

          <button onClick={onConfirm} className="danger-btn">
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;