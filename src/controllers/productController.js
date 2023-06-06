import Product from '../models/product.js';

// Add a new product
const addProduct = async (req, res) => {
  try {
    var testProduct = req.body
    testProduct.technician=req.technician?._id


    const product = new Product(testProduct);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add product' ,message: error.message });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update product' ,message:error.message});
  }
};

// Get all products with pagination and search filtration
const getTechnicianProducts = async (req, res) => {
  const { page = 1, limit = 10, category, keyword } = req.query;
  const query = {};
  query.technician = req.user.id
  
  // Apply search filtration
  if (category) {
    query.category = category;
  }
  
  if (keyword) {
    query.$or = [
      { name: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
    ];
  }

  try {
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const products = await Product.paginate(query, options);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
const getProducts = async (req, res) => {
  const { page = 1, limit = 10, category, keyword } = req.query;
  const query = {};

  // Apply search filtration
  if (category) {
    query.category = category;
  }
  
  if (keyword) {
    query.$or = [
      { name: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
    ];
  }

  try {
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const products = await Product.paginate(query, options);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export { addProduct, updateProduct, getProducts,getTechnicianProducts };
