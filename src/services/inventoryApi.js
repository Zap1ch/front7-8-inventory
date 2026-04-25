const API_URL = "http://127.0.0.1:3000";

export async function getInventory() {
  const response = await fetch(`${API_URL}/inventory`);

  if (!response.ok) {
    throw new Error("Не вдалося отримати список інвентарю");
  }

  return response.json();
}

export async function getInventoryItem(id) {
  const response = await fetch(`${API_URL}/inventory/${id}`);

  if (!response.ok) {
    throw new Error("Не вдалося отримати дані інвентарю");
  }

  return response.json();
}

export async function createInventoryItem(formData) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Не вдалося створити інвентар");
  }

  return response.json();
}

export async function updateInventoryItem(id, data) {
  const response = await fetch(`${API_URL}/inventory/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Не вдалося оновити інвентар");
  }

  return response.json();
}

export async function updateInventoryPhoto(id, formData) {
  const response = await fetch(`${API_URL}/inventory/${id}/photo`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Не вдалося оновити фото");
  }

  return response.json();
}

export async function deleteInventoryItem(id) {
  const response = await fetch(`http://127.0.0.1:3000/inventory/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Не вдалося видалити інвентар");
  }

  return true; 
}

export function getInventoryPhotoUrl(id) {
  return `${API_URL}/inventory/${id}/photo`;
}