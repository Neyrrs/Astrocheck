import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();
export const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export const countPresencesByReason = async (reason, date_filter = {}) => {
  const query = supabase
    .from("table_guest")
    .select("*", { count: "exact", head: true })
    .eq("reason", reason);

  if (date_filter.start_date) {
    query.gte("date", date_filter.start_date);
  }
  if (date_filter.end_date) {
    query.lte("date", date_filter.end_date);
  }

  const { count } = await query;
  return count || 0;
};

export const getUserWithMajor = async (nis) => {
  const { data, error } = await supabase
    .from("table_user")
    .select(`
      *,
      major_id (
        major_name,
        major_code
      )
    `)
    .eq("nis", nis)
    .single();

  if (error) throw error;
  return data;
};

export const getPresenceStats = async (filters = {}) => {
  const query = supabase.from("table_guest_book").select("*", { count: "exact" });

  const finalQuery = buildQuery(query, filters);
  const { count } = await finalQuery;

  return count || 0;
};

export const getMajorPresences = async (major_id) => {
  const { data } = await supabase
    .from("table_guest_book")
    .select(`
      *,
      table_user!inner(
        nis,
        full_name,
        major_id
      )
    `)
    .eq("table_user.major_id", major_id);

  return data || [];
};
