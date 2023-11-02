import './App.css';
import React, { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([])
  const [pages, setPages] = useState(1)

  const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products?limit=100');
    const data = await res.json();

    if(data && data.products){
      setProducts(data.products);
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const selectPageHandle = (selected) => {
    if(
      selected >= 1 &&
      selected <= products.length/10 &&
      selected !== pages
    )
    setPages(selected)
  }
  return (
    <div>
      {
        products.length > 0 && <div className='products'>
          {
            products.slice(pages * 10 - 10, pages * 10).map((prod) => {
              return <span className='products__single' key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            })
          }
        </div>
      }
      {
        products.length > 0 && <div className='pagination'>
          <span 
            onClick={() => selectPageHandle(pages-1)}
            className={pages > 1 ? "" : "pagination__disable"}>
              ◀
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return <span 
            className={pages === i+1 ? "pagination__selected" : ""}
            onClick={() => selectPageHandle(i+1)}
            key={i}>{i+1}
            </span>
          })}
          <span 
            onClick={() => selectPageHandle(pages+1)}
            className={pages < products.length/10 ? "" : "pagination__disable"}>
              ▶
          </span>
        </div>
      }
    </div>
  );
}

export default App;
