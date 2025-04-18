import { api_LoadCategories } from "@/utils/authService";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Switch,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const FilterPanel = ({ filters, setFilters }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const resp = await api_LoadCategories();
        setCategories(resp.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadCategories();
  }, []);

  return (
    <div className="w-full pr-6 border-2 p-4 rounded-md">
      {/* Danh Mục Sản Phẩm */}
      <div className="mb-6">
        <h3 className="font-bold mb-3">Danh Mục Sản Phẩm</h3>
        <div className="grid grid-cols-1 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id_categories}
              className="p-2 border rounded hover:border-blue-500 hover:text-blue-500 transition-colors cursor-pointer"
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setFilters((prev) => ({
                    ...prev,
                    category: cat.id_categories,
                  }));
                }}
                className={`block text-md ${
                  filters.category === cat.id_categories
                    ? "text-blue-500 font-bold"
                    : ""
                }`}
              >
                {cat.name}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Khoảng Giá */}
      <div className="mb-6">
        <h3 className="font-bold mb-3">Khoảng Giá</h3>
        <Menu>
          <MenuButton className="w-full text-left border rounded px-3 py-2">
            {filters.priceRange[0] === 0 && filters.priceRange[1] === 200000
              ? "Tất Cả Mức Giá"
              : `${filters.priceRange[0].toLocaleString()} VND - ${filters.priceRange[1].toLocaleString()} VND`}
          </MenuButton>
          <MenuItems className="mt-2 bg-white shadow-lg rounded">
            <MenuItem
              as="div"
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  priceRange: [0, 200000],
                }))
              }
            >
              Tất Cả Mức Giá
            </MenuItem>
            {[
              [0, 50000],
              [50000, 100000],
              [100000, 200000],
            ].map(([min, max]) => (
              <MenuItem
                key={`${min}-${max}`}
                as="div"
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: [min, max],
                  }))
                }
              >
                {min.toLocaleString("vi-VN")} VND -{" "}
                {max.toLocaleString("vi-VN")} VND
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>

      {/* Đánh Giá */}
      {/* <div className="mb-6">
        <h3 className="font-bold mb-3">Đánh Giá</h3>
        {[4, 3, 2, 1].map((rating) => (
          <label key={rating} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={filters.ratings.includes(rating)}
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  ratings: prev.ratings.includes(rating)
                    ? prev.ratings.filter((r) => r !== rating)
                    : [...prev.ratings, rating],
                }))
              }
              className="mr-2"
            />
            {rating} Sao & Trở Lên
          </label>
        ))}
      </div> */}

      {/* Còn Hàng */}
      {/* <div className="mb-6">
        <h3 className="font-bold mb-3">Còn Hàng</h3>
        <Switch
          checked={filters.inStock}
          onChange={() =>
            setFilters((prev) => ({
              ...prev,
              inStock: !prev.inStock,
            }))
          }
          className={`${
            filters.inStock ? "bg-green-500" : "bg-gray-300"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              filters.inStock ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform bg-white rounded-full`}
          />
        </Switch>
      </div> */}
    </div>
  );
};

export default FilterPanel;
