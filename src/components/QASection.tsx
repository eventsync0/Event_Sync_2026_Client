const VOTES_KEY = 'eventsync_voted_questions';
const ASKED_KEY = 'eventsync_asked_questions';

// ============================================
// VOTES — toggle réversible par question (un vote actif à la fois)
// ============================================

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

/**
 * Bascule l'état du vote pour cette question (ajoute si absent, retire si présent).
 * Retourne le nouvel état : true si désormais voté, false si désormais retiré.
 */
export function toggleVoted(questionId: string): boolean {
    const voted = getVotedQuestionIds();
    const id = String(questionId);
    const index = voted.indexOf(id);

    if (index > -1) {
        voted.splice(index, 1);
        localStorage.setItem(VOTES_KEY, JSON.stringify(voted));
        return false;
    } else {
        voted.push(id);
        localStorage.setItem(VOTES_KEY, JSON.stringify(voted));
        return true;
    }
}

// ============================================
// QUESTIONS POSÉES — anti-doublon par contenu, par session
// ============================================

type AskedEntry = {
    sessionId: string;
    content: string; // contenu normalisé
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

/**
 * Vérifie si ce contenu (normalisé) a déjà été posé sur cette session
 * par cet appareil/navigateur.
 */
export function hasAskedSameQuestion(sessionId: string, content: string): boolean {
    const normalized = normalizeContent(content);
    return getAskedEntries().some(
        (entry) => entry.sessionId === String(sessionId) && entry.content === normalized
    );
}

/**
 * Enregistre la question comme posée. Retourne false si ce contenu exact
 * avait déjà été posé sur cette session (rien n'est fait dans ce cas),
 * true sinon.
 */
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