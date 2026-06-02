import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h2 className="about-title">ABOUT</h2>
          
          <div className="about-description">
            <p>
              Currently pursuing an MBA in General Management at IIM Shillong, I'm exploring
              opportunities across diverse domains, from analytics and business strategy to
              operations and product roles where I can combine data, people, and strategy to
              create impact.
            </p>
          </div>

          <div className="about-story">
            <p>
              Data-driven professional with a strong foundation in HR operations and a diploma
              in Data Science from IIT Madras. I'm passionate about uncovering insights, solving
              complex problems, and driving strategic decision-making through analytics. Having
              worked across people management and data-driven roles, I bring a unique blend of
              human and analytical understanding to business challenges.
            </p>
            <p>
              Welcome to <em>Tales w Hash</em> where I bring you series of real stories and
              raw feelings captured on my camera. Through this website, I hope to bring to you
              a piece of my imagination and experiences that will help you understand my skills
              and interests on a deeper level.
            </p>
          </div>

          <div className="about-sections">
            <div className="about-section">
              <h3>EXHIBITIONS AND HONOURS</h3>
              <ul>
                <li>2019 - College</li>
                <li>2019 - Success stories</li>
                <li>2019 - any more</li>
                <li>2020 - example</li>
              </ul>
            </div>

            <div className="about-section">
              <h3>GET IN TOUCH</h3>
              <p>tanya.singh2205@gmail.com</p>
              <p>Instagram</p>
            </div>

            <div className="about-section">
              <h3>REPRESENTATION</h3>
            </div>
          </div>
        </div>

        <div className="about-image">
          <div className="image-placeholder">
            {/*
              Upload your portrait image to Cloudinary and paste the URL here
              Or place image in public/images/ folder and use: /images/portrait.jpg
            */}
            <img
              src="https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/about/portrait.jpg"
              alt="Photographer portrait"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.src = 'https://via.placeholder.com/400x600?text=Add+Your+Portrait';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

// Made with Bob