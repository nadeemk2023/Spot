module.exports = {
    app: {
      name: "Mern Social Media",
      apiEndpoint: process.env.API_URL ? `/${process.env.API_URL}` : "/api",
    },
    database: {
       
      url:
        process.env.MONGODB_URI ||
        `mongodb+srv://spotcapstone:spot@spot.lho6oyr.mongodb.net/?retryWrites=true&w=majority`, 
      name: process.env.MONGODB_NAME || "capstone",
    },
    jwt: {
      secret: process.env.JWT_SECRET || "jwt-secret",
      tokenLife: "7d",
    },
  };
  