export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  features: string[];
  demo_video_url?: string;
  thumbnail_url?: string;
  category: string;
  is_active: boolean;
  sort_order: number;
}

export interface CartItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface DiscountCode {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  minimum_purchase: number;
  max_uses?: number;
  times_used: number;
  active: boolean;
  expires_at?: string;
}

export interface QuizResponse {
  email: string;
  business_type: string;
  current_challenges: string;
  automation_goals: string;
  company_size: string;
  current_tools: string;
  budget_range: string;
  timeline: string;
  additional_notes: string;
}
