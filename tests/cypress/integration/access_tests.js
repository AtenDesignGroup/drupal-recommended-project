describe('Verifies that unauthenticated users cannot access /admin/content', () => {
  // Be sure to start as an unauthenticated user.
  it('Logs out of Drupal', () => {
    cy.drupalLogout();
  })

  it('Tries to visit /admin/content and gets a 403 error', () => {
    cy.visit('/admin/content', { failOnStatusCode: false });
    cy.contains('Access denied');
  });

});
