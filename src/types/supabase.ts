export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          mobile: string;
          address: string;
          seat_no: string;
          joining_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          mobile: string;
          address: string;
          seat_no: string;
          joining_date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          mobile?: string;
          address?: string;
          seat_no?: string;
          joining_date?: string;
          created_at?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          user_id: string;
          payment_date: string;
          payment_mode: string;
          amount: number;
          paid_for_month: string;
          remarks: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          payment_date: string;
          payment_mode: string;
          amount: number;
          paid_for_month: string;
          remarks?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          payment_date?: string;
          payment_mode?: string;
          amount?: number;
          paid_for_month?: string;
          remarks?: string | null;
          created_at?: string;
        };
      };
    };
  };
}; 