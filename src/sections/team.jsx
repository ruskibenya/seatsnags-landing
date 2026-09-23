import { Section, Perforation } from '../lib/ui.jsx';
import mauriceImg from '../assets/maurice.png';
import benjaminImg from '../assets/benjamin.jpg';
import ikkiImg from '../assets/ikki.jpg';

const TEAM = [
  { name: 'Maurice', role: 'Business Guy', image: mauriceImg },
  { name: 'Benjamin', role: 'The Glue', image: benjaminImg },
  // Crop focus sits high: the frame is otherwise mostly background.
  { name: 'Ikki', role: 'Technical Guy', image: ikkiImg, position: '50% 25%' },
];

export function Team() {
  return (
    <Section index="04" label="Our team">
      <h2 className="headline headline-lg">Built by fans, for fans.</h2>
      <div className="team-grid">
        {TEAM.map((member) => (
          <div key={member.name} className="team-card">
            <img
              src={member.image}
              alt={member.name}
              className="team-photo"
              style={member.position ? { objectPosition: member.position } : undefined}
            />
            <Perforation/>
            <div className="team-caption">
              <span className="team-name">{member.name}</span>
              <span className="team-role">{member.role}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
