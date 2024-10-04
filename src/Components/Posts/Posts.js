import React, { useContext, useEffect, useState } from "react";
import { firebasecontext } from "../../Store/Firebasecontext";
import Heart from "../../assets/Heart";
import "./Post.css";
import { postContext } from "../../Store/Postcontext";
import { useNavigate } from "react-router-dom";

function Posts() {
  const { firebase } = useContext(firebasecontext);
  const [product, setProduct] = useState([]);
  const { setPostDetails } = useContext(postContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await firebase.firestore().collection("product").get();
        const allPost = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProduct(allPost);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, [firebase]);

  const handlePost = (selectedProduct) => {

    setPostDetails(selectedProduct);
    navigate("/view");
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {product.map((obj) => {
            return (
              <div
                className="card"
                key={obj.id}
                onClick={() => handlePost(obj)}
              >
                {" "}

                <div className="favorite">
                  <Heart />
                </div>
                <div className="image">
                  <img src={obj.url} alt={obj.name} />{" "}
                </div>
                <div className="content">
                  <p className="rate">&#x20B9;{obj.price}</p>
                  <span className="kilometer">{obj.category}</span>
                  <p className="name">{obj.name}</p>
                </div>
                <div className="date">
                  <span>{obj.createAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;
