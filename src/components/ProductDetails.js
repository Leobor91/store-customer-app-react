import React from 'react';

const ProductDetails = ({ products, vendors, onRowClick }) => {
  if (!products || products.length === 0) {
    return <div>No product data available</div>;
  }

  const getVendorName = (vendorId) => {
    const vendor = vendors.find(v => v.id === vendorId);
    return vendor ? vendor.name : 'Desconocido';
  };

  const getStatusStyle = (status) => {
    return {
      color: status === 1 ? 'green' : 'gray',
      fontWeight: 'bold'
    };
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
          <p><strong>Precio Costo:</strong> {product.precioCosto ? parseFloat(product.precioCosto).toFixed(2) : 'N/A'}</p>
          <p><strong>Precio Venta:</strong> {product.precioVenta ? parseFloat(product.precioVenta).toFixed(2) : 'N/A'}</p>
          <p><strong>Proveedor:</strong> {getVendorName(product.vendorId)}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;