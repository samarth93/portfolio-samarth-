package com.portfolio.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Enable CORS for frontend
public class PortfolioController {

    @GetMapping("/profile")
    public Map<String, Object> getProfileData() {
        Map<String, Object> profile = new HashMap<>();
        
        // Basic info
        profile.put("name", "Samarth");
        profile.put("title", "Cloud Developer & DevOps Engineer");
        profile.put("email", "samarth@example.com");
        profile.put("github", "https://github.com/samarth");
        profile.put("linkedin", "https://linkedin.com/in/samarth");
        
        // Skills
        Map<String, List<String>> skills = new HashMap<>();
        List<String> cloudSkills = new java.util.ArrayList<>();
        cloudSkills.add("EC2");
        cloudSkills.add("S3");
        cloudSkills.add("Auto Scaling");
        cloudSkills.add("CloudFormation");
        cloudSkills.add("CDK");
        cloudSkills.add("Lambda");
        cloudSkills.add("EKS");
        cloudSkills.add("VPC");
        cloudSkills.add("CloudWatch");
        cloudSkills.add("QuickSight");
        cloudSkills.add("ECS");
        skills.put("cloud", cloudSkills);
        skills.put("devops", List.of("Docker", "Kubernetes", "Jenkins", "GitLab CI/CD", "GitHub Actions"));
        skills.put("programming", List.of("Java", "Python", "JavaScript", "TypeScript", "SQL"));
        skills.put("frameworks", List.of("Spring Boot", "React", "Next.js", "Express"));
        profile.put("skills", skills);
        
        // Projects
        List<Map<String, String>> projects = List.of(
            Map.of(
                "title", "VPC Modelling with Flow Logs",
                "description", "Developed a solution for monitoring and analyzing VPC flow logs to enhance security and network optimization.",
                "technologies", "AWS, CloudWatch, Lambda, Terraform"
            ),
            Map.of(
                "title", "VideoConnect",
                "description", "Built a video conferencing application with real-time chat and screen sharing capabilities.",
                "technologies", "WebRTC, React, Node.js, Socket.io"
            ),
            Map.of(
                "title", "VideoSearchAI",
                "description", "Created an AI-powered video search platform that enables content discovery through semantic search.",
                "technologies", "Python, TensorFlow, AWS, React"
            )
        );
        profile.put("projects", projects);
        
        // Experience
        List<Map<String, String>> experience = List.of(
            Map.of(
                "company", "SourceBow Technologies",
                "position", "Software Developer Intern",
                "period", "2021 - Present",
                "description", "Designed and implemented caching mechanisms to enhance application responsiveness. Developed scalable e-commerce websites using Spring Boot and optimised database performance by 20%. Collaborated with cross-functional teams to deliver high-performance solutions. Improving checkout efficiency and reducing latency by 5% during peak traffic."
            ),
            Map.of(
                "company", "Amazon Web Services",
                "position", "AWS Cloud Captain",
                "period", "2019 - 2021",
                "description", "Conducted 15+ workshops on AWS services for 300+ students, boosting cloud adoption by 50%. Deployed serverless applications using Lambda and S3, reducing infrastructure costs by 25%. Optimized data visualization dashboards in AWS QuickSight, improving report generation speed by 35%. Worked with AmazonChime to enable real-time communication with latency optimized to under 50 ms."
            ),
            Map.of(
                "company", "Centre for Innovation Incubation and Entrepreneurship",
                "position", "CIIE Team Lead",
                "period", "2017 - 2019",
                "description", "Led development of an autonomous drone with LiDAR-based obstacle avoidance (85% accuracy). Autonomous Drone: Developed an autonomous drone with advanced navigation and obstacle avoidance capabilities. Built a student LMS using React and Spring Boot, adopted by 500+ users for academic management. Inventory Management System: Implemented a system to efficiently manage and track inventory using modern technologies. AI-Based Attendance Calculator System: Developed an AI-powered system to automate and optimise attendance tracking."
            )
        );
        profile.put("experience", experience);
        
        // Certifications
        List<String> certifications = List.of(
            "AWS Certified Solutions Architect - Professional",
            "AWS Certified DevOps Engineer - Professional",
            "Certified Kubernetes Administrator (CKA)",
            "HashiCorp Certified: Terraform Associate"
        );
        profile.put("certifications", certifications);
        
        return profile;
    }
} 