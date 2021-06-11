const minMessage = rule =>
  `At least ${rule} character${rule > 1 ? 's' : ''} ${rule > 1 ? 'are' : 'is'} required.`;
const maxMessage = rule =>
  `At most ${rule} character${rule > 1 ? 's' : ''} ${rule > 1 ? 'are' : 'is'} allowed.`;
const emailMessage = () => 'A valid email is required.';
const upperMessage = () => 'Only strings can be made uppercase.';
const lowerMessage = () => 'Only strings can be made lowercase.';

export const min = (rule, message) => [
  value => [value, value.length >= rule],
  message || minMessage(rule),
];
export const max = (rule, message) => [
  value => [value, value.length <= rule],
  message || maxMessage(rule),
];
export const email = message => [
  value => [
    value,
    /^[a-zA-Z0-9.!#$%&’*+/"=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value),
  ],
  message || emailMessage(),
];

const caseChange = (value, transformType) => {
  const isString = typeof value === 'string';
  return [isString ? value[transformType]() : value, isString];
};
export const upper = message => [
  value => caseChange(value, 'toUpperCase'),
  message || upperMessage,
];
export const lower = message => [
  value => caseChange(value, 'toLowerCase'),
  message || lowerMessage,
];
