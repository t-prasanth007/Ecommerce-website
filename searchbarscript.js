const searchInput=document.querySelector('.search-input')
const product_Cards=document.querySelectorAll('.product-card')
searchInput.addEventListener('input', (e)=>{
    const searchTerm=e.target.value.toLowerCase().trim()
    product_Cards.forEach(card=>{
        const product_Name=card.querySelector('.product-name').textContent.toLowerCase()
        if(product_Name.includes(searchTerm)){
            card.style.display=''
        }
        else{
            card.style.display='none'
        }

    })
})