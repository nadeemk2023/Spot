module.exports = {
  app: {
    name: "Mern Social Media",
    apiEndpoint: process.env.API_URL ? `/${process.env.API_URL}` : "/api",
  },
  database: {
    url:
    process.env.MONGODB_URI ||
    `mongodb+srv://spotcapstone:spot@spot.lho6oyr.mongodb.net/?retryWrites=true`,
  name: process.env.MONGODB_NAME || "capstone",
    // url: process.env.MONGODB_URI,
    // name: process.env.MONGODB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "jwt-secret",
    // secret: process.env.JWT_SECRET,
    tokenLife: "7d",
  },
};
