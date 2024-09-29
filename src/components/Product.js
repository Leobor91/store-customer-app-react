import React, { useState, useEffect } from 'react';
import ProductDetails from './ProductDetails'; // Importar ProductDetails
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL;
const PRODUCTS_LIST_ENDPOINT = process.env.REACT_APP_PRODUCTS_LIST_ENDPOINT;
const VENDORS_LIST_ENDPOINT = process.env.REACT_APP_VENDORS_LIST_ENDPOINT;

const Product = () => {
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [setNewProduct] = useState({
    id: '',
    name: '',
    description: '',
    status: 1,
    stock: '',
    precioCosto: '',
    precioVenta: '',
    vendorId: '',
    image: ''
  });
  const [ setIsEditing] = useState(false);
  const [errorMessage, ] = useState('');
  const [successMessage, ] = useState('');
  const [ setShowForm] = useState(false); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}${PRODUCTS_LIST_ENDPOINT}`);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
        toast.error('Error al obtener la lista de productos');
      }
    };

    const fetchVendors = async () => {
      try {
        const response = await fetch(`${API_URL}${VENDORS_LIST_ENDPOINT}`);
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
        toast.error('Error al obtener la lista de proveedores');
      }
    };

    fetchProducts();
    fetchVendors();
  }, []);

  const handleRowClick = (product) => {
    setNewProduct(product);
    setIsEditing(true);
    setShowForm(true); // Mostrar el formulario al seleccionar un producto
  };   

  return (
    <div>
      <h2>Productos</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductDetails products={products} vendors={vendors} onRowClick={handleRowClick} />
      )}
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Product;