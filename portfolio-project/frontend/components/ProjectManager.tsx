'use client';

import React, { useState, useEffect } from 'react';
import styles from '../styles/ProjectManager.module.css';

interface Project {
  id: number;
  name: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  demoLink?: string;
  category: string;
  keyFeatures?: string[];
  createdAt: string;
  updatedAt: string;
}

interface ProjectFormData {
  name: string;
  description: string;
  techStack: string[];
  githubLink: string;
  demoLink: string;
  category: string;
  keyFeatures: string[];
}

interface ProjectManagerProps {
  token: string;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({ token }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    techStack: [''],
    githubLink: '',
    demoLink: '',
    category: '',
    keyFeatures: ['']
  });

  const categories = [
    'Web Development',
    'Mobile Development',
    'DevOps & Cloud',
    'AI & Machine Learning',
    'Data Science',
    'Game Development',
    'Other'
  ];

  // Fetch projects from backend
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
        setError(null);
      } else {
        throw new Error('Failed to fetch projects');
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const payload = {
        ...formData,
        techStack: formData.techStack.filter(tech => tech.trim() !== ''),
        keyFeatures: formData.keyFeatures.filter(feature => feature.trim() !== ''),
        githubLink: formData.githubLink || undefined,
        demoLink: formData.demoLink || undefined,
        category: formData.category || 'Other'
      };

      const url = editingProject 
        ? `http://localhost:8080/api/projects/${editingProject.id}`
        : 'http://localhost:8080/api/projects';
      
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        await fetchProjects();
        resetForm();
        setError(null);
      } else {
        throw new Error('Failed to save project');
      }
    } catch (err) {
      console.error('Error saving project:', err);
      setError('Failed to save project');
    }
  };

  // Delete project
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`http://localhost:8080/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        await fetchProjects();
        setError(null);
      } else {
        throw new Error('Failed to delete project');
      }
    } catch (err) {
      console.error('Error deleting project:', err);
      setError('Failed to delete project');
    }
  };

  // Start editing
  const startEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      techStack: [...project.techStack, ''],
      githubLink: project.githubLink || '',
      demoLink: project.demoLink || '',
      category: project.category,
      keyFeatures: [...(project.keyFeatures || []), '']
    });
    setShowForm(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      techStack: [''],
      githubLink: '',
      demoLink: '',
      category: '',
      keyFeatures: ['']
    });
    setEditingProject(null);
    setShowForm(false);
  };

  // Handle tech stack changes
  const handleTechStackChange = (index: number, value: string) => {
    const newTechStack = [...formData.techStack];
    newTechStack[index] = value;
    setFormData({ ...formData, techStack: newTechStack });
  };

  // Add tech stack field
  const addTechStackField = () => {
    setFormData({
      ...formData,
      techStack: [...formData.techStack, '']
    });
  };

  // Remove tech stack field
  const removeTechStackField = (index: number) => {
    const newTechStack = formData.techStack.filter((_, i) => i !== index);
    setFormData({ ...formData, techStack: newTechStack });
  };

  // Handle key features changes
  const handleKeyFeatureChange = (index: number, value: string) => {
    const newKeyFeatures = [...formData.keyFeatures];
    newKeyFeatures[index] = value;
    setFormData({ ...formData, keyFeatures: newKeyFeatures });
  };

  // Add key feature field
  const addKeyFeatureField = () => {
    setFormData({
      ...formData,
      keyFeatures: [...formData.keyFeatures, '']
    });
  };

  // Remove key feature field
  const removeKeyFeatureField = (index: number) => {
    const newKeyFeatures = formData.keyFeatures.filter((_, i) => i !== index);
    setFormData({ ...formData, keyFeatures: newKeyFeatures });
  };

  if (loading) {
    return <div className={styles.loading}>Loading projects...</div>;
  }

  return (
    <div className={styles.projectManager}>
      <div className={styles.header}>
        <h2>Project Management</h2>
        <button 
          className={styles.addButton}
          onClick={() => setShowForm(true)}
        >
          Add New Project
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {showForm && (
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
            
            <div className={styles.formGroup}>
              <label htmlFor="name">Project Name *</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., E-commerce Platform"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your project, its features, and impact..."
                rows={4}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select a category...</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Tech Stack</label>
              {formData.techStack.map((tech, index) => (
                <div key={index} className={styles.techField}>
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => handleTechStackChange(index, e.target.value)}
                    placeholder="e.g., React, Node.js, MongoDB"
                  />
                  {formData.techStack.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeTechStackField(index)}
                      className={styles.removeButton}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button 
                type="button" 
                onClick={addTechStackField}
                className={styles.addTechButton}
              >
                Add Technology
              </button>
            </div>

            <div className={styles.formGroup}>
              <label>Key Features</label>
              <div className={styles.keyFeaturesSection}>
                {formData.keyFeatures.map((feature, index) => (
                  <div key={index} className={styles.featureField}>
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleKeyFeatureChange(index, e.target.value)}
                      placeholder="e.g., Containerized using Docker, Real-time messaging"
                    />
                    {formData.keyFeatures.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeKeyFeatureField(index)}
                        className={styles.removeButton}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={addKeyFeatureField}
                  className={styles.addFeatureButton}
                >
                  Add Another Feature
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="githubLink">GitHub Link</label>
              <input
                type="url"
                id="githubLink"
                value={formData.githubLink}
                onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                placeholder="https://github.com/username/project"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="demoLink">Demo Link</label>
              <input
                type="url"
                id="demoLink"
                value={formData.demoLink}
                onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                placeholder="https://project-demo.com"
              />
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.saveButton}>
                {editingProject ? 'Update' : 'Save'} Project
              </button>
              <button type="button" onClick={resetForm} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.projectList}>
        <h3>Existing Projects ({projects.length})</h3>
        {projects.length === 0 ? (
          <p className={styles.noData}>No projects found. Add your first project!</p>
        ) : (
          <div className={styles.projectGrid}>
            {projects.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <div className={styles.projectHeader}>
                  <h4>{project.name}</h4>
                  <div className={styles.projectActions}>
                    <button 
                      onClick={() => startEdit(project)}
                      className={styles.editButton}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(project.id)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                {project.category && (
                  <div className={styles.category}>{project.category}</div>
                )}
                
                <p className={styles.description}>{project.description}</p>
                
                <div className={styles.techStack}>
                  <strong>Technologies:</strong>
                  <div className={styles.techTags}>
                    {project.techStack.map((tech, index) => (
                      <span key={index} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>
                </div>
                
                {project.keyFeatures && project.keyFeatures.length > 0 && (
                  <div className={styles.keyFeatures}>
                    <strong>Key Features:</strong>
                    <ul className={styles.featureList}>
                      {project.keyFeatures.map((feature, index) => (
                        <li key={index} className={styles.featureItem}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className={styles.links}>
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      GitHub
                    </a>
                  )}
                  {project.demoLink && (
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      Demo
                    </a>
                  )}
                </div>
                
                <div className={styles.metadata}>
                  <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                  <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManager; 