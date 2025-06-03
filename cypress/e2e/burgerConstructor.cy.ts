import * as orderData from '../fixtures/order.json';
const API_URL = Cypress.env('BURGER_API_URL');

describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  it('должен загрузить и отобразить ингредиенты', () => {
    // cy.wait('@getIngredients'); // дождемся запроса
    cy.contains('Булки').should('exist');
    cy.contains('Флюоресцентная булка R2-D3').should('exist');
    cy.contains('Кристаллы марсианских альфа-сахаридов').should('exist');
    cy.contains('Соус традиционный галактический').should('exist');
  });

  it('должен добавить булки и ингредиент в конструктор', () => {
    // Добавляем булку
    cy.contains('Флюоресцентная булка R2-D3')
      .parent()
      .within(() => {
        cy.contains('Добавить').click();
      });

    // Проверяем наличие булки в конструкторе
    cy.contains('Флюоресцентная булка R2-D3 (верх)').should('exist');
    cy.contains('Флюоресцентная булка R2-D3 (низ)').should('exist');

    // Добавляем начинку
    cy.contains('Кристаллы марсианских альфа-сахаридов')
      .parent()
      .within(() => {
        cy.contains('Добавить').click();
      });

    // Проверяем наличие начинки в конструкторе
    cy.get('.constructor-element').contains('Кристаллы марсианских альфа-сахаридов').should('exist');
  });

  it('проверка открытия и закрытия модального окна ингридиента', () => {
    // нажимаем на ингридиент
    const ingredient = cy.contains('Флюоресцентная булка R2-D3');
    ingredient.click();

    // находим модальное окно
    cy.get(`[data-test=modal]`);
    // закрываем
    cy.get(`[data-test=close_modal_btn]`).click();
  });

  describe("Проверка оформления заказа", () => {

    beforeEach(() => {
        cy.setCookie('accessToken', 'TEST_ACCESS_TOKEN');
        localStorage.setItem('refreshToken', 'TEST_REFRESH_TOKEN');

        cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
        cy.intercept('POST', 'api/orders', { fixture: 'order' });
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
        cy.visit('http://localhost:4000');
        // cy.wait('@getUser');
    });

    it("Процедура оформления заказа", () => {
    // Добавляем ингредиенты
        cy.contains('Флюоресцентная булка R2-D3').parent().within(() => {
            cy.contains('Добавить').click();
        });
        cy.contains('Кристаллы марсианских альфа-сахаридов').parent().within(() => {
            cy.contains('Добавить').click();
        });

        cy.get(`[data-test=button-builder]`).click();
        
        cy.get(`[data-test=modal]`).contains(orderData.order.number);

        cy.get(`[data-test=close_modal_btn]`).click();

        // Проверям пустой ли конструктор, смотря на кнопку заказа (если ингридиентов нет, то она отключена)
        cy.get(`[data-test=button-builder]`).should('be.disabled');
    });
        


    afterEach(() => {
      // Очистка токенов
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
    });

  })
});
