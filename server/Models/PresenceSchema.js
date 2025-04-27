import mongoose from "mongoose";

const PresenceSchema = new mongoose.Schema(
  {
    nisn: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
      default: () => new Date().toISOString().slice(0, 10),
    },
    time: {
      type: String,
      required: true,
      default: () =>
        new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    reason: {
      type: String,
      enum: ["Membaca", "Meminjam", "Lainnya"], // bisa disesuaikan
      required: true,
    },
    detail_reason: {
      type: String, // opsional, penjelasan tambahan
    },
  },
  {
    timestamps: true,
  }
);

const Presence = mongoose.model("Presence", PresenceSchema);
export default Presence;
