// ---------------------------------------------------------------
// Issue #64: the form must not report success when a save fails
// Checks that handleSubmit tests response.ok before the success alert
// ---------------------------------------------------------------
const fs = require('fs');

const source = fs.readFileSync('./src/form.jsx', 'utf8');

describe('Issue #64: form success message', () => {
  it('checks response.ok before showing the success alert', () => {
    const okCheck = source.indexOf('response.ok');
    const successAlert = source.indexOf('Package logged successfully');

    expect(okCheck).toBeGreaterThan(-1);
    expect(successAlert).toBeGreaterThan(okCheck);
  });

  it('shows the server error message when the save fails', () => {
    expect(source).toMatch(/Could not save package/);
  });
});
