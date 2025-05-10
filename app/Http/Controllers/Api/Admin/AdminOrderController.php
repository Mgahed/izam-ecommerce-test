<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class AdminOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Order::with(['user', 'products'])
            ->latest();

        // Filter by status if provided
        if ($request->has('status') && !empty($request->status)) {
            $query->where('status', $request->status);
        }

        // Filter by user if provided
        if ($request->has('user_id') && !empty($request->user_id)) {
            $query->where('user_id', $request->user_id);
        }

        return $query->paginate($request->input('per_page', 10));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::with(['user', 'products'])->findOrFail($id);
        return response()->json($order);
    }

    /**
     * Update order status.
     */
    public function updateStatus(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'status' => 'required|string|in:pending,processing,completed,cancelled',
        ]);

        $order = Order::findOrFail($id);

        // If changing to cancelled and the order was not cancelled before
        if ($validatedData['status'] === 'cancelled' && $order->status !== 'cancelled') {
            // Restore product quantities
            foreach ($order->products as $product) {
                $product->stock_quantity += $product->pivot->quantity;
                $product->save();
            }
        }

        // If changing from cancelled to another status
        if ($order->status === 'cancelled' && $validatedData['status'] !== 'cancelled') {
            // Reduce product quantities again
            foreach ($order->products as $product) {
                // Check if enough stock is available
                if ($product->stock_quantity < $product->pivot->quantity) {
                    return response()->json([
                        'message' => "Not enough stock available for {$product->name}. Available: {$product->stock_quantity}"
                    ], 422);
                }

                $product->stock_quantity -= $product->pivot->quantity;
                $product->save();
            }
        }

        $order->status = $validatedData['status'];
        $order->save();

        return response()->json($order);
    }
}
