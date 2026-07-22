import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { api, type DietType, type MenuItem, type SiteSettings } from "../../lib/api";
import { MenuItemEditor } from "./MenuItemEditor";

const emptyItem = {
  name: "",
  category: "",
  description: "",
  dietType: "VEG" as DietType,
  isPopular: false,
  sortOrder: 0,
};

export function AdminDashboard() {
  const { email, logout } = useAuth();
  const navigate = useNavigate();

  const [items, setItems] = useState<MenuItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [newItem, setNewItem] = useState(emptyItem);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function loadData() {
    api.getMenu().then(setItems);
    api.getSettings().then(setSettings);
  }

  useEffect(loadData, []);

  async function handleLogout() {
    await logout();
    navigate("/admin/login");
  }

  async function handleAddItem(e: FormEvent) {
    e.preventDefault();
    if (!newItem.name || !newItem.category) return;
    await api.createMenuItem(newItem);
    setNewItem(emptyItem);
    loadData();
  }

  async function handleSaveSettings(e: FormEvent) {
    e.preventDefault();
    if (!settings) return;
    await api.updateSettings(settings);
    setMessage("Settings saved.");
    setTimeout(() => setMessage(null), 3000);
  }

  async function handleHeroUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !settings) return;
    setUploading(true);
    try {
      const { url } = await api.uploadImage(file);
      setSettings({ ...settings, heroImageUrl: url });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="container section admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div>
          <span>{email}</span>
          <button className="btn btn-outline" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>

      <section>
        <h2>Menu Items</h2>
        <p className="admin-hint">
          Edit name/category/description inline (saves when you click away),
          switch the diet type, upload a photo, or mark a dish as a favorite.
        </p>

        <div className="menu-item-editor-list">
          {items.map((item) => (
            <MenuItemEditor
              key={item.id}
              item={item}
              onChanged={loadData}
              onDeleted={loadData}
            />
          ))}
        </div>

        <form onSubmit={handleAddItem} className="admin-inline-form">
          <input
            placeholder="Dish name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <input
            placeholder="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          />
          <input
            placeholder="Description (optional)"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          />
          <select
            value={newItem.dietType}
            onChange={(e) =>
              setNewItem({ ...newItem, dietType: e.target.value as DietType })
            }
          >
            <option value="VEG">Veg</option>
            <option value="NON_VEG">Non-Veg</option>
            <option value="EGG">Contains Egg</option>
          </select>
          <button type="submit" className="btn btn-small">
            Add Dish
          </button>
        </form>
      </section>

      {settings && (
        <section>
          <h2>Site Settings</h2>
          <form onSubmit={handleSaveSettings} className="admin-settings-form">
            <label>
              Tagline
              <input
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              />
            </label>
            <label>
              Small plate price
              <input
                value={settings.smallPlatePrice}
                onChange={(e) =>
                  setSettings({ ...settings, smallPlatePrice: e.target.value })
                }
              />
            </label>
            <label>
              Large plate price
              <input
                value={settings.largePlatePrice}
                onChange={(e) =>
                  setSettings({ ...settings, largePlatePrice: e.target.value })
                }
              />
            </label>
            <label>
              Halal certification text
              <textarea
                value={settings.halalCertText}
                onChange={(e) =>
                  setSettings({ ...settings, halalCertText: e.target.value })
                }
              />
            </label>
            <label>
              Hero image
              <input type="file" accept="image/*" onChange={handleHeroUpload} />
              {uploading && <span> Uploading…</span>}
              {settings.heroImageUrl && (
                <img
                  src={settings.heroImageUrl}
                  alt="Current hero"
                  className="admin-hero-preview"
                />
              )}
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.showReviewsWidget}
                onChange={(e) =>
                  setSettings({ ...settings, showReviewsWidget: e.target.checked })
                }
              />
              Show Google reviews widget
            </label>
            {message && <p className="form-success">{message}</p>}
            <button type="submit" className="btn">
              Save Settings
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
