module.exports = {
    app: {
      name: "Mern Social Media",
      apiEndpoint: process.env.API_URL ? `/${process.env.API_URL}` : "/api",
    },
    database: {
       
      url:
        process.env.MONGODB_URI ||
        `mongodb+srv://karenSchick:karen@cluster0.rnexktn.mongodb.net/captstone?retryWrites=true`, 
      name: process.env.MONGODB_NAME || "capstone",
    },
    jwt: {
      secret: process.env.JWT_SECRET || "jwt-secret",
      tokenLife: "7d",
    },
  };
  