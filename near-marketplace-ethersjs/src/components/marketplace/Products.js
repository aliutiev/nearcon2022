import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddProduct from "./AddProduct";
import Product from "./Product";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
    getNFTs as getNFTList,
    buyNFT,
    mintNFT,
} from "../utils/marketplace";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const getNFTs = useCallback(async () => {
        try {
            setLoading(true);
            setProducts(await getNFTList());
        } catch (error) {
            console.log({ error });
        } finally {
            setLoading(false);
        }
    });

    const addProduct = async (data) => {
        try {
            setLoading(true);
            mintNFT(data).then((resp) => {
                getNFTs();
            });
            toast(<NotificationSuccess text="NFT minted successfully." />);
        } catch (error) {

            console.log({ error });
            toast(<NotificationError text="Failed to mint an product." />);
        } finally {
            setLoading(false);
        }
    };
    const buy = async (id, price) => {
        try {
            await buyNFT({ id, price }).then((resp) => getNFTs());
            toast(<NotificationSuccess text="NFT bought successfully" />);
        } catch (error) {
            toast(<NotificationError text="Failed to purchase NFT." />);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getNFTs();
    }, []);
    
    return (
        <div>
          {!loading ? (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fs-4 fw-bold mb-0">Ecotech NFTs</h1>
                <AddProduct save={addProduct} />
              </div>
              <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
                {products.map((_product) => (
                  <Product
                    product={{
                      ..._product,
                    }}
                    buy={buy}
                  />
                ))}
              </Row>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      );
    };
    
export default Products;