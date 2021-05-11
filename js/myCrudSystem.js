var productNameInput = document.getElementById("pname");
var productCategoryInput = document.getElementById("pcategory");
var productPriceInput = document.getElementById("pprice");
var productDescriptionInput = document.getElementById("pdescription");
var productSearchInput = document.getElementById("searchInp");
var productList;

// Check if you are a new user or not?

if (localStorage.getItem("myProducts") == null) {
    var productList = [];
}
else {
    var productList = JSON.parse(localStorage.getItem("myProducts"));
    displayProducts();
}

//---------- check the Main Btn--------

function checkMainBtn() {
    if (document.getElementById("mainBtn").innerHTML != "Update Product") {
        if (checkInputs() == true)
            if (validateInputs() == true) {
                {
                    var Product = {
                        productName: productNameInput.value,
                        productCategory: productCategoryInput.value,
                        productPrice: productPriceInput.value,
                        productDescription: productDescriptionInput.value,
                    };

                    productList.push(Product);
                    JSON.stringify(productList);
                    localStorage.setItem("myProducts", JSON.stringify(productList));
                    displayProducts();
                    alert("Add");
                    clearForm();

                }
            }
            else
            {
                window.alert("Enter a valid Inputs!");
            }
            else
            {
                window.alert("You should fill in al the fields to add a product!");
            }
    }   
    else if (document.getElementById("mainBtn").innerHTML == "Update Product") {


        var Product = {

            productName: productNameInput.value,
            productCategory: productCategoryInput.value,
            productPrice: productPriceInput.value,
            productDescription: productDescriptionInput.value,
        };
        productList.splice(indexNum, 1, Product);
        JSON.stringify(productList);
        localStorage.setItem("myProducts", JSON.stringify(productList));
        displayProducts();
        alert("Update");
    }
}

//---------Display Product----------

function displayProducts() {
    var TRs = "";

    for (var i = 0; i < productList.length; i++) {
        TRs += `<tr>
        <th>${i}</th>
        <th>${productList[i].productName}</th>
        <th>${productList[i].productCategory}</th>
        <th>${productList[i].productPrice}</th>
        <th>${productList[i].productDescription}</th>
        <th><button onclick="updateProducts(${i})" class="btn btn-warning"><i class="fas fa-edit"></i></button></th>
        <th><button onclick="deleteProducts(${i})" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></th> 
        </tr>`
    }

    tbody.innerHTML = TRs;
}

//-------- Search Product----------

function searchProduct() {
    var TRs = "";

    for (var i = 0; i < productList.length; i++) {

        if (productList[i].productName.toLowerCase().includes(productSearchInput.value.toLowerCase())) {
            var x = productList[i].productName.replace(/productSearchInput.value.toLowerCase()/g, "<span class='highlight'>productSearchInput.value.toLowerCase()</span>");
            console.log(x);
            TRs += `<tr>
            <th>${i}</th>
            <th>${productList[i].productName.replace(productSearchInput.value,`<span style="background-color : yellow">${productSearchInput.value}</span>`)}</th>
            <th>${productList[i].productCategory}</th>
            <th>${productList[i].productPrice}</th>
            <th>${productList[i].productDescription}</th>
            <th><button class="btn btn-warning"><i class="fas fa-edit"></i></button></th>
            <th><button class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></th> 
            </tr>`;

        }

    }
    tbody.innerHTML = TRs;
}

//-------- Delete Product----------

function deleteProducts(ind) {
    productList.splice(ind, 1);
    localStorage.setItem("myProducts", JSON.stringify(productList));
    displayProducts();

}

//-------- Update Product----------

function updateProducts(ind) {
    productNameInput.value = productList[ind].productName;
    productCategoryInput.value = productList[ind].productCategory;
    productPriceInput.value = productList[ind].productPrice;
    productDescriptionInput.value = productList[ind].productDescription;
    window.indexNum = ind;
    mainBtn.innerHTML = "Update Product";
}

//------ Clear Form Function ---------

function clearForm() {
    productNameInput.value = "";
    productCategoryInput.value = "";
    productPriceInput.value = "";
    productDescriptionInput.value = "";
}

//-------- Check Inputs Function------------

function checkInputs() {
    if (productNameInput.value != "" && productCategoryInput.value != "" && productPriceInput.value != "" && productDescriptionInput.value != "") {
        return true;
    }
    else {
        return false;
    }
}

//-------------- Inputs Validations ---------------

var regexProductName = /^[A-Z][a-z]{0,10}$/;
var regexproductCategor = /^[A-Z][a-z]{0,10}$/;
var regexproductPrice = /^[0-9]+$/;
var regexproductDescription = /^[A-Z][a-z]{2,}$/;

function validateInputs() {
    if (regexProductName.test(productNameInput.value) == true && regexproductCategor.test(productCategoryInput.value) == true && regexproductPrice.test(productPriceInput.value) == true && regexproductDescription.test(productDescriptionInput.value) == true) {
        return true;
    }
    else {
        return false;
    }
}