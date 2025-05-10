<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Product attributes for generating random data
        $productTypes = [
            'T-shirt', 'Polo', 'Jeans', 'Hoodie', 'Sweater', 'Jacket', 'Shorts',
            'Dress', 'Skirt', 'Blouse', 'Suit', 'Coat'
        ];

        $adjectives = [
            'Slim', 'Vintage', 'Modern', 'Classic', 'Elegant', 'Casual', 'Trendy',
            'Athletic', 'Premium', 'Luxury', 'Basic', 'Designer'
        ];

        $colors = [
            'Red', 'Blue', 'Green', 'Black', 'White', 'Gray', 'Navy', 'Purple',
            'Pink', 'Yellow', 'Orange', 'Brown'
        ];

        $categories = [1, 2, 3, 4]; // Using existing categories

        // Generate 100 products
        for ($i = 1; $i <= 100; $i++) {
            $color = $colors[array_rand($colors)];
            $type = $productTypes[array_rand($productTypes)];
            $adjective = $adjectives[array_rand($adjectives)];

            $product = [
                'name' => "$adjective $color $type",
                'description' => "High-quality $color $type with $adjective fit and modern design.",
                'price' => rand(5000, 30000) / 100, // Between $50.00 and $300.00
                'stock_quantity' => rand(5, 50),
                'category_id' => $categories[array_rand($categories)],
            ];

            // Check if product image exists
            if (file_exists(public_path("images/products/$i.png"))) {
                $product['image_path'] = env('IMAGE_BASE_URL') . "/images/products/$i.png";
            } else {
                $product['image_path'] = "https://placehold.co/200";
            }

            Product::create($product);
        }
    }
}
