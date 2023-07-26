import formData from 'form-data';
import Mailgun from 'mailgun.js';

export const mg = new Mailgun(formData).client({
  username: 'api',
  key: '48b8d7df26c562f50dda63f2e96151c4-73f745ed-0cfe1e7b',
});
