export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';
export const isExistsGaId = GA_ID !== '';

type ContactEvent = {
  action: 'submit_form'
  category: 'contact'
  label: string,
  value?: string,
}

type ClickEvent = {
  action: 'click'
  category: 'other'
  label: string,
  value?: string,
}

export type Event = ContactEvent | ClickEvent

export const pageview = (path: string) => {
  window.gtag('config', GA_ID, {
    page_path: path,
  });
}

export const event = ({action, category, label, value = ''}: Event) => {
  if(!isExistsGaId) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  });
};