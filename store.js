
export const STORAGE_KEY = "simbank_data_v1";
export const NOTIFY_KEY = "simbank_notify_v1";

const defaultData = {
  users: {
    bankA: {
      id: "bankA",
      name: "Bank A User",
      accountNumber: "100001",
      balance: 50000,
      avatarColor: "bg-blue-600",
      transactions: [],
      notifications: []
    },
    bankB: {
      id: "bankB",
      name: "Bank B User",
      accountNumber: "100002",
      balance: 25000,
      avatarColor: "bg-yellow-500",
      transactions: [],
      notifications: []
    }
  },
  admin: { password: "admin123" }
};

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
      return structuredClone(defaultData);
    }
    return JSON.parse(raw);
  } catch (e) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return structuredClone(defaultData);
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function genTx({ fromId, toId, amount, note = "" }) {
  const id = `tx_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
  return {
    id,
    from: fromId,
    to: toId,
    amount: Number(amount),
    note,
    date: new Date().toISOString()
  };
}
