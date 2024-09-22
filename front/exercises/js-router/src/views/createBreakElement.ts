export const createBreakElement = (): HTMLElement => {
  const hr = document.createElement('hr');
  hr.className = 'break';
  return hr;
};