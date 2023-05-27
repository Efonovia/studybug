import React, { useRef } from "react"
import Navbar from "../components/app/Navbar";
import "../styles/home.css"
import featurePic1 from "../images/test passed.svg"
import featurePic2 from "../images/young man surrounded by gadgets writing notes.svg"
import featurePic3 from "../images/Girl sitting on floor with laptop and studying.svg"
import featurePic4 from "../images/young woman sitting in front of laptop and writing notes.svg"
import { useNavigate } from "react-router-dom";


function Home() {
  const homeRef = useRef(null);
  const featuresRef = useRef(null);
  const navigate = useNavigate()

  return <>
    <Navbar homeRef={homeRef} featuresRef={featuresRef}/>
    <main ref={homeRef}>
      <h2>
        Supercharge your studies with <span style={{"color": "purple"}}>StudyBug</span>. Your ultimate study resource
      </h2>
      <div onClick={() => navigate("/auth/signup")} className="signup">Sign up for free</div>
    </main>

    <div ref={featuresRef} className="features">
      <h1>Features</h1>
      <div className="feature">
        <img src={featurePic2} className="feature-description" alt=""></img>
        <div className="feature-description">
          <h3>Custom-Generated Tests</h3>
          <p>Create personalized tests based on your study materials or generate tests based on what you're learning using Artificial intelligence, and practice with a range of question types, including multiple-choice, true/false, and more.</p>
        </div>
      </div>

      <div className="feature">
        <div className="feature-description">
          <h3>Note-Taking</h3>
          <p>Take detailed notes during your lectures, classes, or while studying, and organize them in a structured manner to review later.</p>
        </div>
        <img src={featurePic4} className="feature-description" alt=""></img>
      </div>

      <div className="feature">
        <img src={featurePic3} className="feature-description" alt=""></img>
        <div className="feature-description">
          <h3>Study Sessions</h3>
          <p>Create and manage study sessions for different subjects or topics, and track your progress over time to stay on top of your studies.</p>
        </div>
      </div>

      <div className="feature">
        <div className="feature-description">
          <h3>Study Sessions</h3>
          <p>Access questions from various institutions on a wide range of topics, curated by experts in the field, to expand your knowledge and enhance your learning. (Only for Nigerian Institutions Currently)</p>
        </div>
        <img src={featurePic1} className="feature-description" alt=""></img>
      </div>


    </div>
  </>
}

export default Home;