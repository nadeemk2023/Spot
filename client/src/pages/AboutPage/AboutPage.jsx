import React, { useState } from "react";
import originalImage from "/public/live_well_5k.jpeg";
import hoverImage from "/public/portfolio_pic.jpeg";

function AboutPage() {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div>
      <h1>About The Developers Of This Application</h1>
      <div className="row">
        <div className="row-md-4 mb-4">
          <img
            src={isHovered ? hoverImage : originalImage}
            alt="Alexis"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            className="img-fluid rounded-circle"
            style={{ width: "200px", height: "200px" }}
          />
          <div>
            "My name is Alexis in my free time, besides honing my coding skills,
            I enjoy staying active by running marathons. Spending quality time
            with my family is a top priority, and I find relaxation and mental
            stimulation in working on puzzles. Additionally, I'm always eager to
            expand my skill set by learning something new. In my recent
            contributions to the app, I took charge of several key components,
            including coding the navbar, profile page, client-side hooks like
            useAuth and useRequireAuth, client utilities, edit profile
            component, and the upload file component."
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
