import React, { useEffect, useState } from 'react'
import {Header} from '../common/Header'
import classes from "./Product.module.scss";
import ProductImg from "../assets/images/product.jpg";
import { MinusIcon, PlusIcon } from '../common/SVG';
import { getProductList } from '../services/Service';
import { useDispatch, useSelector } from "react-redux";
import { DecrementAction, IncrementAction, ProductAction, ToggleAction } from '../actions/Action';

function ProductLitst(props) {
  const productItems = useSelector((state) => state);
  const dispatch = useDispatch();
  const incrementHandler = (data) => dispatch(IncrementAction(data));
  const decrementHandler = (data) => dispatch(DecrementAction(data));
  const productHandler = (data) => dispatch(ProductAction(data));
  const toggleHandler = (data) => dispatch(ToggleAction(data));
  console.log(props, "state:::::::");
  const [dataList, setDataList] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const getData = () => {
      getProductList()
      .then((res) => res.json())
      .then((result) => {
        let storeData = result.products.map((data, i) => {
          return {
            ...data,
            price: localStorage.getItem("quantity" + data.id) ? parseInt(data.price) * localStorage.getItem("quantity" + data.id) : 39,
            qty: parseInt(localStorage.getItem("quantity" + data.id))
              ? parseInt(localStorage.getItem("quantity" + data.id)) : parseInt(localStorage.getItem("quantity" + data.id)) === 0 ? parseInt(localStorage.getItem("quantity" + data.id)) : 1,
          };
        });

        let dropdownData = result.products.map((data, i) => {
          return {
            ...data,
            qty: 1,
          };
        });
        console.log(storeData, 'sdaaaaaaaaaaaaaaaaaaaaaaaa');
        setDataList(storeData);
        productHandler(storeData);
        toggleHandler(dropdownData);
      })
      .catch((error) => {
        setErrorMsg(true)
      });
    };
  const changeHandler = (inputVal, data) => {
    var numberRegex = /^[0-9\b]+$/;
    if (inputVal >= 11) {
      return setDataList([...dataList], data.qty);
    }
    if (inputVal === "" || numberRegex.test(inputVal)) {
      setDataList(
        [...dataList],
        (data.qty = inputVal),
        (data.price = data.qty * 39)
      );
    }
    localStorage.setItem("quantity" + data.id, inputVal);
  };
  
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={classes.wrapper}>
      <Header />
      <ul className={classes.ProductList}>
        {productItems.ProductStore.storeData?.map((items, i) => {
          return (
            <li key={i}>
              <div className={classes.ProductItems}>
                <div className={classes.ProductImgs}>
                  <div>
                    <img src={ProductImg} alt="product" />
                  </div>
                  <div>
                    <h3>{items.title}</h3>
                    <h5>Product Description</h5>
                  </div>
                </div>
                <div className={classes.PrdRight}>
                  <div className="d-flex">
                    <button onClick={() => decrementHandler(items)}>
                      <MinusIcon />
                    </button>
                    <input
                      type="text"
                      name="qty"
                      onChange={(e) =>
                        changeHandler(parseInt(e.target.value) || 0, items)
                      }
                      value={items.qty || ""}
                    />
                    <button onClick={() => incrementHandler(items)}>
                      <PlusIcon />
                    </button>
                  </div>
                  {/* <p>
                    localStorage : {localStorage.getItem("quantity" + items.id)}
                  </p> */}
                  <div className="text-right">
                    <h3>
                      <strong>
                        {items.currency}
                        {items.price}
                      </strong>
                    </h3>
                  </div>
                </div>
              </div>
              {items.qty < 1 ? (
                <div>
                  <p className="error mb-0">Quality can not less than 1</p>
                </div>
              ) : (
                ""
              )}
            </li>
          );
        })}
        {!productItems.ProductStore.storeData ? (
          <>
            {errorMsg ? (
              <div className="error-msg">
                <h3>Something went wrong</h3>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}

export default ProductLitst;
