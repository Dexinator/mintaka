// Store for accessibility preferences
// Uses localStorage for persistence and custom events for reactivity

export interface AccessibilityPreferences {
	fontSize: 100 | 125 | 150;
	highContrast: boolean;
	reducedMotion: boolean;
}

const DEFAULT_PREFERENCES: AccessibilityPreferences = {
	fontSize: 100,
	highContrast: false,
	reducedMotion: false,
};

const STORAGE_KEY = 'audacetics-accessibility-preferences';

// Custom event for preference changes
export const ACCESSIBILITY_CHANGE_EVENT = 'accessibility-change';

// Get preferences from localStorage or return defaults
export function getPreferences(): AccessibilityPreferences {
	if (typeof window === 'undefined') return DEFAULT_PREFERENCES;

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			const parsed = JSON.parse(stored);
			return { ...DEFAULT_PREFERENCES, ...parsed };
		}
	} catch (e) {
		console.error('Error loading accessibility preferences:', e);
	}

	return DEFAULT_PREFERENCES;
}

// Save preferences to localStorage
function savePreferences(preferences: AccessibilityPreferences): void {
	if (typeof window === 'undefined') return;

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
		// Dispatch custom event for reactivity
		window.dispatchEvent(
			new CustomEvent(ACCESSIBILITY_CHANGE_EVENT, {
				detail: preferences,
			})
		);
	} catch (e) {
		console.error('Error saving accessibility preferences:', e);
	}
}

// Update a single preference
export function updatePreference<K extends keyof AccessibilityPreferences>(
	key: K,
	value: AccessibilityPreferences[K]
): void {
	const current = getPreferences();
	const updated = { ...current, [key]: value };
	savePreferences(updated);
	applyPreferences(updated);
}

// Toggle boolean preferences
export function toggleContrast(): void {
	const current = getPreferences();
	updatePreference('highContrast', !current.highContrast);
}

export function toggleMotion(): void {
	const current = getPreferences();
	updatePreference('reducedMotion', !current.reducedMotion);
}

// Adjust font size (cycle through values or specific value)
export function adjustFontSize(direction: 'increase' | 'decrease' | number): void {
	const current = getPreferences();

	if (typeof direction === 'number') {
		if ([100, 125, 150].includes(direction)) {
			updatePreference('fontSize', direction as 100 | 125 | 150);
		}
		return;
	}

	const sizes: Array<100 | 125 | 150> = [100, 125, 150];
	const currentIndex = sizes.indexOf(current.fontSize);

	let newIndex: number;
	if (direction === 'increase') {
		newIndex = Math.min(currentIndex + 1, sizes.length - 1);
	} else {
		newIndex = Math.max(currentIndex - 1, 0);
	}

	updatePreference('fontSize', sizes[newIndex]);
}

// Reset all preferences to defaults
export function resetPreferences(): void {
	savePreferences(DEFAULT_PREFERENCES);
	applyPreferences(DEFAULT_PREFERENCES);
}

// Apply preferences to the DOM
export function applyPreferences(preferences: AccessibilityPreferences): void {
	if (typeof window === 'undefined') return;

	const html = document.documentElement;

	// Font size
	html.setAttribute('data-font-size', preferences.fontSize.toString());
	html.style.setProperty('--font-scale', (preferences.fontSize / 100).toString());

	// High contrast
	if (preferences.highContrast) {
		html.classList.add('high-contrast');
	} else {
		html.classList.remove('high-contrast');
	}

	// Reduced motion
	if (preferences.reducedMotion) {
		html.classList.add('reduced-motion');
	} else {
		html.classList.remove('reduced-motion');
	}
}

// Initialize preferences on page load
export function initializeAccessibility(): void {
	if (typeof window === 'undefined') return;

	const preferences = getPreferences();
	applyPreferences(preferences);

	// Also check system preferences
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReducedMotion && !preferences.reducedMotion) {
		updatePreference('reducedMotion', true);
	}
}

// Get count of active adjustments (for badge)
export function getActiveAdjustmentsCount(preferences: AccessibilityPreferences): number {
	let count = 0;
	if (preferences.fontSize !== 100) count++;
	if (preferences.highContrast) count++;
	if (preferences.reducedMotion) count++;
	return count;
}
