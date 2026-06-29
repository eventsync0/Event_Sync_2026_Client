const VOTES_KEY = 'eventsync_voted_questions';
const ASKED_KEY = 'eventsync_asked_questions';


export function getVotedQuestionIds(): string[] {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem(VOTES_KEY) || '[]');
    } catch {
        return [];
    }
}

export function hasVoted(questionId: string): boolean {
    return getVotedQuestionIds().includes(String(questionId));
}


export function markAsVoted(questionId: string): boolean {
    const voted = getVotedQuestionIds();
    const id = String(questionId);

    if (voted.includes(id)) {
        return false;
    }

    voted.push(id);
    localStorage.setItem(VOTES_KEY, JSON.stringify(voted));
    return true;
}


type AskedEntry = {
    sessionId: string;
    content: string;
};

function normalizeContent(content: string): string {
    return content.trim().toLowerCase().replace(/\s+/g, ' ');
}

function getAskedEntries(): AskedEntry[] {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem(ASKED_KEY) || '[]');
    } catch {
        return [];
    }
}


export function hasAskedSameQuestion(sessionId: string, content: string): boolean {
    const normalized = normalizeContent(content);
    return getAskedEntries().some(
        (entry) => entry.sessionId === String(sessionId) && entry.content === normalized
    );
}


export function markQuestionAsked(sessionId: string, content: string): boolean {
    const normalized = normalizeContent(content);
    const entries = getAskedEntries();

    const alreadyAsked = entries.some(
        (entry) => entry.sessionId === String(sessionId) && entry.content === normalized
    );

    if (alreadyAsked) {
        return false;
    }

    entries.push({ sessionId: String(sessionId), content: normalized });
    localStorage.setItem(ASKED_KEY, JSON.stringify(entries));
    return true;
}