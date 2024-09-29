import React from 'react';
import './ProductDetails.css'; // Asegúrate de importar el archivo CSS

const ProductDetails = ({ products, vendors, onRowClick }) => {
  if (!products || products.length === 0) {
    return <div>No product data available</div>;
  }

  const getVendorName = (vendorId) => {
    const vendor = vendors.find(v => v.id === vendorId);
    return vendor ? vendor.name : 'Desconocido';
  };

  // Filtrar productos con estatus activo (status === 1)
  const activeProducts = products.filter(product => product.status === 1);

  return (
    <div className="grid-container">
      {activeProducts.map(product => (
        <div key={product.id} className="grid-item" onClick={() => onRowClick(product)}>
          {product.image && <img src={product.image} alt={product.name} className="product-image" />}
          <h3>{product.name}</h3>
          <p><strong>Descripción:</strong> {product.description}</p>
          <p><strong>Precio:</strong> {product.precioVenta ? Math.round(product.precioVenta).toLocaleString() : 'N/A'}</p>
          <p><strong>Proveedor:</strong> {getVendorName(product.vendorId)}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;