export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      aircraft: {
        Row: {
          id: string
          registration: string
          type: string
          status: string
          maintenance_due: string | null
          total_hours: number | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          registration: string
          type: string
          status?: string
          maintenance_due?: string | null
          total_hours?: number | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          registration?: string
          type?: string
          status?: string
          maintenance_due?: string | null
          total_hours?: number | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      staff: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          status: string
          role: string | null
          qualifications: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          status?: string
          role?: string | null
          qualifications?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          status?: string
          role?: string | null
          qualifications?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      // ... rest of the tables remain the same
    }
  }
}