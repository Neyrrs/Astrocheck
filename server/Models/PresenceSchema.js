import mongoose from 'mongoose';

const presenceSchema = new mongoose.Schema({
  nisn: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  kelas: {
    type: String,
    required: true,
  },
  jurusan: {
    type: String,
    required: true,
  },
  alasan: {
    type: String,
    required: true,
  },
  detailAlasan: {
    type: String,
    required: false,
    default: ""
  },
});

const Presence = mongoose.model('Presence', presenceSchema);
export default Presence;
