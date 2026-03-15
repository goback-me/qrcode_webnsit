export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  author_id: string;
  featured_image?: string;
  category: string;
  tags: string[];
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
  published: boolean;
  draft: boolean;
  is_indexed: boolean;
  views: number;
  reading_time: number;
}

export interface CreateBlogPostInput {
  title: string;
  slug?: string;
  content: string;
  excerpt: string;
  featured_image?: string;
  category: string;
  tags: string[];
  meta_title?: string;
  meta_description?: string;
  draft: boolean;
  is_indexed: boolean;
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
