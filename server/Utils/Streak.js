// utils/streak.js
export const calculateStreak = async (nis) => {
  const now = new Date();
  const formattedToday = now.toISOString().slice(0, 10);
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  const lastPresence = await Presence.findOne({ nis }).sort({ date: -1 });
  if (!lastPresence) return 1;

  return lastPresence.date === yesterdayStr ? (await User.findOne({ nis })).streak + 1 : 1;
};
