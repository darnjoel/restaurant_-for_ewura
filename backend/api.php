<?php
/**
 * Annah's Kitchen - REST API Backend (PHP)
 * Provides JSON endpoints for Menu, Table Reservations, Takeout Orders, Reviews, and Contact messages.
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$dataDir = __DIR__ . '/data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0777, true);
}

function readJson($filename, $default = []) {
    global $dataDir;
    $path = $dataDir . '/' . $filename;
    if (!file_exists($path)) {
        file_put_contents($path, json_encode($default, JSON_PRETTY_PRINT));
        return $default;
    }
    $content = file_get_contents($path);
    return json_decode($content, true) ?: $default;
}

function writeJson($filename, $data) {
    global $dataDir;
    $path = $dataDir . '/' . $filename;
    return file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT));
}

function getJsonInput() {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?: [];
}

$action = isset($_GET['action']) ? $_GET['action'] : '';

// Routing
switch ($action) {
    case 'health':
        echo json_encode([
            'status' => 'ok',
            'service' => "Annah's Kitchen PHP REST API",
            'timestamp' => date('c')
        ]);
        break;

    case 'reservations':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $reservations = readJson('reservations.json', []);
            echo json_encode(['success' => true, 'count' => count($reservations), 'reservations' => $reservations]);
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $input = getJsonInput();
            if (empty($input['name']) || empty($input['email']) || empty($input['date']) || empty($input['time'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Name, email, date, and time are required.']);
                exit;
            }

            $id = 'AK-RES-' . rand(1000, 9999);
            $newRes = [
                'id' => $id,
                'name' => trim($input['name']),
                'email' => trim($input['email']),
                'phone' => isset($input['phone']) ? trim($input['phone']) : '',
                'guests' => isset($input['guests']) ? intval($input['guests']) : 2,
                'date' => $input['date'],
                'time' => $input['time'],
                'seating' => isset($input['seating']) ? $input['seating'] : 'Indoor Dining Room',
                'specialRequests' => isset($input['specialRequests']) ? trim($input['specialRequests']) : '',
                'status' => 'Confirmed',
                'createdAt' => date('c')
            ];

            $reservations = readJson('reservations.json', []);
            array_unshift($reservations, $newRes);
            writeJson('reservations.json', $reservations);

            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => "Reservation confirmed for {$newRes['name']}! Reference: {$id}",
                'reservation' => $newRes
            ]);
        }
        break;

    case 'orders':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $orders = readJson('orders.json', []);
            echo json_encode(['success' => true, 'count' => count($orders), 'orders' => $orders]);
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $input = getJsonInput();
            if (empty($input['items']) || !is_array($input['items']) || empty($input['customer']['name'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Order items and customer name are required.']);
                exit;
            }

            $subtotal = 0;
            foreach ($input['items'] as $item) {
                $subtotal += floatval($item['price']) * intval(isset($item['quantity']) ? $item['quantity'] : 1);
            }
            $tax = round($subtotal * 0.0825, 2);
            $tip = isset($input['tip']) ? floatval($input['tip']) : 0;
            $total = round($subtotal + $tax + $tip, 2);

            $id = 'AK-ORD-' . rand(10000, 99999);
            $newOrder = [
                'id' => $id,
                'customer' => $input['customer'],
                'deliveryType' => isset($input['deliveryType']) ? $input['deliveryType'] : 'Pickup',
                'items' => $input['items'],
                'notes' => isset($input['notes']) ? $input['notes'] : '',
                'subtotal' => $subtotal,
                'tax' => $tax,
                'tip' => $tip,
                'total' => $total,
                'status' => 'Confirmed & Preparing',
                'createdAt' => date('c')
            ];

            $orders = readJson('orders.json', []);
            array_unshift($orders, $newOrder);
            writeJson('orders.json', $orders);

            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => "Order #{$id} placed successfully!",
                'order' => $newOrder
            ]);
        }
        break;

    case 'reviews':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $reviews = readJson('reviews.json', []);
            echo json_encode(['success' => true, 'reviews' => $reviews]);
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $input = getJsonInput();
            if (empty($input['name']) || empty($input['comment']) || empty($input['rating'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Name, rating, and feedback are required.']);
                exit;
            }

            $words = explode(' ', trim($input['name']));
            $initials = '';
            foreach ($words as $w) {
                if (!empty($w)) $initials .= strtoupper($w[0]);
            }
            $initials = substr($initials, 0, 2) ?: 'AK';

            $newReview = [
                'id' => time(),
                'name' => trim($input['name']),
                'role' => isset($input['role']) ? $input['role'] : 'Verified Diner',
                'rating' => min(5, max(1, intval($input['rating']))),
                'comment' => trim($input['comment']),
                'avatar' => $initials,
                'date' => 'Just now'
            ];

            $reviews = readJson('reviews.json', []);
            array_unshift($reviews, $newReview);
            writeJson('reviews.json', $reviews);

            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => 'Thank you for your review!',
                'review' => $newReview
            ]);
        }
        break;

    case 'contact':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $input = getJsonInput();
            if (empty($input['name']) || empty($input['email']) || empty($input['message'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Name, email, and message are required.']);
                exit;
            }

            $messages = readJson('messages.json', []);
            $newMsg = [
                'id' => 'MSG-' . time(),
                'name' => trim($input['name']),
                'email' => trim($input['email']),
                'subject' => isset($input['subject']) ? trim($input['subject']) : 'Inquiry',
                'message' => trim($input['message']),
                'createdAt' => date('c')
            ];
            array_unshift($messages, $newMsg);
            writeJson('messages.json', $messages);

            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => 'Message received. We look forward to connecting with you!'
            ]);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'Endpoint not found. Valid actions: health, reservations, orders, reviews, contact'
        ]);
        break;
}
