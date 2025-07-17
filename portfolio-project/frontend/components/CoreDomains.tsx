'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/CoreDomains.module.css';

const CoreDomains = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const domains = [
    {
      id: 'devops',
      title: 'DevOps Engineering',
      icon: '🚀',
      gradient: 'linear-gradient(135deg, #3b82f6, #1e40af)',
      description: 'Automating deployment pipelines, orchestrating containers, and building resilient infrastructure that scales with your business needs.',
      skills: [
        { name: 'CI/CD Pipelines', level: 95, icon: '⚙️' },
        { name: 'Docker & Kubernetes', level: 90, icon: '🐳' },
        { name: 'Infrastructure as Code', level: 85, icon: '📜' },
        { name: 'Monitoring & Alerting', level: 80, icon: '📊' }
      ],
      tools: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'Terraform', 'Ansible', 'Prometheus', 'Grafana'],
      achievements: [
        'Reduced deployment time by 70% through automated CI/CD',
        'Orchestrated 50+ microservices with Kubernetes',
        'Implemented infrastructure monitoring for 99.9% uptime'
      ],
      codeSnippet: `# Terraform Infrastructure
resource "aws_instance" "app_server" {
  ami           = "ami-0c55b159cbfafe1d0"
  instance_type = "t3.medium"
  
  tags = {
    Name = "production-server"
    Environment = "prod"
  }
}

# Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web-app
        image: nginx:latest
        ports:
        - containerPort: 80`
    },
    {
      id: 'cloud',
      title: 'Cloud Architecture',
      icon: '☁️',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      description: 'Designing scalable cloud solutions on AWS, optimizing costs, and implementing serverless architectures for maximum efficiency.',
      skills: [
        { name: 'AWS Services', level: 92, icon: '🏗️' },
        { name: 'Serverless Architecture', level: 88, icon: '⚡' },
        { name: 'Cost Optimization', level: 85, icon: '💰' },
        { name: 'Security & Compliance', level: 82, icon: '🔒' }
      ],
      tools: ['AWS Lambda', 'EC2', 'S3', 'RDS', 'CloudFormation', 'CloudWatch', 'API Gateway'],
      achievements: [
        'Reduced infrastructure costs by 25% through serverless',
        'Architected solutions serving 300+ students',
        'Achieved 99.9% availability with multi-AZ deployment'
      ],
      codeSnippet: `// AWS Lambda Function
exports.handler = async (event) => {
  const { pathParameters } = event;
  const userId = pathParameters.id;
  
  try {
    const user = await getUserFromDB(userId);
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

# CloudFormation Template
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  WebAppBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub '\${AWS::StackName}-webapp'
      WebsiteConfiguration:
        IndexDocument: index.html
        ErrorDocument: error.html`
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: '⚡',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
      description: 'Building robust REST APIs, microservices, and scalable backend systems using Java Spring Boot and modern development practices.',
      skills: [
        { name: 'Java & Spring Boot', level: 90, icon: '☕' },
        { name: 'REST API Design', level: 88, icon: '🌐' },
        { name: 'Database Design', level: 85, icon: '🗄️' },
        { name: 'Microservices', level: 83, icon: '🔧' }
      ],
      tools: ['Spring Boot', 'Java', 'Maven', 'PostgreSQL', 'MongoDB', 'Redis', 'JUnit'],
      achievements: [
        'Optimized database performance by 20%',
        'Built e-commerce platform handling 1000+ transactions',
        'Reduced API response time by 5% during peak traffic'
      ],
      codeSnippet: `// Spring Boot REST Controller
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(user);
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                           .body(createdUser);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id, 
            @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        return ResponseEntity.ok(updatedUser);
    }
}

// Service Layer with Caching
@Service
@Transactional
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Cacheable(value = "users", key = "#id")
    public User findById(Long id) {
        return userRepository.findById(id)
                           .orElseThrow(() -> 
                               new EntityNotFoundException("User not found"));
    }
}`
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const activeDomain = domains[activeTab];

  return (
    <section id="core-domains" className={styles.coreDomains} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>Core Expertise</h2>
          <p className={styles.sectionSubtitle}>
            Three pillars of modern software development that I've mastered through hands-on experience
          </p>
        </div>

        <div className={styles.content}>
          {/* Domain Tabs */}
          <div className={styles.tabContainer}>
            {domains.map((domain, index) => (
              <button
                key={domain.id}
                className={`${styles.tab} ${activeTab === index ? styles.active : ''}`}
                onClick={() => setActiveTab(index)}
                style={{ 
                  '--gradient': domain.gradient,
                  '--delay': `${index * 0.1}s`
                } as React.CSSProperties}
              >
                <span className={styles.tabIcon}>{domain.icon}</span>
                <span className={styles.tabTitle}>{domain.title}</span>
              </button>
            ))}
          </div>

          {/* Active Domain Content */}
          <div className={styles.domainContent}>
            <div className={styles.domainHeader}>
              <div className={styles.domainIcon} style={{ background: activeDomain.gradient }}>
                {activeDomain.icon}
              </div>
              <div className={styles.domainInfo}>
                <h3 className={styles.domainTitle}>{activeDomain.title}</h3>
                <p className={styles.domainDescription}>{activeDomain.description}</p>
              </div>
            </div>

            <div className={styles.domainDetails}>
              {/* Skills */}
              <div className={styles.skillsSection}>
                <h4>Core Skills</h4>
                <div className={styles.skillsList}>
                  {activeDomain.skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className={styles.skillItem}
                      style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
                    >
                      <div className={styles.skillHeader}>
                        <span className={styles.skillIcon}>{skill.icon}</span>
                        <span className={styles.skillName}>{skill.name}</span>
                        <span className={styles.skillLevel}>{skill.level}%</span>
                      </div>
                      <div className={styles.skillBar}>
                        <div 
                          className={styles.skillProgress}
                          style={{ 
                            width: isVisible ? `${skill.level}%` : '0%',
                            background: activeDomain.gradient
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Technologies */}
              <div className={styles.toolsSection}>
                <h4>Tools & Technologies</h4>
                <div className={styles.toolsList}>
                  {activeDomain.tools.map((tool, index) => (
                    <span
                      key={tool}
                      className={styles.toolTag}
                      style={{ 
                        '--delay': `${index * 0.05}s`,
                        '--gradient': activeDomain.gradient
                      } as React.CSSProperties}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className={styles.achievementsSection}>
                <h4>Key Achievements</h4>
                <div className={styles.achievementsList}>
                  {activeDomain.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={styles.achievementItem}
                      style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
                    >
                      <div className={styles.achievementIcon}>✅</div>
                      <span className={styles.achievementText}>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Code Snippet */}
            <div className={styles.codeSection}>
              <h4>Sample Code</h4>
              <div className={styles.codeContainer}>
                <div className={styles.codeHeader}>
                  <div className={styles.codeButtons}>
                    <span className={styles.codeButton} style={{backgroundColor: '#FF5F56'}}></span>
                    <span className={styles.codeButton} style={{backgroundColor: '#FFBD2E'}}></span>
                    <span className={styles.codeButton} style={{backgroundColor: '#27CA3F'}}></span>
                  </div>
                  <span className={styles.codeTitle}>{activeDomain.title.toLowerCase().replace(' ', '-')}.example</span>
                </div>
                <pre className={styles.codeBlock}>
                  <code>{activeDomain.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreDomains; 