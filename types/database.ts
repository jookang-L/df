export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      students: {
        Row: {
          id: string;
          student_number: string;
          name: string;
          password_hash: string;
          total_score: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_number: string;
          name: string;
          password_hash: string;
          total_score?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_number?: string;
          name?: string;
          password_hash?: string;
          total_score?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      mission_attempts: {
        Row: {
          id: string;
          student_id: string;
          mission_id: string;
          difficulty: "쉬움" | "보통" | "어려움";
          is_correct: boolean;
          wrong_attempts: number;
          earned_score: number;
          submitted_code: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          mission_id: string;
          difficulty: "쉬움" | "보통" | "어려움";
          is_correct?: boolean;
          wrong_attempts?: number;
          earned_score?: number;
          submitted_code?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          mission_id?: string;
          difficulty?: "쉬움" | "보통" | "어려움";
          is_correct?: boolean;
          wrong_attempts?: number;
          earned_score?: number;
          submitted_code?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "mission_attempts_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      leaderboard_view: {
        Row: {
          id: string;
          student_number: string;
          name: string;
          total_score: number;
          created_at: string;
        };
        Relationships: [];
      };
    };
    Functions: {
      recalculate_student_total_score: {
        Args: { p_student_id: string };
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Student = Database["public"]["Tables"]["students"]["Row"];
export type MissionAttempt = Database["public"]["Tables"]["mission_attempts"]["Row"];
