import mongoose from "mongoose";

const PresenceSchema = new mongoose.Schema(
  {
    nisn:  {type: String, ref: "user"},
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
      enum: ["Membaca", "Meminjam", "Lainnya"],
      required: true,
    },
    detailReason: {
      type: String,
      optional: true,
    },
  },
  {
    timestamps: true,
  }
);

const Presence = mongoose.model("Presence", PresenceSchema);
export default Presence;
