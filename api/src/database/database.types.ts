export type Database = {
  public: {
    Tables: {
      documents: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content_raw: string | null;
          created_at: string;
          updated_at: string;
        };

        Insert: {
          id?: string;
          user_id: string;
          title?: string;
          content_raw?: string | null;
          created_at?: string;
          updated_at?: string;
        };

        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          content_raw?: string | null;
          created_at?: string;
          updated_at?: string;
        };

        Relationships: [];
      };
    };

    Views: Record<string, never>;

    Functions: Record<string, never>;

    Enums: Record<string, never>;

    CompositeTypes: Record<string, never>;
  };
};
