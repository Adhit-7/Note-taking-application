<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $req)
    {
        $validation = $req -> validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $validation['name'],
            'email' => $validation['email'],
            'password' => $validation['password'],
        ]);

            $token = JWTAuth::fromUser($user);
            return response()->json([
                'user' => $user, 
                'token' => $token
                ], 201);
    }

    public function login(Request $req)
    {
        $credential = $req -> validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:6',
        ]);

        if (! $token = JWTAuth::attempt($credential)) {
            return response()->json(['error' => 'Invalid Credentials. Please try again.'], 401);
        }

       return response()->json(['token' => $token]);
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function getAuthenticatedUser()
    {
        return response()->json(JWTAuth::user());
    }
}
