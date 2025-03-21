import { motion } from "framer-motion";
import { FaPhone, FaHeart, FaHandsHelping, FaSmile, FaChild, FaUsers } from "react-icons/fa";
import "../../styles/contacts.css";
import { ReactNode } from "react";
const ContactsPage = () => {
  return (
    <div className="contacts-page">
      {/* Hero Section */}
      <header className="contacts-hero">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero-content"
        >
          <h1 className="hero-title">Need Help? We're Here for You! 🌟</h1>
          <p className="hero-subtitle">
            "You're never alone. Reach out to these amazing people who care about you!"
          </p>
        </motion.div>
      </header>

      {/* Emergency Contacts Section */}
      <section className="emergency-contacts">
        <h2 className="section-title">🚨 Emergency Contacts</h2>
        <p className="section-subtitle">
          "When you need help fast, these heroes are just a call away!"
        </p>
        <div className="contacts-grid">
          <ContactCard
            icon={<FaPhone />}
            title="National Suicide Prevention Lifeline"
            number="1-800-273-TALK (8255)"
          />
          <ContactCard
            icon={<FaHeart />}
            title="Crisis Text Line"
            number="Text HOME to 741741"
          />
          <ContactCard
            icon={<FaHandsHelping />}
            title="Kids Helpline"
            number="1-800-55-1800"
          />
          <ContactCard
            icon={<FaChild />}
            title="Childhelp National Child Abuse Hotline"
            number="1-800-4-A-CHILD (1-800-422-4453)"
          />
        </div>
      </section>

      {/* Organizations Section */}
      <section className="organizations">
        <h2 className="section-title">🤝 Helpful Organizations</h2>
        <p className="section-subtitle">
          "These awesome organizations are here to support you!"
        </p>
        <div className="org-grid">
          <OrgCard
            icon={<FaSmile />}
            title="MindEase Kids"
            description="Fun activities and tools to help you feel better!"
            link="https://mindeasekids.org"
          />
          <OrgCard
            icon={<FaHeart />}
            title="Child Mind Institute"
            description="Resources for kids and teens to understand their feelings."
            link="https://childmind.org"
          />
          <OrgCard
            icon={<FaHandsHelping />}
            title="Teen Line"
            description="Talk to other teens who understand what you're going through."
            link="https://teenlineonline.org"
          />
          <OrgCard
            icon={<FaUsers />}
            title="Boys & Girls Clubs of America"
            description="Safe spaces for kids to learn, grow, and have fun!"
            link="https://bgca.org"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 MindEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Contact Card Component
const ContactCard = ({ icon, title, number }: { icon: ReactNode; title: string; number: string }) => (
  <motion.div whileHover={{ scale: 1.05 }} className="contact-card">
    <div className="contact-icon">{icon}</div>
    <h3>{title}</h3>
    <p className="contact-number">{number}</p>
  </motion.div>
);

// Organization Card Component
const OrgCard = ({ icon, title, description, link }: { icon: ReactNode; title: string; description: string; link: string }) => (
  <motion.div whileHover={{ scale: 1.05 }} className="org-card">
    <div className="org-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
    <a href={link} target="_blank" rel="noopener noreferrer" className="org-link">
      Visit Website
    </a>
  </motion.div>
);

export default ContactsPage;