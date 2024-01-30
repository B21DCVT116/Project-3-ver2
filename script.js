// var api = "http://localhost:3000/products?q=&_page=&_limit=&_sort=&_order=";
//http://localhost:3000/products?q=&_page=&_limit=&_sort=&_order=
let query = {
    sort: "",
    order: "",
    search:"",
    limit:"6",
    page:"1"
  };

const fetchApi = async (api) =>{
    let responsive = await fetch(api);
    return result = await responsive.json();
}

function renderProduct(){
    const api = `https://project-3-c3124-default-rtdb.firebaseio.com/products?q=${query.search}&_page=${query.page}&_limit=${query.limit}&_sort=${query.sort}&_order=${query.order}`;
    fetchApi(api)
        .then ((data)=>{
            let product = data.map(item => (
                `
                <div class="product">
                    <div class="image-product">
                        <img src="${item.thumbnail}" alt="${item.title}">
                    </div>
                    <div class="discount-product"> -${item.discountPercentage}%</div>
                    <div class="info-product">
                        <h3 class="product-title">${item.title}</h3>
                        <div class="product-price">Price: ${item.price}$</div>
                        <div class="product-stock">Stock: ${item.stock}</div>
                        <div class="product-rating">Rating: ${item.rating} <i class='bx bxs-star'></i></div>
                    </div>
                </div>
                `
            ))
            let group = document.querySelector(".group");
            group.innerHTML = product.join("");
        })
}

function searchInput(){
    query.search = document.querySelector(".search").value;//lay gia tri search
    query.page=1;
    pageNumber();
    renderProduct();
}

function pageNumber(){
    const api = `https://project-3-c3124-default-rtdb.firebaseio.com/products?q=${query.search}&_page=&_limit=&_sort=${query.sort}&_order=${query.order}`;
    fetchApi(api)
        .then ((data)=>{
            console.log(data);
            let totalPage = Math.ceil(parseFloat(data.length) / 6.00);
            if (totalPage==0) document.querySelector(".pageArr").innerHTML = "Không tìm thấy sản phẩm";
            else{
                let li="";
                for (let i = 1; i <= totalPage; i++) {
                    li += `
                    <li class="pagination" onclick="handlePageNumber(${i})">${i}</li>
                    `
                }
                document.querySelector(".pageArr").innerHTML = li;
            }
        })
}
// xu ly dua den so trang da chon
function handlePageNumber (pageNum){
    query.page = pageNum;
    renderProduct();
}

//Hiển thị danh mục sản phẩm
function renderListProduct(){
    const api = `https://project-3-c3124-default-rtdb.firebaseio.com/categories`;
    fetchApi(api)
        .then ((data)=>{
            console.log(data);
            let productList = data.map(item => (
                `
                <button class="${item}" onclick="handleButtonProductList('${item}')">${item.split("-").join(" ")}</button>
                `
            ))
            let sidebar = document.querySelector(".sidebar");
            sidebar.innerHTML += productList.join("");
        })
}
//Xử lý khi ấn vào danh mục sản phẩm
function handleButtonProductList(search){
    console.log(search);
    document.querySelector(".search").value = search;
    searchInput();
}

function sort(obj){
    query.sort = obj.value.split(" ")[0];
    query.order = obj.value.split(" ")[1];
    query.page=1;
    pageNumber();
    renderProduct();
}

function start(){
    //Hiển thị danh sách sản phẩm
    renderListProduct();
    //Hiển thị danh sách sản phẩm

    //Hiển thị sản phẩm
    renderProduct();
    //Hiển thị sản phẩm

    //Phân trang sản phẩm
    pageNumber();
    //Phân trang sản phẩm
}

start()