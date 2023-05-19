/// <reference types="cypress" />

//1
describe("Test Makeup Button's Function", ()=> {
    it("on clicking makeup button navigates to page with title makeup", ()=> {
        cy.visit("https://automationteststore.com/");
        cy.get("[href$='36']").click();
        cy.get(".maintext").should("have.text", "Makeup");
    });
});
//2
describe("Test Product Choosing Function", ()=> {
    it("on clicking a bronzer product navigates to page with description of that product", ()=> {
        cy.visit("https://automationteststore.com/index.php?rt=product/category&path=36");
        cy.get("[title='Tropiques Minerale Loose Bronzer']").click();
        cy.get("[class='bgnone']").should("have.text", "Tropiques Minerale Loose Bronzer");
    });
});
//3
describe("Test Product Type Choosing Function", ()=> {
    it("when selecting the type of product from dropdown list, there should be the name of selected type", ()=> {
        cy.visit("https://automationteststore.com/index.php?rt=product/product&path=36&product_id=53");
        cy.get("[name='option[318]']").select("Natural Golden");
        cy.get("[name='option[318]']").should("contain", "Natural Golden");
    });
});
//4
describe("Test Add to Cart Button Function", ()=> {
    it("on clicking Add to Cart Button navigates to Shoping Cart page", ()=> {
        cy.visit("https://automationteststore.com/index.php?rt=product/product&path=36&product_id=53");
        cy.get("[class='cart']").click();
        cy.get(".maintext").should("have.text", " Shopping Cart");
    });
});
//5
describe("Test Checkout Function", ()=> {
    it("On clicking checkout button navigates to account login page", ()=> {
        cy.visit("https://automationteststore.com/index.php?rt=product/product&path=36&product_id=53");
        cy.get("[class='cart']").click();
        cy.get("[id='cart_checkout1']").click();
        cy.get(".maintext").should("have.text", " Account Login");
    });
});
//6
describe("Test Search Function", ()=> {
    it("on typing a product name navigates to the page with descriptiolon of that product", ()=> {
        cy.visit("https://automationteststore.com/");
        cy.get("[placeholder='Search Keywords']").type("Benefit Bella Bamba");
        cy.get("[title='Go']").click();
        cy.get("[class='bgnone']").should("have.text", "Benefit Bella Bamba");
    });
});
//7
describe("Test Product's Minimum Quantity Function", ()=> {
    it("on choosing less than minimum quantity of the product an error should accure", ()=> {
        cy.visit("https://automationteststore.com/index.php?rt=product/product&product_id=52");
        cy.get("[class='input-group ']").should("contain", "This product has a minimum quantity");
        cy.get("[id='product_quantity']").clear().type(1);
        cy.get("[class='cart']").click();
        cy.get("[class='alert alert-error alert-danger']").should("contain.text", "Allowed product's quantity is below minimum required. Quantity was set to minimum amount.");
    });
});
//8
describe("Test Delete Function of Shopping Cart", ()=> {
    it("on clicking delete button in Shopping Cart page, the given product should be deleted from Cart", ()=> {
        cy.visit("https://automationteststore.com/");
        cy.get("[placeholder='Search Keywords']").type("Benefit Bella Bamba");
        cy.get("[title='Go']").click();
        cy.get("[class='cart']").click();
        cy.get("[class='btn btn-sm btn-default']").click();
        cy.get("[class='contentpanel']").not("contain", "Benefit Bella Bamba")
    });
});
//9
describe("Test Review Function without Captcha", ()=> {
    it("on product review page while filling all the fields except captcha an error should accure", ()=> {
        cy.visit("https://automationteststore.com/index.php?rt=product/product&path=36_37&product_id=61");
        cy.get("[href='#review']").click();
        cy.get("[title='5']").click();
        cy.get("[name='name']").type("Anahit");
        cy.get("[name='text']").type("Color Design Eye Brightening All in One 5 Shadow & Liner Palette is the best.");
        cy.get("[id='review_submit']").click();
        cy.get("[class='alert alert-error alert-danger']").should("contain", "Human verification has failed! Please try again.");
    });
});
//10
describe("Test Contact Us Function", ()=> {
    it("on Contact Us page while filling all the fields, the enquiry should be sent successfully", ()=> {
        cy.visit("https://automationteststore.com/");
        cy.get("[href='https://automationteststore.com/index.php?rt=content/contact']").click();
        cy.get("[id='ContactUsFrm_first_name']").type("Anahit");
        cy.get("[id='ContactUsFrm_email']").type("Anahit@mail.ru");
        cy.get("[id='ContactUsFrm_enquiry']").type("Color Design Eye Brightening All in One 5 Shadow & Liner Palette is the best.");
        cy.get("[title='Submit']").click();
        cy.get("[class='mb40']").should("contain", "Your enquiry has been successfully sent to the store owner!");
    });
});