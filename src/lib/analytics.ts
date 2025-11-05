import { supabase } from './supabase';

export interface AnalyticsEvent {
  event_name: string;
  event_category?: string;
  event_data?: Record<string, any>;
  user_email?: string;
}

let sessionId: string | null = null;

function getSessionId(): string {
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }
  return sessionId;
}

export async function trackEvent(event: AnalyticsEvent): Promise<void> {
  try {
    await supabase.from('analytics_events').insert({
      event_name: event.event_name,
      event_category: event.event_category,
      event_data: event.event_data || {},
      user_email: event.user_email,
      session_id: getSessionId(),
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

export function trackPageView(pageName: string): void {
  trackEvent({
    event_name: 'page_view',
    event_category: 'navigation',
    event_data: { page: pageName },
  });
}

export function trackClick(elementName: string, elementType: string = 'button'): void {
  trackEvent({
    event_name: 'click',
    event_category: 'interaction',
    event_data: { element: elementName, type: elementType },
  });
}
