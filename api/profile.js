const PROFILE_DATA = {
  name: "Swayam Mohanty",
  handle: "swayam404",
  title: "Forward Deployed Engineer · Full-Stack Engineer",
  location: "Amsterdam, Netherlands",
  email: "m.swayams@gmail.com",
  github: "https://github.com/swayam2k15",
  linkedin: "https://www.linkedin.com/in/swayam-mohanty-career/",
  x: "https://x.com/swayam2k15",
  website: "https://swayam.dev",
  stats: {
    experienceYears: 10,
    productionUsers: "Millions",
    projectsBuilt: 24,
    cupsOfCoffee: "∞"
  }
};

module.exports = (req, res) => {
  res.status(200).json(PROFILE_DATA);
};
