import { motion } from "framer-motion";
import { ReactNode } from "react";
import { FaBrain, FaLock, FaSmile, FaRocket, FaLightbulb, FaHeart } from "react-icons/fa";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const HomePage = () => {
    const navigate = useNavigate();
  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">CalmNest Junior</div>
        <ul className="nav-links">
        <li><Link to="/about">About</Link></li> 
        <li><Link to="/assessment">Assessment</Link></li> 
          <li><Link to="/contacts">Contacts</Link></li>
          <li><Link to="/chatbot">Chatbot</Link></li>
        </ul>
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="login-button"
          onClick={() => window.location.href = "./login"}
        >
          Login
        </motion.button>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <motion.div 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="hero-content"
        >
          <h1 className="hero-title">Unlock Your Inner Happiness!</h1>
          <p className="hero-subtitle">
            "A healthy mind leads to a happy life. Let's take the first step together!"
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="cta-button"
            onClick={() => window.location.href = "./assessment"}
          >
            Take the Assessment
          </motion.button>
        </motion.div>
      </header>

      {/* Why Choose Us Section */}
      <section className="features">
        <h2 className="section-title">Why Choose Us?</h2>
        <p className="section-subtitle">We make mental health assessment fun, engaging, and insightful!</p>
        <div className="features-grid">
          <FeatureCard 
            icon={<FaBrain />} 
            title="AI-Powered Insights" 
            description="Our smart AI provides deep insights to help you understand your emotions." 
          />
          <FeatureCard 
            icon={<FaLock />} 
            title="100% Confidential" 
            description="Your data is secure and private. We value your trust!" 
          />
          <FeatureCard 
            icon={<FaSmile />} 
            title="Designed for All Ages" 
            description="A colorful and interactive experience for kids and adults alike." 
          />
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="fun-facts">
        <h2 className="section-title">Fun Mental Health Facts</h2>
        <div className="facts-grid">
          <FactCard icon={<FaRocket />} text="Did you know? Laughing for 10 minutes burns about 40 calories!" />
          <FactCard icon={<FaLightbulb />} text="Your brain generates enough electricity to power a small light bulb!" />
          <FactCard icon={<FaHeart />} text="Hugging releases oxytocin, which makes you feel happier!" />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2 className="section-title">What People Say</h2>
        <div className="testimonial-grid">
          <TestimonialCard 
            name="Sammy, 10" 
            feedback="This app is so cool! I love the fun questions and colors!" 
          />
          <TestimonialCard 
            name="Dr. Ananya, Psychologist" 
            feedback="A wonderful tool for mental wellness. Great for kids and adults!" 
          />
          <TestimonialCard 
            name="Michael, 27" 
            feedback="I never thought mental health checkups could be this fun and easy!" 
          />
        </div>
      </section>

      {/* FAQs Section */}
      <section className="faqs">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>Is this assessment for kids or adults?</h3>
          <p>Both! Our questions are designed to be engaging for all age groups.</p>
        </div>
        <div className="faq-item">
          <h3>Is my data safe?</h3>
          <p>Yes! We ensure complete privacy and do not share your responses.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 MindEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }: { icon: ReactNode; title: string; description: string }) => (
  <motion.div whileHover={{ scale: 1.05 }} className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </motion.div>
);

// Fun Fact Card Component
const FactCard = ({ icon, text }: { icon: ReactNode; text: string }) => (
  <motion.div whileHover={{ scale: 1.1 }} className="fact-card">
    <div className="fact-icon">{icon}</div>
    <p>{text}</p>
  </motion.div>
);

// Testimonial Card Component
const TestimonialCard = ({ name, feedback }: { name: string; feedback: string }) => (
  <motion.div whileHover={{ scale: 1.05 }} className="testimonial-card">
    <p className="testimonial-feedback">"{feedback}"</p>
    <h4>- {name}</h4>
  </motion.div>
);

export default HomePage;
