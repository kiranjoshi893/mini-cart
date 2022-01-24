import React, { forwardRef, useRef, useState, useEffect } from "react";
import classes from "../common/Header.module.scss";
import CartIcon from '../assets/images/cart.jpg'
import { CloseIcon } from './SVG';
import { RemoveListAction, ToggleAction, ToggleList } from "../actions/Action";
import { connect, useDispatch, useSelector } from "react-redux";

export const Header = (props) => {
  const [show, setShow] = useState(false);
  const toggleList = useSelector((state) => state.ListStore.toggleData);
  console.log(!localStorage.getItem("removeList") ? toggleList : localStorage.getItem("removeList"), "toggleList");
  const dispatch = useDispatch();
  const removeList = (data) => {
    dispatch(RemoveListAction(data));
  };
  const [productList, setProductList] = useState(toggleList);
  const [price, setPrice] = useState([0, 0]);
  console.log(toggleList, price, "-1111111111331");
  const toggleDropdown = () => {
    setShow(!show);
  };
  
  const node = useRef();
  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setShow(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  useEffect(() => {
    setProductList(toggleList);
    console.log(toggleList, "::111sadadasd");
  }, [toggleList]);
  // console.log(productList, "productList:::::::");
  // console.log(localStorage.getItem("removeList"), 'removeList:::::::::::');
  useEffect(() => {
    const totalItems = toggleList?.map((data) => {
      return data.qty;
    });
    setPrice(totalItems);
    console.log(price, productList, totalItems, "111sadadasd");
  }, [props]);
  return (
    <header>
      <div className={classes.carList}>
        <ul>
          <li className="text-left">
            <div className={classes.dropdownMain} ref={node}>
              {productList?.length ?
              <>
              <div className={classes.dropdown} onClick={toggleDropdown}>
                <h3> ${price?.reduce(function(x, y){
                  return Number(x) + Number(y) * 39;
                }, 0)}</h3>
                <h4>{productList.length ? `${(productList.length)} items` : '' }</h4>
              </div> 
              <div className={`${classes.showDropdown} ${
                  show ? classes.showDropdown111 : "" }`}>
                <ul>
                  {productList?.map((items, i) => {
                    return (
                      <li key={i}>
                        <div>
                          <div
                            className="cursor-pointer"
                            onClick={() => removeList(items)}
                          >
                            <CloseIcon />
                          </div>
                          <div className={classes.content}>
                            <h3>{items.title}</h3>
                            <h4>
                              {items.currency}
                              {items.price}
                            </h4>
                          </div>
                        </div>
                        <h5 className="my-0">Qty {items.qty}</h5>
                      </li>
                    );
                  })}
                </ul>
              </div></> : ''}
            </div>
          </li>
          <li>
            <img src={CartIcon} alt="cart" />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;