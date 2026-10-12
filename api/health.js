module.exports = (req, res) => {
  res.status(200).json({
    status: "operational",
    service: "swayam404",
    platform: "vercel",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
};
