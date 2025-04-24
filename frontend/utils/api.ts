// src/utils/api.ts
const API_BASE = 'http://localhost:5000/api/blogs';

export async function fetchBlogs(): Promise<any[]> {
  const res = await fetch(`${API_BASE}?published=true`);
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export async function fetchBlogById(id: string): Promise<any> {
  const res = await fetch(`${API_BASE}/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}
