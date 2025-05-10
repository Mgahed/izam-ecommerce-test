<?php

namespace App\Http\Controllers\Api;

use App\Events\OrderPlaced;
use App\Http\Controllers\Controller;
use App\Http\Helpers\GeneralHelpers;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $orders = Order::with('products')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->paginate(10);

        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'products' => 'required|array|min:1',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        // Start a database transaction
        return DB::transaction(function () use ($request, $validatedData) {
            $subtotal = 0;
            $orderProducts = [];

            // Check stock availability for all products
            foreach ($validatedData['products'] as $item) {
                $product = Product::lockForUpdate()->findOrFail($item['id']);

                // Check if enough stock is available
                if ($product->stock_quantity < $item['quantity']) {
                    throw ValidationException::withMessages([
                        'products' => "Not enough stock available for {$product->name}. Available: {$product->stock_quantity}"
                    ]);
                }

                // Calculate item price and add to order subtotal
                $itemTotal = $product->price * $item['quantity'];
                $subtotal += $itemTotal;

                // Reduce the product stock
                $product->stock_quantity -= $item['quantity'];
                $product->save();

                // Prepare product data for pivot table
                $orderProducts[$item['id']] = [
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                ];
            }

            // Get tax and shipping from config
            $taxRate = config('shop.tax.rate');
            $shippingFee = config('shop.shipping.flat_rate');

            // Calculate tax amount
            $taxAmount = $subtotal * $taxRate;

            // Calculate total
            $total = $subtotal + $taxAmount + $shippingFee;

            // Create the order
            $order = Order::create([
                'user_id' => $request->user()->id,
                'subtotal' => $subtotal,
                'tax' => $taxAmount,
                'shipping' => $shippingFee,
                'total' => $total,
                'status' => 'pending',
            ]);

            // Attach products to the order
            $order->products()->attach($orderProducts);

            // Fire the OrderPlaced event
            event(new OrderPlaced($order));

            GeneralHelpers::removeProductCache();

            return response()->json([
                'message' => 'Order placed successfully',
                'order' => $order->load('products'),
            ], 201);
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::with('products.category')->findOrFail($id);

        // Check if the order belongs to the authenticated user
        if ($order->user_id !== request()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $order = Order::findOrFail($id);

        // Check if the order belongs to the authenticated user
        if ($order->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'status' => 'sometimes|string|in:pending,processing,completed,cancelled',
        ]);

        $order->update($validatedData);

        return response()->json($order);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = Order::findOrFail($id);

        // Check if the order belongs to the authenticated user
        if ($order->user_id !== request()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Only allow cancellation if order is still pending
        if ($order->status !== 'pending') {
            return response()->json(['message' => 'Cannot cancel an order that is not pending'], 400);
        }

        // Restore product quantities
        foreach ($order->products as $product) {
            $product->stock_quantity += $product->pivot->quantity;
            $product->save();
        }

        $order->status = 'cancelled';
        $order->save();

        return response()->json(['message' => 'Order cancelled successfully']);
    }
}
