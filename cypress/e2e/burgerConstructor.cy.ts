import * as orderData from '../fixtures/order.json';

describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('должен загрузить и отобразить ингредиенты', () => {
    cy.contains('Булки').should('exist');
    cy.contains('Флюоресцентная булка R2-D3').should('exist');
    cy.contains('Кристаллы марсианских альфа-сахаридов').should('exist');
    cy.contains('Соус традиционный галактический').should('exist');
  });

  it('должен добавить булки и ингредиент в конструктор', () => {
    cy.addIngredientByName('Флюоресцентная булка R2-D3');
    cy.contains('Флюоресцентная булка R2-D3 (верх)').should('exist');
    cy.contains('Флюоресцентная булка R2-D3 (низ)').should('exist');

    cy.addIngredientByName('Кристаллы марсианских альфа-сахаридов');
    cy.get('.constructor-element').contains('Кристаллы марсианских альфа-сахаридов').should('exist');
  });

  it('проверка открытия и закрытия модального окна ингредиента', () => {
    cy.contains('Флюоресцентная булка R2-D3').as('ingredient');
    cy.get('@ingredient').click();

    cy.get('[data-test=modal]').should('exist');
    cy.get('[data-test=close_modal_btn]').click();
    cy.get('[data-test=modal]').should('not.exist');
  });

  describe('Проверка оформления заказа', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'TEST_ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'TEST_REFRESH_TOKEN');

      cy.intercept('GET', 'api/auth/user', { fixture: 'user' }).as('getUser');
      cy.intercept('POST', 'api/orders', { fixture: 'order' }).as('postOrder');
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as('getIngredients');

      cy.visit('/');
    });

    it('процедура оформления заказа', () => {
      cy.addIngredientByName('Флюоресцентная булка R2-D3');
      cy.addIngredientByName('Кристаллы марсианских альфа-сахаридов');

      cy.get('[data-test=button-builder]').click();
      cy.get('[data-test=modal]').contains(orderData.order.number);
      cy.get('[data-test=close_modal_btn]').click();

      cy.get('[data-test=button-builder]').should('be.disabled');
    });

    afterEach(() => {
      cy.clearAllCookies();
      cy.clearAllLocalStorage();
    });
  });
});
