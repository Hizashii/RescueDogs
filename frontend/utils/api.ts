import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();
const baseUrl = config.public.apiBase || 'https://rescuedogs-1.onrender.com';

export async function fetchBlogs(): Promise<any[]> {
  const res = await fetch(`${baseUrl}/api/blogs?published=true`);
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();
  return data.map((blog: any) => ({ ...blog, featuredImage: blog.featuredImage || '' }));
}

export async function fetchBlogById(id: string): Promise<any> {
  const res = await fetch(`${baseUrl}/api/blogs/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();
  return { ...data, featuredImage: data.featuredImage || '' };
}
