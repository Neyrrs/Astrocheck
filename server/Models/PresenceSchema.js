import mongoose from 'mongoose';

const presenceSchema = new mongoose.Schema({
  nisn: {
    type: Number,
    required: true,
  },
  fullName: {
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
    default: () => new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
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
  nickname :{
    type: String,
    required: false,
    default: "",
  },
  email : {
    type: String,
    required: true,
    default: "",
  },
  detailAlasan: {
    type: String,
    required: false,
    default: "",
  },
});

const Presence = mongoose.model('Presence', presenceSchema);
export default Presence;
