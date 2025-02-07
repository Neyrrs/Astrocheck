import presence from "../Models/PresenceSchema.js";

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

    res.status(201).json({
      message: "Data berhasil disimpan",
      data: Presence,
    });
  } catch (error) {
    res.status(400).json({ message: "Gagal menyimpan data", error: error.message });
  }
};


export const deletePresence = async (req, res) => {
  try {
    const Presence = await presence.findByIdAndDelete(req.params.id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
