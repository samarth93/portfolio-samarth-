'use client'

import React, { useState, useEffect } from 'react';
import styles from '../styles/SettingsManager.module.css';
import { API_ENDPOINTS, createAuthHeaders } from '../lib/api';

interface SettingsManagerProps {
    token: string;
}

const SettingsManager: React.FC<SettingsManagerProps> = ({ token }) => {
    const [resumeUrl, setResumeUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_ENDPOINTS.SETTINGS);

            if (response.ok) {
                const data = await response.json();
                setResumeUrl(data.resumeUrl || '');
            } else {
                showMessage('error', 'Failed to load settings');
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
            showMessage('error', 'Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!resumeUrl.trim()) {
            showMessage('error', 'Resume URL cannot be empty');
            return;
        }

        try {
            setSaving(true);
            const response = await fetch(API_ENDPOINTS.SETTINGS, {
                method: 'PUT',
                headers: createAuthHeaders(token),
                body: JSON.stringify({ resumeUrl }),
            });

            if (response.ok) {
                showMessage('success', 'Settings saved successfully!');
            } else {
                showMessage('error', 'Failed to save settings');
            }
        } catch (error) {
            console.error('Error saving settings:', error);
            showMessage('error', 'Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 5000);
    };

    if (loading) {
        return <div className={styles.loading}>Loading settings...</div>;
    }

    return (
        <div className={styles.settingsManager}>
            <div className={styles.header}>
                <h2>⚙️ Application Settings</h2>
                <p>Manage global application settings</p>
            </div>

            {message && (
                <div className={`${styles.message} ${styles[message.type]}`}>
                    {message.text}
                </div>
            )}

            <div className={styles.settingsSection}>
                <div className={styles.settingCard}>
                    <h3>📄 Resume Link</h3>
                    <p className={styles.description}>
                        Set the URL for your resume. This link will be used across the portfolio when users click the Resume button.
                    </p>

                    <div className={styles.formGroup}>
                        <label htmlFor="resumeUrl">Resume URL</label>
                        <input
                            type="url"
                            id="resumeUrl"
                            className={styles.input}
                            value={resumeUrl}
                            onChange={(e) => setResumeUrl(e.target.value)}
                            placeholder="https://drive.google.com/file/d/your-file-id/view"
                        />
                        <small className={styles.hint}>
                            Tip: Use Google Drive, Dropbox, or any publicly accessible link
                        </small>
                    </div>

                    <div className={styles.preview}>
                        <strong>Preview:</strong>
                        {resumeUrl ? (
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className={styles.previewLink}>
                                {resumeUrl}
                            </a>
                        ) : (
                            <span className={styles.noPreview}>No URL set</span>
                        )}
                    </div>

                    <div className={styles.actions}>
                        <button
                            className={styles.saveButton}
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? 'Saving...' : 'Save Settings'}
                        </button>
                        <button
                            className={styles.cancelButton}
                            onClick={fetchSettings}
                            disabled={saving}
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <div className={styles.infoCard}>
                    <h4>ℹ️ How it works</h4>
                    <ul>
                        <li>Update the resume URL here instead of modifying code</li>
                        <li>Changes are saved to the database and applied instantly</li>
                        <li>The public portfolio will fetch the latest resume URL automatically</li>
                        <li>Make sure your resume link is publicly accessible</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SettingsManager;
