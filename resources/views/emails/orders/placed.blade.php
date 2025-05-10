<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Order Placed</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #f8f9fa;
            padding: 15px;
            text-align: center;
            border-bottom: 1px solid #dee2e6;
        }
        .content {
            padding: 20px 0;
        }
        .order-details {
            margin-bottom: 20px;
        }
        .product-table {
            width: 100%;
            border-collapse: collapse;
        }
        .product-table th, .product-table td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #dee2e6;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            text-align: center;
            font-size: 0.9em;
            color: #6c757d;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Order Placed</h1>
        </div>

        <div class="content">
            <div class="order-details">
                <h3>Order #{{ $order->id }}</h3>
                <p><strong>Date:</strong> {{ $order->created_at->format('F d, Y H:i') }}</p>
                <p><strong>Total:</strong> ${{ number_format($order->total, 2) }}</p>
            </div>

            <h3>Products</h3>
            <table class="product-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($order->products as $product)
                    <tr>
                        <td>{{ $product->name }}</td>
                        <td>{{ $product->pivot->quantity }}</td>
                        <td>${{ number_format($product->pivot->price, 2) }}</td>
                        <td>${{ number_format($product->pivot->quantity * $product->pivot->price, 2) }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div class="footer">
            <p>Thank you for your order!</p>
            <p>&copy; {{ date('Y') }} Izam. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
