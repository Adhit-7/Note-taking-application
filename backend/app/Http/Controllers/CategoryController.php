<?php

namespace App\Http\Controllers;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $category = Category::where('user_id', Auth::id())->get();
        return response()->json($category);
    }

    public function store(Request $req)
    {
        $validation = $req->validate([
            'name' => 'required|string|max:255|',
        ]);

        $category = Category::create(array_merge($validation, ['user_id' => Auth::id()]));
        return response()->json($category, 201);
    }

    public function show($id)
    {
        $category = Category::where('user_id', Auth::id())->findOrFail($id);
        return response()->json($category);
    }

    public function update(Request $req, $id)
    {
        $category = Category::where('user_id', Auth::id())->findOrFail($id);

        $validation = $req->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $id,
        ]);

        $category->update($validation);
        return response()->json($category);
    }

    public function destroy($id)
    {
        $category = Category::where('user_id', Auth::id())->findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }
}
