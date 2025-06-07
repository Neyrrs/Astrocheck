export const getPresenceCounts = async (filter = {}) => {
  const [membaca, meminjam, lainnya] = await Promise.all([
    Presence.countDocuments({ ...filter, reason: "Membaca" }),
    Presence.countDocuments({ ...filter, reason: "Meminjam" }),
    Presence.countDocuments({ ...filter, reason: "Lainnya" }),
  ]);
  return { membaca, meminjam, lainnya };
};
