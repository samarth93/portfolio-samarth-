package com.portfolio.admin.service;

import com.portfolio.admin.model.Settings;
import com.portfolio.admin.repository.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SettingsService {

    @Autowired
    private SettingsRepository settingsRepository;

    /**
     * Get the application settings (there should only be one document)
     * If no settings exist, return a settings object with default values
     */
    public Settings getSettings() {
        List<Settings> allSettings = settingsRepository.findAll();

        if (allSettings.isEmpty()) {
            // Create default settings with the current resume URL
            Settings defaultSettings = new Settings(
                    "https://drive.google.com/file/d/18d8w1UB-icb3r5HUhQmrbDOOgqc7R0j6/view?usp=sharing");
            return settingsRepository.save(defaultSettings);
        }

        // Return the first (and should be only) settings document
        return allSettings.get(0);
    }

    /**
     * Update the settings
     * This ensures only one settings document exists
     */
    public Settings updateSettings(Settings newSettings) {
        List<Settings> allSettings = settingsRepository.findAll();

        if (allSettings.isEmpty()) {
            // Create new settings
            return settingsRepository.save(newSettings);
        } else {
            // Update existing settings
            Settings existingSettings = allSettings.get(0);
            existingSettings.setResumeUrl(newSettings.getResumeUrl());
            return settingsRepository.save(existingSettings);
        }
    }
}
