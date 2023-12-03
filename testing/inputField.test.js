// script.test.js
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const { fireEvent } = require("@testing-library/dom");

// Load your HTML file
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");
const dom = new JSDOM(html);
const { document } = dom.window;

describe("Form Input Fields", () => {
  let form;

  beforeEach(() => {
    form = document.getElementById("addBookModal");
  });

  //This test fail because input field allows only white spaces 
  test("Title field is should contain at least one non-white space character", () => {
    const titleInput = document.getElementById("title");
    fireEvent.input(titleInput, {target: { value: "  "}})
    console.log(titleInput.validationMessage)
    fireEvent.submit(form);
    expect(titleInput.validationMessage).toBe("Constraints not satisfied");
  });

  //This test pass
  test("Author field accepts only letters and spaces", () => {
    const authorInput = document.getElementById("author");
    fireEvent.input(authorInput, { target: { value: "123" } });
    console.log(authorInput.validationMessage);
    fireEvent.submit(form);
    expect(authorInput.validationMessage).toBe(
      "Constraints not satisfied"
    );
  });


  //This test failed because the input fields allows only whitespace
  test("Author field is should contain at least one non-white space character", () => {
    const authorInput = document.getElementById("author");
    fireEvent.input(authorInput, { target: { value: "   " } });
    console.log(authorInput.validationMessage);
    fireEvent.submit(form);
    expect(authorInput.validationMessage).toBe(
      "Constraints not satisfied"
    );
  });


  //This test failed because it accepts -0
  test("Number of pages should be greater than zero", () => {
    const numberOfPages = document.getElementById("number_of_pages");
    fireEvent.input(numberOfPages, { target: { value: "-0" } });
    console.log(numberOfPages.validationMessage);
    fireEvent.submit(form);
    expect(numberOfPages.validationMessage).toBe(
      "Constraints not satisfied"
    );
  });

    //This test failed because it accepts 0
    test("Number of pages should be greater than zero", () => {
        const numberOfPages = document.getElementById("number_of_pages");
        fireEvent.input(numberOfPages, { target: { value: "0" } });
        console.log(numberOfPages.validationMessage);
        fireEvent.submit(form);
        expect(numberOfPages.validationMessage).toBe(
          "Constraints not satisfied"
        );
      });
    
   //This test passed
   test("Number of pages should be greater than zero", () => {
    const numberOfPages = document.getElementById("number_of_pages");
    fireEvent.input(numberOfPages, { target: { value: "-1" } });
    console.log(numberOfPages.validationMessage);
    fireEvent.submit(form);
    expect(numberOfPages.validationMessage).toBe(
      "Constraints not satisfied"
    );
  });


});
