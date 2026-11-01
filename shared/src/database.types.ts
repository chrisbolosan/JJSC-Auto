export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.18';
  };
  public: {
    Tables: {
      CUSTOMER: {
        Row: {
          city: string | null;
          email: string;
          name: string;
          street: string | null;
          zip_code: string | null;
        };
        Insert: {
          city?: string | null;
          email: string;
          name: string;
          street?: string | null;
          zip_code?: string | null;
        };
        Update: {
          city?: string | null;
          email?: string;
          name?: string;
          street?: string | null;
          zip_code?: string | null;
        };
        Relationships: [];
      };
      INVENTORY: {
        Row: {
          part_no: number;
          quantity: number;
        };
        Insert: {
          part_no: number;
          quantity: number;
        };
        Update: {
          part_no?: number;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'INVENTORY_part_no_fkey';
            columns: ['part_no'];
            isOneToOne: true;
            referencedRelation: 'LEGACY';
            referencedColumns: ['part_no'];
          },
        ];
      };
      LEGACY: {
        Row: {
          description: string;
          img_url: string | null;
          part_no: number;
          price: number | null;
          weight: number | null;
        };
        Insert: {
          description: string;
          img_url?: string | null;
          part_no?: number;
          price?: number | null;
          weight?: number | null;
        };
        Update: {
          description?: string;
          img_url?: string | null;
          part_no?: number;
          price?: number | null;
          weight?: number | null;
        };
        Relationships: [];
      };
      ORDER_ITEMS: {
        Row: {
          order_id: number;
          part_no: number;
          quantity: number | null;
        };
        Insert: {
          order_id: number;
          part_no: number;
          quantity?: number | null;
        };
        Update: {
          order_id?: number;
          part_no?: number;
          quantity?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ORDER_ITEMS_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'ORDERS';
            referencedColumns: ['order_id'];
          },
          {
            foreignKeyName: 'ORDER_ITEMS_part_no_fkey';
            columns: ['part_no'];
            isOneToOne: false;
            referencedRelation: 'LEGACY';
            referencedColumns: ['part_no'];
          },
        ];
      };
      ORDERS: {
        Row: {
          auth_number: number | null;
          email: string;
          order_id: number;
          shipping: number | null;
          status: string;
          total_price: number | null;
          total_weight: number;
        };
        Insert: {
          auth_number?: number | null;
          email: string;
          order_id?: number;
          shipping?: number | null;
          status: string;
          total_price?: number | null;
          total_weight?: number;
        };
        Update: {
          auth_number?: number | null;
          email?: string;
          order_id?: number;
          shipping?: number | null;
          status?: string;
          total_price?: number | null;
          total_weight?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'ORDERS_email_fkey';
            columns: ['email'];
            isOneToOne: false;
            referencedRelation: 'CUSTOMER';
            referencedColumns: ['email'];
          },
        ];
      };
      RECEIVING_LOG: {
        Row: {
          added: number | null;
          id: number;
          part_no: number;
          received: string | null;
        };
        Insert: {
          added?: number | null;
          id?: number;
          part_no: number;
          received?: string | null;
        };
        Update: {
          added?: number | null;
          id?: number;
          part_no?: number;
          received?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'RECEIVING_LOG_part_no_fkey';
            columns: ['part_no'];
            isOneToOne: false;
            referencedRelation: 'LEGACY';
            referencedColumns: ['part_no'];
          },
        ];
      };
      SHIPPING_BRACKET: {
        Row: {
          id: number;
          max_weight: number | null;
          min_weight: number | null;
          shipping_charge: number;
        };
        Insert: {
          id?: number;
          max_weight?: number | null;
          min_weight?: number | null;
          shipping_charge: number;
        };
        Update: {
          id?: number;
          max_weight?: number | null;
          min_weight?: number | null;
          shipping_charge?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
