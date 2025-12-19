/**
 * Supabase Database Types
 * Supabase CLI로 자동 생성되는 타입 정의
 * 
 * 생성 명령어:
 * npx supabase gen types typescript --project-id "your-project-id" > types/supabase.ts
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string
          email: string
          password_hash: string
          name: string
          role: "super_admin" | "admin" | "editor" | "viewer"
          is_active: boolean
          last_login_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          name: string
          role?: "super_admin" | "admin" | "editor" | "viewer"
          is_active?: boolean
          last_login_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          name?: string
          role?: "super_admin" | "admin" | "editor" | "viewer"
          is_active?: boolean
          last_login_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      members: {
        Row: {
          id: string
          company: string
          manager: string
          country: string
          business_number: string
          email: string
          phone: string | null
          registration_date: string
          status: "waiting" | "approved" | "rejected"
          business_license_url: string | null
          memo: string | null
          rejection_reason: string | null
          created_at: string
          updated_at: string
          approved_by: string | null
          approved_at: string | null
        }
        Insert: {
          id?: string
          company: string
          manager: string
          country: string
          business_number: string
          email: string
          phone?: string | null
          registration_date?: string
          status?: "waiting" | "approved" | "rejected"
          business_license_url?: string | null
          memo?: string | null
          rejection_reason?: string | null
          created_at?: string
          updated_at?: string
          approved_by?: string | null
          approved_at?: string | null
        }
        Update: {
          id?: string
          company?: string
          manager?: string
          country?: string
          business_number?: string
          email?: string
          phone?: string | null
          registration_date?: string
          status?: "waiting" | "approved" | "rejected"
          business_license_url?: string | null
          memo?: string | null
          rejection_reason?: string | null
          created_at?: string
          updated_at?: string
          approved_by?: string | null
          approved_at?: string | null
        }
      }
      products: {
        Row: {
          id: string
          name: string
          grade: number // 1~5 별점
          production_date: string
          code: string
          origin: string
          price: number
          description: string | null
          thumbnail_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          name: string
          grade: number // 1~5 별점
          production_date: string
          code: string
          origin: string
          price: number
          description?: string | null
          thumbnail_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          name?: string
          grade?: number // 1~5 별점
          production_date?: string
          code?: string
          origin?: string
          price?: number
          description?: string | null
          thumbnail_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
      }
      reservations: {
        Row: {
          id: string
          member_id: string
          product_id: string
          reservation_date: string
          quantity: number
          total_price: number | null
          status: "waiting" | "approved" | "rejected"
          memo: string | null
          rejection_reason: string | null
          created_at: string
          updated_at: string
          processed_by: string | null
          processed_at: string | null
        }
        Insert: {
          id?: string
          member_id: string
          product_id: string
          reservation_date: string
          quantity?: number
          total_price?: number | null
          status?: "waiting" | "approved" | "rejected"
          memo?: string | null
          rejection_reason?: string | null
          created_at?: string
          updated_at?: string
          processed_by?: string | null
          processed_at?: string | null
        }
        Update: {
          id?: string
          member_id?: string
          product_id?: string
          reservation_date?: string
          quantity?: number
          total_price?: number | null
          status?: "waiting" | "approved" | "rejected"
          memo?: string | null
          rejection_reason?: string | null
          created_at?: string
          updated_at?: string
          processed_by?: string | null
          processed_at?: string | null
        }
      }
      market_prices: {
        Row: {
          id: string
          country: "korea" | "china" | "japan"
          date: string
          price: number
          memo: string | null
          author_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          country: "korea" | "china" | "japan"
          date: string
          price: number
          memo?: string | null
          author_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          country?: "korea" | "china" | "japan"
          date?: string
          price?: number
          memo?: string | null
          author_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      notices: {
        Row: {
          id: string
          title: string
          content: string
          category: "notice" | "news"
          is_published: boolean
          view_count: number
          author_id: string | null
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          title: string
          content: string
          category: "notice" | "news"
          is_published?: boolean
          view_count?: number
          author_id?: string | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          content?: string
          category?: "notice" | "news"
          is_published?: boolean
          view_count?: number
          author_id?: string | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
      audit_logs: {
        Row: {
          id: string
          table_name: string
          record_id: string
          action: "INSERT" | "UPDATE" | "DELETE"
          old_data: Json | null
          new_data: Json | null
          user_id: string | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          table_name: string
          record_id: string
          action: "INSERT" | "UPDATE" | "DELETE"
          old_data?: Json | null
          new_data?: Json | null
          user_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          table_name?: string
          record_id?: string
          action?: "INSERT" | "UPDATE" | "DELETE"
          old_data?: Json | null
          new_data?: Json | null
          user_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      reservations_detailed: {
        Row: {
          id: string
          reservation_date: string
          quantity: number
          total_price: number | null
          status: string
          memo: string | null
          rejection_reason: string | null
          created_at: string
          updated_at: string
          processed_at: string | null
          member_id: string
          company: string
          manager: string
          member_email: string
          member_phone: string | null
          member_country: string
          product_id: string
          product_name: string
          product_grade: string
          product_code: string
          product_unit_price: number
          product_thumbnail: string | null
          processed_by_name: string | null
          processed_by_email: string | null
        }
      }
      dashboard_stats: {
        Row: {
          pending_members: number
          pending_reservations: number
          new_products_week: number
          updated_countries: number
        }
      }
    }
    Functions: {
      approve_member: {
        Args: {
          p_member_id: string
          p_admin_id: string
          p_memo?: string
        }
        Returns: Json
      }
      reject_member: {
        Args: {
          p_member_id: string
          p_admin_id: string
          p_rejection_reason: string
        }
        Returns: Json
      }
      approve_reservation: {
        Args: {
          p_reservation_id: string
          p_admin_id: string
        }
        Returns: Json
      }
      reject_reservation: {
        Args: {
          p_reservation_id: string
          p_admin_id: string
          p_rejection_reason: string
        }
        Returns: Json
      }
      toggle_notice_published: {
        Args: {
          p_notice_id: string
        }
        Returns: Json
      }
    }
  }
}

