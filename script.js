

let productsJ = localStorage.getItem('products');
let products = JSON.parse(productsJ);

let table = document.querySelector('table');
let tableBody = document.querySelector('table tbody');

let modal = document.querySelector('#modal');
let modal2 = document.querySelector('#modal2');

let productName = document.querySelector('#productName');
let productPrice = document.querySelector('#productPrice');
let productQty = document.querySelector('#productQty');

let productName2 = document.querySelector('#productName2');
let productPrice2 = document.querySelector('#productPrice2');
let productQty2 = document.querySelector('#productQty2');

let productIndexToEdit = null;

let openModal = () => {
   modal.classList.replace('d-none', 'd-flex');
}

let openModal2 = (index) => {
    productIndexToEdit = index;
    let phoneToEdit = products[index];
    productName2.value = phoneToEdit.name;
    productPrice2.value = phoneToEdit.price;
    productQty2.value = phoneToEdit.quantity;
  
   modal2.classList.replace('d-none', 'd-flex');
}

let closeModal = () => {
    modal.classList.replace('d-flex', 'd-none');
}

let closeModal2 = () => {
    modal2.classList.replace('d-flex', 'd-none');
}

let showProducts = () => {

    table.innerHTML = '';
    products.forEach((el, index) => {
        let row = `<tr> 
                                   <td>${index+1}</td>
                                   <td>${el.name}</td>
                                   <td>${el.price+'EGP'}</td>
                                   <td>${el.quantity+' Peaces'}</td>
                                   <td class="d-flex flex-row gap-2">
                                      <button onclick="removePhone(${index})" class='btn btn-danger w-20 w-lg-40'>Delete</button>
                                      <button onclick="openModal2(${index})" class='btn btn-warning w-20'>Edit</button>
                                   </td>
                                 
                                  </tr>`
      table.innerHTML +=row;
    })
    
}

let addNewPhone = () => {
    let product = {
    name: productName.value,
    price: +productPrice.value,
    quantity: +productQty.value,

}
    productName.value = '';
    productPrice.value = '';
    productQty.value = '';

    products.push(product);
    closeModal();
    localStorage.setItem('products',JSON.stringify(products));
    showProducts();
    let productsJson = JSON.stringify(products);
    localStorage.setItem('products',productsJson);
    swal.fire({
        icon: 'success',
        title: 'New product added!',
    })
}

let updatePhone = () => {
    let updatedItem = {
        name: productName2.value,
        price: +productPrice2.value,
        quantity: +productQty2.value
    }

    products[productIndexToEdit] = updatedItem;
    closeModal2();
    localStorage.setItem('products',JSON.stringify(products));
    showProducts();
    swal.fire({
        icon: 'success',
        title: 'Device Editted Successfully!',
    })


}

let removePhone = (index) => {
 let sureIndex = swal.fire({
    icon:'question',
    title:'Are you sure?',
    text: 'The item will be deleted forever!',
    confirmButtonText: 'Yes, delete it',
    showDenyButton: true,
    denyButtonText:'No,Not now!'

 }).then((res) =>{
    if(res.isConfirmed){
       products.splice(index, 1);
       localStorage.setItem('products',JSON.stringify(products));
       showProducts();
    }
 })
  
}