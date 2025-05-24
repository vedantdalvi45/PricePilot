import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import api from "../api/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    let url = "/products";
    if (query) {
      url = `/products/search?query=${query}`;
    } else if (category) {
      url = `/products/category?category=${category}`;
    }

    try {
      const res = await api.get(url);
      let data = res.data;

      if (sort === "priceAsc") data.sort((a, b) => a.price - b.price);
      if (sort === "priceDesc") data.sort((a, b) => b.price - a.price);
      if (sort === "name") data.sort((a, b) => a.name.localeCompare(b.name));

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await api.get("/products");
      const allCategories = [...new Set(res.data.map((p) => p.category))];
      setCategories(allCategories);
    } catch (e) {
      console.error("Error fetching categories:", e);
    }
  };

  useEffect(() => {
    fetchProducts();
    getCategories();
  }, [query, category, sort]);

  const styles = {
    card: {
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease-in-out",
      backgroundColor: "#ffffff",
    },
    cardHover: {
      transform: "scale(1.02)",
    },
    header: {
      color: "#1E3A8A", // dark blue
      fontWeight: "bold",
    },
    tableHeader: {
      color: "#1E3A8A",
      fontWeight: 600,
    },
    price: {
      color: "#FF6F00", // orange
      fontWeight: 600,
    },
    filterBox: {
      backgroundColor: "#E3F2FD", // light blue
      borderRadius: "10px",
      padding: "1rem",
    },
  };

  return (
    <Container className="mt-5">
      <Typography variant="h4" gutterBottom style={styles.header}>
        Product List
      </Typography>

      <Box style={styles.filterBox} className="mb-4 shadow-sm">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                style={{ minWidth: "120px" }}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {categories.map((cat, i) => (
                  <MenuItem key={i} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sort}
                label="Sort By"
                onChange={(e) => setSort(e.target.value)}
                style={{ minWidth: "120px" }} 
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                <MenuItem value="priceDesc">Price: High to Low</MenuItem>
                <MenuItem value="name">Name</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <div style={{ height: "20px" }}></div>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} md={6} key={product.id}>
            <Card
              className="h-100"
              style={styles.card}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <CardContent>
                <Typography variant="h6" style={styles.header} gutterBottom>
                  {product.name}
                </Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell style={styles.tableHeader}>Category</TableCell>
                      <TableCell>{product.category}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={styles.tableHeader}>Price</TableCell>
                      <TableCell style={styles.price}>
                        Rs. {product.price}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={styles.tableHeader}>Source</TableCell>
                      <TableCell>{product.source || "N/A"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={styles.tableHeader}>Rating</TableCell>
                      <TableCell>{product.rating || "4.2 ⭐"}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
