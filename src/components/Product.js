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
  const [newProduct, setNewProduct] = useState({
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
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct(prevState => ({
        ...prevState,
        image: reader.result
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRowClick = (product) => {
    setNewProduct(product);
    setIsEditing(true);
    setShowForm(true); // Mostrar el formulario al seleccionar un producto
  };

  const handleClear = () => {
    setNewProduct({
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
    setIsEditing(false);
    setErrorMessage('');
    setSuccessMessage('');
    setShowForm(false); // Ocultar el formulario al limpiar
  };

  const handleCreateNewProduct = () => {
    handleClear();
    setShowForm(true); // Mostrar el formulario al hacer clic en "Crear Producto Nuevo"
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