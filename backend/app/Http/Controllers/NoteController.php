<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    // List notes with optional search and category filter
    public function index(Request $req)
    {
        $notes = Note::where('user_id', Auth::id())
            ->when($req->search, function ($query, $search) {
                $query->where('title', 'like', "%$search%");
            })
            ->when($req->category_id, function ($query, $category_id) {
                $query->where('category_id', $category_id);
            })
            ->with('category')
            ->get();

        return response()->json($notes);
    }

    // Create a new note
    public function store(Request $req)
    {
        $validation = $req->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        // Convert empty string to null
        if (isset($validation['category_id']) && $validation['category_id'] === '') {
            $validation['category_id'] = null;
        }

        $note = Note::create([
            'user_id' => Auth::id(),
            'title' => $validation['title'],
            'content' => $validation['content'],
            'category_id' => $validation['category_id'] ?? null,
        ]);

        return response()->json($note, 201);
    }

    // Show a single note
    public function show($id)
    {
        $note = Note::where('user_id', Auth::id())->findOrFail($id);
        return response()->json($note);
    }

    // Update a note
    public function update(Request $req, $id)
    {
        $note = Note::where('user_id', Auth::id())->findOrFail($id);

        $validation = $req->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        // Only update category if provided
        if ($req->has('category_id')) {
            // Convert empty string to null
            if ($validation['category_id'] === '') {
                $validation['category_id'] = null;
            }
        } else {
            // If not sent, remove from validation so old category stays
            unset($validation['category_id']);
        }

        $note->update($validation);

        return response()->json($note);
    }

    // Delete a note
    public function destroy($id)
    {
        $note = Note::where('user_id', Auth::id())->findOrFail($id);
        $note->delete();
        return response()->json(null, 204);
    }
}
