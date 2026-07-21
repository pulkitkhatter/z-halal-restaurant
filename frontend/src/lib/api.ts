const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export type DietType = "VEG" | "NON_VEG" | "EGG";

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string | null;
  dietType: DietType;
  imageUrl: string | null;
  isPopular: boolean;
  sortOrder: number;
}

export interface NewMenuItemInput {
  name: string;
  category: string;
  description?: string;
  dietType?: DietType;
  imageUrl?: string;
  isPopular?: boolean;
  sortOrder?: number;
}

export interface SiteSettings {
  tagline: string;
  pricePerPoundLabel: string;
  halalCertText: string;
  heroImageUrl: string | null;
  showReviewsWidget: boolean;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed (${res.status})`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  getMenu: () => request<MenuItem[]>("/api/menu"),
  createMenuItem: (data: NewMenuItemInput) =>
    request<MenuItem>("/api/menu", { method: "POST", body: JSON.stringify(data) }),
  updateMenuItem: (id: string, data: Partial<Omit<MenuItem, "id">>) =>
    request<MenuItem>(`/api/menu/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteMenuItem: (id: string) =>
    request<void>(`/api/menu/${id}`, { method: "DELETE" }),

  getSettings: () => request<SiteSettings>("/api/settings"),
  updateSettings: (data: Partial<SiteSettings>) =>
    request<SiteSettings>("/api/settings", { method: "PUT", body: JSON.stringify(data) }),

  login: (email: string, password: string) =>
    request<{ email: string }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  logout: () => request<{ ok: boolean }>("/api/auth/logout", { method: "POST" }),
  me: () => request<{ email: string }>("/api/auth/me"),

  uploadImage: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error ?? `Upload failed (${res.status})`);
    }
    return res.json();
  },
};
