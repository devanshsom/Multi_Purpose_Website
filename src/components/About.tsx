import { Code2, Database, Globe, Smartphone, Server, Palette } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const About = () => {
  const skills = [
    { name: 'React/TypeScript', level: 95, icon: Code2 },
    { name: 'Node.js/Express', level: 90, icon: Server },
    { name: 'Database Design', level: 85, icon: Database },
    { name: 'UI/UX Design', level: 80, icon: Palette },
    { name: 'Mobile Development', level: 75, icon: Smartphone },
    { name: 'Cloud Platforms', level: 88, icon: Globe },
  ];

  const experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      period: '2022 - Present',
      description: 'Leading development of enterprise web applications using React, Node.js, and cloud technologies.'
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Innovations',
      period: '2020 - 2022',
      description: 'Developed responsive web applications and improved user experience across multiple platforms.'
    },
    {
      title: 'Junior Developer',
      company: 'StartupXYZ',
      period: '2019 - 2020',
      description: 'Built full-stack applications and contributed to agile development processes.'
    }
  ];

  return (
    <section className="py-20 bg-background-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm a passionate full-stack developer with over 4 years of experience creating 
            digital solutions that combine technical excellence with exceptional user experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* About Content */}
          <div className="space-y-6">
            <div className="animate-fade-in-up">
              <h3 className="text-2xl font-bold mb-4 text-primary">My Journey</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  My journey in software development began during my computer science studies, 
                  where I discovered my passion for creating innovative web solutions. I love 
                  the challenge of transforming complex problems into elegant, user-friendly applications.
                </p>
                <p>
                  Over the years, I've worked with diverse teams and technologies, always staying 
                  curious and eager to learn. I believe in writing clean, maintainable code and 
                  creating applications that users genuinely enjoy using.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to 
                  open-source projects, or sharing knowledge with the developer community.
                </p>
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-bold mb-4 text-primary">Education</h3>
              <div className="bg-card p-6 rounded-lg border border-border">
                <h4 className="font-semibold text-lg mb-2">Bachelor of Computer Science</h4>
                <p className="text-muted-foreground mb-2">Tech University • 2015-2019</p>
                <p className="text-sm text-muted-foreground">
                  Graduated with honors, focusing on web technologies and software engineering principles.
                </p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-2xl font-bold mb-6 text-primary">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <skill.icon className="w-5 h-5 text-accent" />
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-2xl font-bold mb-8 text-center text-primary">Professional Experience</h3>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-primary transform md:-translate-x-0.5"></div>
              
              {experiences.map((exp, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full transform md:-translate-x-2 z-10"></div>
                  
                  {/* Content */}
                  <Card className={`ml-12 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  } interactive-card glass`}>
                    <CardHeader>
                      <CardTitle className="text-lg">{exp.title}</CardTitle>
                      <p className="text-accent font-medium">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.period}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;