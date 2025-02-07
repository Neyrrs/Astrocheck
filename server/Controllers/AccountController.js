import Account from "../Models/AccountSchema.js";

export const getAccounts = async (req, res) => {
  try {
    const account = await Account.find();
    res.json(account);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export const getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    res.json(account);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export const saveAccount = async (req, res) => {
  try {
    const account = await Account(req.body);
    await account.save();
    res.status(201).json({
      message: "Data berhasil disimpan",
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export const deleteAccount = async (req, res) => {};
