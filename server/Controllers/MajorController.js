import Major from "../Models/MajorSchema.js";

export const createMajor = async (req, res) => {
  try {
    const { major_code, major_name, majorFullName, duration } = req.body;

    if (!major_code || !major_name || !majorFullName) {
      return res.status(400).json({ message: "Field tidak boleh kosong!" });
    }

    const existingMajor = await Major.findOne({ major_code: major_code.trim() });
    if (existingMajor) {
      return res.status(400).json({ message: "Kode jurusan sudah ada!" });
    }

    const newMajor = new Major({
      major_code: major_code.trim(),
      major_name: major_name.trim(),
      majorFullName: majorFullName.trim(),
      duration: duration?.trim() ?? "",
    });

    await newMajor.save();

    res.status(201).json({ message: "Jurusan berhasil dibuat!", major: newMajor });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};


export const getAllMajors = async (req, res) => {
  try {
    const majors = await Major.find();
    res.status(200).json(majors);
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};

export const updateMajor = async (req, res) => {
  try {
    const { id } = req.params;
    const { major_code, major_name, majorFullName, duration } = req.body;

    const updatedMajor = await Major.findByIdAndUpdate(
      id,
      { major_code, major_name, majorFullName, duration },
      { new: true }
    );

    if (!updatedMajor) {
      return res.status(404).json({ message: "Jurusan tidak ditemukan!" });
    }

    res.status(200).json({ message: "Jurusan berhasil diperbarui!", major: updatedMajor });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};

export const deleteMajor = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMajor = await Major.findByIdAndDelete(id);

    if (!deletedMajor) {
      return res.status(404).json({ message: "Jurusan tidak ditemukan!" });
    }

    res.status(200).json({ message: "Jurusan berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};

export const getMajorById = async (req, res) => {
  try {
    const { id } = req.params;

    const major = await Major.findById(id);

    if (!major) {
      return res.status(404).json({ message: "Jurusan tidak ditemukan!" });
    }

    res.status(200).json(major);
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};
