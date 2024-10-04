import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { Authcontext, firebasecontext } from "../../Store/Firebasecontext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const { firebase } = useContext(firebasecontext);
  const { user } = useContext(Authcontext);
  const data = new Date();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (validTypes.includes(file.type)) {
        setImage(file);
      } else {
        alert("Please upload an image file (jpg or png).");
      }
    }
  };

  const hamdleSubmit = () => {
    if (!name || !category || !price || !image) {
      alert("Please fill in all the details");
    } else {
      firebase
        .storage()
        .ref(`/image/${image.name}`)
        .put(image)
        .then(({ ref }) => {
          ref.getDownloadURL().then((url) => {
            firebase.firestore().collection("product").add({
              name,
              category,
              price,
              url,
              userId: user.uid,
              createAt: data.toDateString(),
            });
            navigate("/");
          });
        });
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="fname"
            name="Name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="fname"
            name="category"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="tel"
            id="fname"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="Price"
          />
          <br />
          <br />
          {image ? (
            <img
              className="uploadedImage"
              width="100%"
              height="auto"
              src={URL.createObjectURL(image)}
              alt="Uploaded preview"
            />
          ) : (
            <p>No image uploaded. Please upload an image.</p>
          )}
          <br />
          <br />
          <input type="file" accept=".jpg, .png" onChange={handleFileChange} />
          <br />
          <button className="uploadBtn" onClick={hamdleSubmit}>
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
