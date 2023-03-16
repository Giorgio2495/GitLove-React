/* eslint-disable jsx-a11y/alt-text */
import styles from "../Product.module.scss";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import spinnerImg from "../../../assets/spinner.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
    ADD_TO_CART,
    CALCULATE_TOTAL_QUANTITY,
    DECREASE_CART,
    selectCartItems,
} from "../../../redux/slice/cartSlice";import useFetchDocument from "../../../customHooks/useFetchDocument";
//import useFetchCollection from "../../../customHooks/useFetchCollection";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";
import { getProduct } from "../../../redux/actions/actionProduct";
import UserContact from "../../../pages/contact/UserContact";
import style from './ProductDetails.module.scss';
import GoogleMaps from 'simple-react-google-maps';

const ProductDetails = () => {

    const [order, setOrder] = useState();
    const { name } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((store) => store.product);
    console.log(product);

    useEffect(() => {
        getDetail()
    }, [])
    const getDetail = () => {
        const dataProduct = product.products.slice();
        const description = dataProduct.find(p => p.name === name);
        setOrder(description)
        console.log(dataProduct);
        console.log(description);
    }

    useEffect(() => {
        dispatch(getProduct());
      }, [dispatch]);
    
   const btnNew =document.getElementById('btnNew')
    return (
        <section>
            {
            order ? (
                <>
                <div className={style.cardDetails}>
                    
                        <h2 className={style.titulo}>{order.name}</h2>
                        <img className={style.cardImg}
                        src={order.imageURL}/>
                        {/* <h2>{order.category}</h2> */}
                        <p className={style.enunciado}>{order.descripcion}</p>
                    
                    <div className={style.map}>
                        <GoogleMaps 
                         apiKey={"AIzaSyAIoaqD6zupornIMbdYcAfDaTSHjAjFWJ4"}
                         style={{ height: "400px", width: "300px" }}
                         zoom={12}
                         center={{
                           lat: 6.25184,
                           lng: -75.56359
                         }}
                         markers={[
                           { lat: 4.644251307171578, lng: -74.08727299587092},
                           { lat: 6.25184, lng: -75.52054}
                         ]}
                        />
                    </div>
                </div>
                <UserContact/>
                </>
            ) : (
                <div>No hay información</div>
            )
        }
        </section>
    );
};

export default ProductDetails;