import { useEffect, useState } from "react";
import { api, type DietType, type MenuItem } from "../../lib/api";

const DIET_OPTIONS: { value: DietType; label: string }[] = [
  { value: "VEG", label: "Veg" },
  { value: "NON_VEG", label: "Non-Veg" },
  { value: "EGG", label: "Contains Egg" },
];

interface Props {
  item: MenuItem;
  onChanged: () => void;
  onDeleted: () => void;
}

export function MenuItemEditor({ item, onChanged, onDeleted }: Props) {
  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [description, setDescription] = useState(item.description ?? "");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setName(item.name);
    setCategory(item.category);
    setDescription(item.description ?? "");
  }, [item.id]);

  async function saveText() {
    if (
      name === item.name &&
      category === item.category &&
      description === (item.description ?? "")
    ) {
      return;
    }
    await api.updateMenuItem(item.id, { name, category, description });
    onChanged();
  }

  async function handleDietChange(dietType: DietType) {
    await api.updateMenuItem(item.id, { dietType });
    onChanged();
  }

  async function handleTogglePopular() {
    await api.updateMenuItem(item.id, { isPopular: !item.isPopular });
    onChanged();
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await api.uploadImage(file);
      await api.updateMenuItem(item.id, { imageUrl: url });
      onChanged();
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete "${item.name}"?`)) return;
    await api.deleteMenuItem(item.id);
    onDeleted();
  }

  return (
    <div className="menu-item-editor">
      <div className="menu-item-editor-image">
        {item.imageUrl && <img src={item.imageUrl} alt={item.name} />}
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {uploading && <span className="uploading-note">Uploading…</span>}
      </div>

      <div className="menu-item-editor-fields">
        <div className="menu-item-editor-row">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={saveText}
            placeholder="Dish name"
          />
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            onBlur={saveText}
            placeholder="Category"
          />
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={saveText}
          placeholder="Short, mouth-watering description…"
        />

        <div className="menu-item-editor-row menu-item-editor-controls">
          <select
            value={item.dietType}
            onChange={(e) => handleDietChange(e.target.value as DietType)}
          >
            {DIET_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={item.isPopular}
              onChange={handleTogglePopular}
            />
            Most Popular
          </label>

          <button
            type="button"
            className="btn btn-outline btn-small"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
