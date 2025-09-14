// api/login.js

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Simple demo authentication (replace with real logic / DB lookup)
    if (username === "admin" && password === "1234") {
      return res.status(200).json({ success: true, message: "Login successful ✅" });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials ❌" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
