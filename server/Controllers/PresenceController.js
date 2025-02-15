import presence from "../Models/PresenceSchema.js";
import logSchema from "../Models/PresencesLogSchema.js";

export const getPresence = async (req, res) => {
  try {
    const Presence = await presence.find();
    res.json(Presence);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPresenceById = async (req, res) => {
  try {
    const Presence = await presence.findById(req.params.id);
    res.json(Presence);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const savePresence = async (req, res) => {
  try {
    const Presence = new presence(req.body);
    await Presence.save();
    await logSchema.create({
      fullName: req.body.fullName,
      date: new Date(),
      alasan: req.body.alasan,
    });

    res.status(201).json({
      message: "Data presensi berhasil disimpan",
      data: Presence,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Gagal menyimpan data", error: error.message });
  }
};

export const deletePresence = async (req, res) => {
  try {
    const Presence = await presence.findByIdAndDelete(req.params.id);
    if (!Presence) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    res.json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
