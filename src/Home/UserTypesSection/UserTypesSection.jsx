

import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';


const UserTypesSection = () => {
  const userTypes = [
    {
      title: 'Developers',
      description: 'For those who code and want efficient task management.',
      icon: '💻',
    },
    {
      title: 'Corporate Professionals',
      description: 'Ideal for corporate teams looking to streamline their tasks and projects.',
      icon: '👔',
    },
    {
      title: 'Bankers',
      description: 'Tailored for banking professionals managing diverse tasks and projects.',
      icon: '🏦',
    },
    {
      title: 'Freelancers',
      description: 'Perfect for freelancers juggling multiple projects and deadlines.',
      icon: '🚀',
    },
    {
      title: 'Students',
      description: 'Great for students organizing assignments, projects, and study sessions.',
      icon: '📚',
    },
    {
      title: 'Entrepreneurs',
      description: 'Designed for entrepreneurs managing various aspects of their business.',
      icon: '🚀💼',
    },
    {
      title: 'Marketing Professionals',
      description: 'Suited for marketing teams coordinating campaigns and tasks.',
      icon: '📢',
    },
    {
      title: 'Designers',
      description: 'Tailor-made for designers managing creative projects and tasks.',
      icon: '🎨',
    },
    {
      title: 'Healthcare Professionals',
      description: 'Ideal for healthcare professionals organizing patient care tasks and schedules.',
      icon: '⚕️',
    },
    // Add more user types as needed
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const springProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)', // Adjust the distance as needed
  });

  return (
    <animated.section className="py-16 px-16 bg-gray-100" ref={ref} style={springProps}>
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
          Who Will Be Benefited?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userTypes.map((userType, index) => (
            <animated.div key={index} className="bg-white p-6 rounded-lg shadow-md" style={springProps}>
              <div className="text-4xl mb-4">{userType.icon}</div>
              <h3 className="text-xl font-bold mb-2">{userType.title}</h3>
              <p className="text-gray-600">{userType.description}</p>
            </animated.div>
          ))}
        </div>
      </div>
    </animated.section>
  );
};

export default UserTypesSection;