import mongoose from 'mongoose';

const presenceSchema = new mongoose.Schema({
  NISN: {
    type: String,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  kelas: {
    type: String,
    required: true,
  },
  alasan: {
    type: String,
    required: true,
  },
});

const Presence = mongoose.model('Presence', presenceSchema);
export default Presence;
