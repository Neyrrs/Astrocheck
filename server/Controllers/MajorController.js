import { supabase } from "../config/Supabase.js";

export const createMajor = async (req, res) => {
  try {
    const { major_code, major_name, major_fullname, duration } = req.body;

    if (!major_code || !major_name || !major_fullname) {
      return res.status(400).json({ message: "Field tidak boleh kosong!" });
    }

    const { data: existingMajor } = await supabase
      .from("table_major")
      .select("*")
      .eq("major_code", major_code.trim())
      .single();

    if (existingMajor) {
      return res.status(400).json({ message: "Kode jurusan sudah ada!" });
    }

    const { data: newMajor, error } = await supabase
      .from("table_major")
      .insert([
        {
          major_code: major_code.trim(),
          major_name: major_name.trim(),
          major_fullname: major_fullname.trim(),
          duration: duration?.trim() ?? "",
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res
      .status(201)
      .json({ message: "Jurusan berhasil dibuat!", major: newMajor });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

export const getAllMajors = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const to = offset + parseInt(limit) - 1;

    const {
      data: majors,
      error,
      count,
    } = await supabase
      .from("table_major")
      .select("*", { count: "exact" })
      .range(offset, to);

    if (error) throw error;

    res.status(200).json({
      data: majors,
      currentPage: parseInt(page),
      perPage: parseInt(limit),
      totalData: count,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error!",
      error: error.message,
    });
  }
};

export const updateMajor = async (req, res) => {
  try {
    const { id } = req.params;
    const { major_code, major_name, major_fullname, duration } = req.body;

    const { data: updatedMajor, error } = await supabase
      .from("table_major")
      .update({ major_code, major_name, major_fullname, duration })
      .eq("id_major", id)
      .select()
      .single();

    if (error) throw error;
    if (!updatedMajor) {
      return res.status(404).json({ message: "Jurusan tidak ditemukan!" });
    }

    res
      .status(200)
      .json({ message: "Jurusan berhasil diperbarui!", major: updatedMajor });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

export const deleteMajor = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("table_major")
      .delete()
      .eq("id_major", id);

    if (error) throw error;

    res.status(200).json({ message: "Jurusan berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

export const getMajorById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: major, error } = await supabase
      .from("table_major")
      .select("*")
      .eq("id_major", id)
      .single();

    if (error) throw error;
    if (!major) {
      return res.status(404).json({ message: "Jurusan tidak ditemukan!" });
    }

    res.status(200).json(major);
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};
