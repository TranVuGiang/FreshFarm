<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Danh sách sản phẩm mẫu
        $products = [
            ['name' => 'Cà rốt', 'category_id' => 1],
            ['name' => 'Khoai tây', 'category_id' => 1],
            ['name' => 'Rau cải ngọt', 'category_id' => 2],
            ['name' => 'Bông cải xanh', 'category_id' => 2],
            ['name' => 'Chuối', 'category_id' => 3],
            ['name' => 'Táo đỏ', 'category_id' => 3],
            ['name' => 'Nấm đông cô', 'category_id' => 4],
            ['name' => 'Đậu phụ non', 'category_id' => 4],
            ['name' => 'Hành lá', 'category_id' => 5],
            ['name' => 'Rau húng', 'category_id' => 5],
        ];

        foreach ($products as $product) {
            DB::table('products')->insert([
                'id_categories' => $product['category_id'],
                'name' => $product['name'],
                'price' => $faker->randomFloat(2, 10, 100), // Giá từ 10k đến 100k
                'image' => $faker->imageUrl(640, 480, 'food', true, 'Rau củ'), // Ảnh giả lập
                'stock_quantity' => $faker->numberBetween(50, 500), // Tồn kho từ 50 đến 500
                'weight' => $faker->randomFloat(2, 0.1, 5), // Khối lượng từ 0.1kg đến 5kg
                'origin' => $faker->country(), // Xuất xứ ngẫu nhiên
                'certification' => $faker->randomElement(['VietGAP', 'GlobalGAP', 'HACCP', 'Không']), // Chứng nhận ngẫu nhiên
                'status' => $faker->boolean(80), // 80% sản phẩm đang hoạt động
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
