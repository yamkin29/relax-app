import { describe, expect, it } from 'vitest';
import { formatDate, formatLastUpdated, formatTimeUntilExpiry, formatViewCount } from './format';

describe('formatViewCount', () => {
    it('formats small counts as-is', () => {
        expect(formatViewCount('0')).toBe('0 views');
        expect(formatViewCount('999')).toBe('999 views');
    });

    it('formats thousands with K suffix', () => {
        expect(formatViewCount('1000')).toBe('1.0K views');
        expect(formatViewCount('1500')).toBe('1.5K views');
        expect(formatViewCount('999338')).toBe('999.3K views');
    });

    it('formats millions with M suffix', () => {
        expect(formatViewCount('1000000')).toBe('1.0M views');
        expect(formatViewCount('10400000')).toBe('10.4M views');
    });
});

describe('formatDate', () => {
    it('formats an ISO date in en-US', () => {
        expect(formatDate('2024-03-22T12:00:00Z')).toBe('Mar 22, 2024');
    });
});

describe('formatLastUpdated', () => {
    it('includes date and time parts', () => {
        const timestamp = new Date('2026-09-12T10:30:00').getTime();
        expect(formatLastUpdated(timestamp)).toMatch(/Sep 12, 2026/);
        expect(formatLastUpdated(timestamp)).toMatch(/\d{1,2}:\d{2}/);
    });
});

describe('formatTimeUntilExpiry', () => {
    const HOUR = 60 * 60 * 1000;

    it('shows full 24 hours right after caching', () => {
        const now = 1_700_000_000_000;
        expect(formatTimeUntilExpiry(now, now)).toBe('24h 0m');
    });

    it('counts down as time passes', () => {
        const cachedAt = 1_700_000_000_000;
        expect(formatTimeUntilExpiry(cachedAt, cachedAt + 1.5 * HOUR)).toBe('22h 30m');
    });

    it('goes negative after expiry', () => {
        const cachedAt = 1_700_000_000_000;
        expect(formatTimeUntilExpiry(cachedAt, cachedAt + 25 * HOUR)).toBe('-1h 0m');
    });
});
