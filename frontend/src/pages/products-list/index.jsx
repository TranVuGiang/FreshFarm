import { useState, useEffect, useContext } from "react";
import { Star, ShoppingCart, Heart, X, Filter } from "lucide-react";
import FilterPanel from "@/components/product-list/FilterPanel";
import ProductCard from "@/shared/ProductCard";
import { api_LoadProducts } from "@/utils/authService";
import { DataContext } from "@/constants/DataProvider";


const ProductCategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 200000],
    ratings: [],
    inStock: false,
  });

  const { token, userDetail } = useContext(DataContext)

  useEffect(() => {
  console.log(userDetail)
  console.log(token)

  }, [token,userDetail]);

  const [sort, setSort] = useState("default");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (filters.category) {
      result = result.filter((p) => p.id_categories === filters.category);
    }

    // Price range filter
    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Rating filter
    if (filters.ratings.length > 0) {
      result = result.filter((p) =>
        filters.ratings.some((r) => p.rating >= r && p.rating < r + 1)
      );
    }

    // In stock filter
    if (filters.inStock) {
      result = result.filter((p) => p.stock > 0);
    }

    // Sorting logic
    switch (sort) {
      case "priceAsc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "ratingDesc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [filters, sort, products]);


  useEffect(() => {
    loadProductsData()
  }, []);

  const loadProductsData = async () => {
    try {
      const resp = await api_LoadProducts()
      setProducts(resp.data.data)
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-44 lg:pt-44 pb-10">
      {/* Mobile Header and Filter Toggle */}
      <div className="xl:hidden flex justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-green-800">
          Danh Mục
        </h1>
        <button
          onClick={() => setShowMobileFilter(!showMobileFilter)}
          className="flex items-center bg-green-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg"
        >
          {showMobileFilter ? (
            <X className="mr-2 w-4 h-4" />
          ) : (
            <Filter className="mr-2 w-4 h-4" />
          )}
          <span className="text-sm sm:text-base">Bộ Lọc</span>
        </button>
      </div>

      {/* Mobile Filter Panel */}
      {showMobileFilter && (
        <div className="xl:hidden mb-4">
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            className="w-full"
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row-reverse gap-6">
        {/* Sidebar Filters */}
        <div className="flex flex-col space-y-5">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full xl:w-auto text-sm sm:text-base"
          >
            <option value="default">Sắp Xếp Mặc Định</option>
            <option value="priceAsc">Giá: Tăng Dần</option>
            <option value="priceDesc">Giá: Giảm Dần</option>
            <option value="ratingDesc">Đánh Giá Cao Nhất</option>
          </select>
          <div className="hidden xl:block w-full md:w-64 lg:w-[300px]">
            <FilterPanel filters={filters} setFilters={setFilters} />
          </div>
        </div>
        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="hidden xl:block text-xl lg:text-3xl font-bold text-green-800 mb-4 sm:mb-0">
              Rau Củ Quả
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
            <div className="text-center">
              <Star className="text-green-700 mx-auto w-10 h-10" />
              <h3 className="font-bold mt-2">Chất Lượng Đảm Bảo</h3>
              <p className="text-sm text-gray-600">
                Cam kết sản phẩm tươi ngon, không chất bảo quản.
              </p>
            </div>
            <div className="text-center">
              <ShoppingCart className="text-green-700 mx-auto w-10 h-10" />
              <h3 className="font-bold mt-2">Giao Hàng Nhanh</h3>
              <p className="text-sm text-gray-600">
                Hỗ trợ giao hàng tận nơi trong thời gian ngắn.
              </p>
            </div>
            <div className="text-center">
              <Heart className="text-green-700 mx-auto w-10 h-10" />
              <h3 className="font-bold mt-2">Dịch Vụ Hỗ Trợ</h3>
              <p className="text-sm text-gray-600">
                Đội ngũ chăm sóc khách hàng tận tâm.
              </p>
            </div>
          </div>

          <div className="mb-8 text-start">
            <h1 className="text-xl lg:text-2xl font-extrabold text-green-700">
              Khám Phá Các Sản Phẩm Rau Củ Quả Tươi Ngon
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Chúng tôi mang đến sự tươi mới từ nông trại đến bàn ăn của bạn.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 md:grid-cols-3 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id_product} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              Không có sản phẩm nào phù hợp
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryPage;
